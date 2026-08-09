import { Client } from "pg";
import "dotenv/config";


console.log("corriendo archivo..")

const port = "3000";
if (!port) throw new Error("Port is not set");

const baseUrl = "http://localhost:" + port + "/api/v1";

let COOKIES = "";

console.log(baseUrl)


async function cleanDatabase() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "simplehostel",
    user: "simplehostel_user",
    password: process.env.DB_PASSWORD,
  });


  try {
    await client.connect();
    await client.query(`
    TRUNCATE
      access_control,
      properties,
      users,
      room_types,
      rooms,
      beds
    RESTART IDENTITY CASCADE
  `)

  } catch (e) {
    throw new Error(e)
  } finally {
    await client.end();
  }

}

// 1. EndPoint GET/health
async function checkHealth() {
  const response = await fetch(baseUrl + "/health");

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

    let setCookie = response.headers.get("set-cookie");

    setCookie.split(";")[0];

    COOKIES = setCookie;

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }

    return data
  } catch (err) {
    console.error("Error on login user", err);
  }
}

async function getAllRoomTypes(propertyId) {
  const url = baseUrl + `/room-types/all/${propertyId}`;

  const options = {
    method: "GET",
    credentials: "include"
  }

  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    console.log("ERROR: ", data)
  }

  console.log(data);
}

async function createRoomType(roomType) {
  const url = baseUrl + `/room-types/create`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": COOKIES
    },
    credentials: "include",
    body: JSON.stringify(roomType)
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    console.log(data);
    throw new Error("Ocurrio un error");
  }

  console.log("El Room Type se creo")


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

const roomType = {
  description: "Cuarto compartido de 6 camas",
  type: "DORM",
  gender: "mixed",
  maxOccupancy: 8,
  inventory: 2

}

async function runTest() {

  console.log("Empieza test")

  await cleanDatabase();

  console.log("Base de datos limpia");

  // Crear Cuenta
  console.log("Creando cuenta...")
  const token = await createAccount(user.username, user.password, user.firstName, user.propertyName, user.acceptTerms, user.captchaToken);

  // Validar cuenta
  console.log("Validando cuenta...");
  await validateAccount(token);

  // Log in user
  console.log("Logeando al usuario...");
  const login = await logInUser(user.username, user.password);


  // Creando roomType
  await createRoomType(roomType);

  console.log("Buscando roomtypes..")

  const roomTypes = await getAllRoomTypes(login.accessControl.propertyId)

}

runTest();



