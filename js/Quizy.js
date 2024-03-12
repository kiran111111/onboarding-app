

export default function Quiz(questions){
  this.questions = questions;
  this.score = 0;
  this.currentIndex = 0;
} 


 Quiz.prototype.getCurrentQuestion = function(){
   return this.questions[this.currentIndex];
 }

 Quiz.prototype.next = function(){
   this.currentIndex++;
 }

 Quiz.prototype.guess = function(userGuess){
   const currentQuestion = this.questions[this.currentIndex];
   console.log(currentQuestion);
   if(userGuess == currentQuestion.answer){
    this.score= this.score+1;
   }
   this.currentIndex++;
 }

 Quiz.prototype.reset = function(){
  this.score =0;
  this.currentIndex = 0;
 }

 Quiz.prototype.hasEnded = function(){
   return this.currentIndex == this.questions.length;
 }