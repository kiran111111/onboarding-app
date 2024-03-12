import Quiz from "./Quizy.js";


// Cache out the DOM
const nextEl = document.querySelector(".next");
const choicesEl = document.querySelector(".jabquiz__choices");
const  questionEl = document.querySelector(".jabquiz__question");
const restartButtonEl = document.querySelector(".restart");
const trackerEl = document.querySelector(".jabquiz__tracker");
const progressEl = document.querySelector(".progress__inner");
const taglineEl = document.querySelector(".jabquiz__tagline");


// Fetching the data  from the API

fetch("https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple")
  .then(res =>{
    return res.json();
  })
  .then(data =>{
     const ques =data.results.map(loadedQuestion =>{
       
      const formattedQuestion = {
        question : loadedQuestion.question,
        answer: loadedQuestion.answer
      }
       
      const choices =  [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random()*4);
      choices.splice(formattedQuestion.answer,0,loadedQuestion.correct_answer);
      formattedQuestion.choices = choices;

      return formattedQuestion;
     })

   const quiz = new Quiz([...ques]);

    function App() {
      renderQuiz();
    }

    App();

    


// Renders the next question
  function nextMove(){
     nextEl.addEventListener("click",function(){
      if(quiz.hasEnded() == false){
      const selectedEl = document.querySelector("input[name='choice']:checked");
      if (selectedEl) {
       const key = Number(selectedEl.getAttribute("data-order"));
      // const pey = selectedEl.parentElement.childNodes[3].innerText.toString();
       console.log(key)
       quiz.guess(key);
       renderQuiz();
        }
       }
     });
  }


  
// Sets the inner HTML value of any element
    function setValue(elem,value){
      elem.innerHTML = value;
    }

// Gets a new Question on the screen
    function renderQuestion(){
   
      if(quiz.hasEnded() == false){
      const recentQuestion = quiz.getCurrentQuestion().question;
      setValue(questionEl,recentQuestion);
      }
      
    }


// Sets the new options
    function renderChoicesElements(){
      if(quiz.hasEnded() == false){
      let markup = "";
      const currentChoice = quiz.getCurrentQuestion().choices;
      currentChoice.forEach((item,index) => {
       markup += `
       <li class="jabquiz__choice">
         <input type="radio" name="choice" class="jabquiz__input" data-order="${index}" id="choice${index}">
         <label for="choice${index}" class="jabquiz__label">
           <i></i>
           <span>${item}</span>
         </label>
       </li> `
      });
      setValue(choicesEl,markup);
    }
     }

// Keeps control of the tracker
     function renderTracker(){
      const index = quiz.currentIndex;
      setValue(trackerEl,`${index} of ${quiz.questions.length}`)
     }

// Restarts the quiz  when clicked 
    restartButtonEl.addEventListener("click", function() {

      if(confirm(`Do you really want to QUIT ?`)){
        quiz.reset();
        renderAll();
        nextEl.style.opacity = "1";
        setValue(taglineEl,`Pick an option`);
      }
      else{
       alert(`Dont quit okay !!`)
      } 
    });


// Function made to get the percentage of two numbers
    function getPercentage(num1,num2){
     return Math.round((num1/num2)*100);
    }


// Set width of the progress bar at assigned
    function launch(width){
      progressEl.style.width = width + '%';
    }

// Finds the width and sets it
    function renderProgress(){
     const currentWidth =  getPercentage(quiz.currentIndex,quiz.questions.length)
     launch(currentWidth);
    }

// renders the final screen
    function renderEndscreen(){
     renderProgress();
     console.log(quiz.score);
     setValue(questionEl,`Great Job !`)
     setValue(taglineEl,`Your score is ${getPercentage(quiz.score,quiz.questions.length)}%`)
    }

    
// The main function which controls quiz and check if has ended or not
    function renderQuiz(){
      if(quiz.hasEnded()){
       renderEndscreen();
       nextEl.style.opacity = "0.5";
      }
       renderAll();
    }

// Function containing all major function
    function renderAll(){
      renderTracker();
      // render the questions
      renderQuestion();
      // render the options
       renderChoicesElements();
      // render the functionality of next button to move to next question
       nextMove();
      // render the progress tracker
       renderProgress();
    }

  })

 








 
    
 

    
    


