<svelte:head>
	<title>Login User</title>
</svelte:head>
<script>
let email = '';
let password = '';

import axios from 'axios';
import handleLogin from '../../user_functions/handleLogin'

const handleSubmit = async event => {
	console.log(handleLogin("wow"));
	try {
	  const	data = {email: email, password: password}
		const res = await axios.post("http://localhost:3000/api/v1/sessions/", data)
		res.data.auth_token ? handleLogin(res.data) : console.log("wow")
	} catch  (e) {
		console.log(e);
	}
}
</script>

<h1>Log in below</h1>

<main>
	<h1>Login</h1>
	<form on:submit|preventDefault={handleSubmit}>
    <input type="email" name="email" bind:value={email}>
    <input type="password" name="password" bind:value={password}>

    <button type="submit">Login</button>
  </form>
</main>
