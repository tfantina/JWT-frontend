<script context="module">
  console.log("wow")
  export async function preload(page, session) {
    console.log(session);
    const { auth_token } = session;

    if(!auth_token) {
      return this.redirect(302, "user/login");
    }

    const response = await this.fetch('http://localhost:3000/api/v1/post/index', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: auth_token,
      },
    });

    const parsed = await response.json();

    if(parsed.error) {
      return this.error(response.status, parsed.error);
    }

    return console.log(parsed);
  }
</script>

<h1>hi</h1>
