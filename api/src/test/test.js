const port = "3000";
if(!port) throw new Error("Port is not set");

const baseUrl = "http://localhost:" +  port + "/api/v1";
let response;
// 1. EndPoint GET/health
async function checkHealth() {
  response = await fetch(url + "/health");

  console.log(response.status);

  console.log(await response.json());
}
// 2. Crear cuenta
async function createAccount(username, password, firstName, propertyName){
  try {
    const url = baseUrl + "/accounts/create-account";
    console.log(url)
    const options = {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        firstName,
        propertyName
      })
    }

    const response = await fetch(url, options);

    console.log(await response.json());
  }catch(err){
    console.log(err)
  }

}

createAccount("tomas", "1234", "tomas", "La Casa del Viajero")
