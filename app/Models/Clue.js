export class Clue{
  constructor(data){
    console.log(data);
    this.clue = data.question
    this.answer = data.answer
    this.category = data.category.title
    this.points = data.value
  }

  get Template(){
    return `
    <h4>${this.category}</h4>
    <h2 class="clue">${this.clue}</h2>
    <b>${this.points}</b>
    <div class="bg-dark rounded p-5 text-light hide-container answer"><span class="hide">${this.answer}</span></div>
    <div class="d-flex justify-content-around mt-3">
      <div class="btn btn-danger w-50 p-2" onclick="app.cluesController.answerClue(false)">wrong</div>
      <div class="btn btn-success w-50 p-2" onclick="app.cluesController.answerClue(true)">success</div>
    </div>
    `
  }
}