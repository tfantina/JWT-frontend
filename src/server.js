import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { json } from "body-parser";
import session from "express-session";
import sessionFileStore from "session-file-store";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const FileStore = new sessionFileStore(session);

polka()
  .use(
    json(),
    session({
      secret: "replacemelater!!",
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 3153600
      },
      store: new FileStore({
        path: `.sessions`
      })
    }),
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req, res) => {
        return {
          auth_token: req.session.auth_token
        };
      }
    })
  )
  .listen(PORT, err => {
    if (err) console.log("error", err);
  });
