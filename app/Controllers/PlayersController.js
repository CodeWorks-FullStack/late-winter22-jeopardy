import { ProxyState } from "../AppState.js";
import { playersService } from "../Services/PlayersService.js";
import { Pop } from "../Utils/Pop.js";

function _drawAllPlayers(){
  let template = ''
  ProxyState.players.forEach(p => template += p.ListTemplate)
  document.getElementById('all-players').innerHTML = template
}

function _drawActivePlayer(){
  let activePlayer = ProxyState.activePlayer
  if(activePlayer.name){
    document.getElementById('active-player').innerHTML = activePlayer.Template
  } else {
    document.getElementById('active-player').innerHTML = '<h2>Select a player </h2>'
  }
}

async function _getAllPlayers(){
  try {
    await playersService.getAllPlayers()
  } catch (error) {
    console.error(error);
    Pop.toast(error.message, 'error')
  }
}

export class PlayersController{
  constructor(){
    console.log('[Players Controller]');
    ProxyState.on('players', _drawAllPlayers)
    ProxyState.on('activePlayer', _drawActivePlayer)
    _getAllPlayers()
    _drawActivePlayer()
  }

  async addPlayer(){
    try {
     
      // @ts-ignore
      let popResult = await Swal.fire({
        title: 'Enter your name!',
        input: 'text',
        inputPlaceholder: 'Name...'
      })

      let newPlayer = {
        name: popResult.value
      }
      playersService.addPlayer(newPlayer)      
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, 'error')
    }
  }

  setActivePlayer(id){
    console.log('set active player', id);
    playersService.setActivePlayer(id)
  }

  async deletePlayer(){
    try {
    if( await Pop.confirm('are you sure you want to delete them')){
      await playersService.deletePlayer()
    }
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, 'error')
    }
  }
}