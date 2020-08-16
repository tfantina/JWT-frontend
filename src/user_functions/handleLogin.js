import { goto } from "@sapper/app";
const handleLogin = data => {
  document.cookie = "auth_token=data.auth_token";
  goto("/user");
};

export default handleLogin;
