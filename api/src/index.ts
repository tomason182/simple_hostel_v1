import { Main } from "./Main";

async function bootstrap() {
  try {
    const main = new Main();
    await main.run();

  } catch (err) {
    console.error("Ups!...Arranque de la aplicacion fallido.")
  }
}


bootstrap();
