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

    const body = await response.json();

    console.log(body);

    return body.token;
  } catch (err) {
    console.log(err)
  }

}

async function validateAccount(token) {
  try {
    const url = baseUrl + "/accounts/validation/" + token;
    console.log(url);

    const response = await fetch(url);

    console.log(await response.json())


  } catch (err) {
    throw new Error("Error on validateAccount", err);
  }
}

async function logInUser(username, password) {
  try {
    const url = baseUrl + "/users/auth";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })

    }

    const response = await fetch(url, options);

    const setCookie = response.headers.get("set-cookie");

    console.log("Cookies: ", setCookie);

    console.log(await response.json());

  } catch (err) {
    console.error("Error on login user", err);
  }
}

// ======================================================
// Iniciando TESTS.
// ====================================================== 
const user = {
  username: "tomas2@mail.com",
  password: "&tomAs_useR182",
  firstName: "Tomas",
  acceptTerms: true,
  propertyName: "La Casa del Viajero",
  captchaToken: "captcha",
}

async function runTest() {

  // Crear Cuenta
  console.log("Creando cuenta...")
  const token = await createAccount(user.username, user.password, user.firstName, user.propertyName, user.acceptTerms, user.captchaToken);

  // Validar cuenta
  console.log("Validando cuenta...");
  await validateAccount(token);

  // Log in user
  console.log("Logeando al usuario...");
  await logInUser(user.username, user.password);
}

runTest();



