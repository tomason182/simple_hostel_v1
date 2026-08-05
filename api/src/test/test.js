const port = "3000";
if (!port) throw new Error("Port is not set");

const baseUrl = "http://localhost:" + port + "/api/v1";
let response;
// 1. EndPoint GET/health
async function checkHealth() {
  response = await fetch(url + "/health");

  console.log(response.status);

  console.log(await response.json());
}
// 2. Crear cuenta
async function createAccount(username, password, firstName, propertyName, acceptTerms, captchaToken) {
  try {
    const url = baseUrl + "/accounts/create-account";
    console.log(url)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        firstName,
        propertyName,
        acceptTerms,
        captchaToken
      })
    }

    const response = await fetch(url, options);

    console.log(response.status);
    console.log(response.headers.get("content-type"))

    console.log(await response.json());
  } catch (err) {
    console.log(err)
  }

}

const user = {
  username: "tomas2@mail.com",
  password: "&tomAs_useR182",
  firstName: "Tomas",
  acceptTerms: true,
  propertyName: "La Casa del Viajero",
  captchaToken: "captcha",
}

createAccount(user.username, user.password, user.firstName, user.propertyName, user.acceptTerms, user.captchaToken);
