import fetch from "node-fetch";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post(req, res) {
  try {
    const { email, password } = req.body;

    const result = await fetch(`http://localhost:3000/api/v1/sessions/`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });

    const parsed = await result.json();


    if (typeof parsed.error !== "undefined") {
      throw new Error(parsed.error);
    }

    req.session.auth_token = parsed.auth_token;

    res.end(JSON.stringify({ auth_token: parsed.auth_token }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}
