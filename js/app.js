
import Quiz from "./Quiz.js";

const q1 = new Question(
  "Who is the president of USA",
 ["Barack","Micheel","Trump","George"],
 'Barack');

   let ques = [q1];

    const quiz = new Quiz(ques);
 

fetch("https://opentdb.com/api.php?amount=20")
      .then(res =>{
        return res.json();
      })
      .then(data =>{
        data.results.map(loadedQuestion=>{
          const formattedQuestion =  {
            question : loadedQuestion.question,
            choices : [...loadedQuestion.incorrect_answers],
            answerKey : loadedQuestion.correct_answer
          }
          
          ques = formattedQuestion;
          let Array = [];
         
          Array.push(formattedQuestion);
          console.log(Array);

        //  const ques = formattedQuestion;
          App();

          })
         
      
      })

 

// I have used the revealing module pattern in my Quiz app


 // Cache out the DOM
    const nextEl = document.querySelector(".next");
    const choicesEl = document.querySelector(".jabquiz__choices");
    const  questionEl = document.querySelector(".jabquiz__question");
    const restartButtonEl = document.querySelector(".restart");
    const trackerEl = document.querySelector(".jabquiz__tracker");
    const progressEl = document.querySelector(".progress__inner");
    const taglineEl = document.querySelector(".jabquiz__tagline");

   
  
   
 // The Question Object
    function Question(question,choices,answerKey){
       this.question = question;
       this.choices = choices;
       this.answerKey = answerKey;
    }

 
    Question.prototype.isCorrect = function(guessKey){
       return guessKey === this.answerKey;
    }

   
 // Created 5 instances of the Question
    

    // const q1 = new Question(
    //   data.results[Math.floor(Math.random()*10)].question,
    //   data.results[1].incorrect_answers,
    //   data.results[1].correct_answer
    // )


    // const q2 = new Question(
    //  "Which is the best programming language",
    // ["Java","Haskell","C#","JS"],
    // 'C#');

    // const q3 = new Question(
    //  "The BEST javascript frameworkW",
    // ["React","Angular","Vue","Any you like to start"],
    // 'Vue');

    // const q4 = new Question(
    //  "Your life changing year",
    // ["2019","2020","2000","2018"],
    // 1);

    // const q5 = new Question(
    //  "Which is not a module Pattern",
    // ["Module pattern","Refactor","Facade","Constructor"],
    // 0);

    


 // renders the next question
  function nextMove(){
     nextEl.addEventListener("click",function(){
      const selectedEl = document.querySelector("input[name='choice']:checked");
      if (selectedEl) {
      //  const key = Number(selectedEl.getAttribute("data-order"));
       const key = selectedEl.parentElement.childNodes[3].innerText.toString();
       quiz.guess(key);
      renderQuiz();
      }
     });
    };

 // Sets the inner HTML value of any element
    function setValue(elem,value){
      elem.innerHTML = value;
    }

  // Gets a new Question on the screen
    function renderQuestion(){
      const recentQuestion = quiz.getCurrentQuestion().question;
      setValue(questionEl,recentQuestion);
    }


  // Sets the new options
    function renderChoicesElements(){
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

    // They still keep rendered

    const App = () => {
       renderQuiz();
       nextMove();
    }
  
    // These are the only two function which can be used outside the module
    
  

    // Rendered the Quiz


   
    
