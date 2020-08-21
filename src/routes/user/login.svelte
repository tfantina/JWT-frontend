<svelte:head>
	<title>Login User</title>
</svelte:head>
<script>
import { goto, stores} from "@sapper/app";
const { session } = stores();

let email = '';
let password = '';
let error;

const handleLogin = async () => {
	 const response = await fetch("user/login", {
		 method: "POST",
		 headers: {
			 "Content-Type": "application/json",
			 Accept: "application/json",
		 },
		 body: JSON.stringify({ email, password }),
	 });

	 const parsed = await response.json();

	 if (parsed.error) {
		 error = parsed.error;
	 } else {
		 $session.auth_token = parsed.auth_token;
		 goto("/user");
	 }
 };
</script>

<h1>Log in below</h1>

<main>
	<h1>Login</h1>
	<form on:submit|preventDefault={handleLogin} method="oist">
    <input type="email" name="email" bind:value={email}>
    <input type="password" name="password" bind:value={password}>

    <button type="submit">Login</button>
  </form>
</main>
