import { ProxyState } from "../AppState.js";
import { Clue } from "../Models/Clue.js";
import { jeopardyApi, sandboxApi } from "./AxiosService.js";


class CluesService{
 
  async getClue() {
    const res = await jeopardyApi.get()
    console.log('[getCLue]', res.data);
    // NOTE because jservice always sends back and array and we just want the first item in it
    ProxyState.clue = new Clue(res.data[0])
  }

  async answerClue(answer){
    let clue = ProxyState.clue
    let player = ProxyState.activePlayer
    if(answer){
      player.points += clue.points
      player.correct++
    } else {
      player.points -= clue.points
      player.incorrect++
    }
    player.questions++
    const res = await sandboxApi.put(player.id, player)
    console.log(res.data);
    ProxyState.activePlayer = ProxyState.activePlayer
    ProxyState.players = ProxyState.players
    this.getClue()
  }

}

export const cluesService = new CluesService()