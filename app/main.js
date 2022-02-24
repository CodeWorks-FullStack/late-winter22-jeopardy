import { CluesController } from "./Controllers/CluesController.js";
import { PlayersController } from "./Controllers/PlayersController.js";

class App {
  playersController = new PlayersController()
  cluesController = new CluesController()
}

window["app"] = new App();
