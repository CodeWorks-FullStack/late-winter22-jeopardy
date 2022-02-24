import { ProxyState } from "../AppState.js";
import { Player } from "../Models/Player.js";
import { sandboxApi } from "./AxiosService.js";


class PlayersService{
  async getAllPlayers() {
    const res = await sandboxApi.get()
    console.log('[getAllPlayers]', res.data);
    ProxyState.players = res.data.map(p => new Player(p))
  }

  async addPlayer(newPlayer){
    const res = await sandboxApi.post('', newPlayer)
    console.log('add player', res.data);
    ProxyState.players = [...ProxyState.players, new Player(res.data)]
  }

  // NOTE don't need to async cause the data is already here in our appstate, we are just moving it.
  setActivePlayer(id) {
    const player = ProxyState.players.find(p => p.id == id)
    console.log(player);
    ProxyState.activePlayer = player
  }

  async deletePlayer(){
    let playerToDelete = ProxyState.activePlayer
    const res = await sandboxApi.delete(playerToDelete.id)
    console.log('delete player', res.data);
    // @ts-ignore
    ProxyState.activePlayer = {}
    ProxyState.players = ProxyState.players.filter(p => p.id != playerToDelete.id)
  }

}

export const playersService = new PlayersService()