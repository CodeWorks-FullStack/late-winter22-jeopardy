export class Player{
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.points = data.points
    this.questions = data.questions
    this.correct = data.correct
    this.incorrect = data.incorrect
  }

  get Template(){
    return `
    <div class="col-12 mt-2 bg-primary shadow p-2 text-center">
      <h1>${this.name}</h1>
      <div>
      <b>${this.points}</b><br />
      <span>Clues: ${this.questions} | correct: ${this.correct} | incorrect: ${this.incorrect}</span>
      </div>
      <div class="text-end">
        <i class="mdi mdi-delete px-2 selectable" title="delete player" onclick="app.playersController.deletePlayer()"></i>
      </div>
    </div>
    `
  }

  get ListTemplate(){
    return `
    <div class="col-12 d-flex align-items-center p-2 border bg-white shadow justify-content-between">
      <h3 class="me-5">${this.name}</h3><b class="${this.points >= 0 ? 'text-success' : 'text-danger'} darken-10">${this.points}</b>
      <button class="btn btn-outline-success" onclick="app.playersController.setActivePlayer('${this.id}')">set active</button>
    </div>`
  }
}