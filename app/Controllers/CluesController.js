import { ProxyState } from "../AppState.js";
import { cluesService } from "../Services/CluesService.js";
import { Pop } from "../Utils/Pop.js";

function _drawClue(){
  let clue = ProxyState.clue
  document.getElementById('clue').innerHTML = clue.Template
}


export class CluesController{
  constructor(){
    console.log('[Clues Controller]');
    ProxyState.on('clue', _drawClue)

  }

  async getClue(){
    try {
      await cluesService.getClue()
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, 'error')
    }
  }

  async answerClue(answer){
    try {
      await cluesService.answerClue(answer)
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, 'error')
    }
  }

}