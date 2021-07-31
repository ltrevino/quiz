//Elements declarations, not completely done in html just for practice

var body = document.body;
var h1El = document.createElement("h1");

var timerEl = document.createElement("p");

var quizEl = document.createElement("div");
var questionEl = document.createElement("div");
var answersEl = document.createElement("div");
var controlEl = document.createElement("div");

var correctEl = document.createElement("div");

var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");

var resultsEl = document.createElement("div");
var nameEl = document.createElement("input");

var nextButtonEl = document.createElement("button");
var resetButtonEl = document.createElement("button");

var chart=document.createElement("div");

//Attributes adn content definition
nextButtonEl.setAttribute("type", "button");
nextButtonEl.setAttribute("id", "next-button");

resetButtonEl.setAttribute("type", "button");
resetButtonEl.setAttribute("id", "next-button");

h1El.textContent = "Take this Quiz to know your skills!";

nameEl.setAttribute("type", "text");
nameEl.setAttribute("placeholder", "Write your name to save your results.");
resultsEl.setAttribute("style", "visibility: hidden");

timerEl.setAttribute("class", "timer");
timerEl.textContent = "Start your Quiz";



//Create the DOM
body.appendChild(h1El);
body.appendChild(timerEl);
body.appendChild(quizEl);
quizEl.appendChild(questionEl);
quizEl.appendChild(answersEl);
quizEl.appendChild(correctEl);

answersEl.appendChild(li1);
answersEl.appendChild(li2);
answersEl.appendChild(li3);
answersEl.appendChild(li4);

quizEl.appendChild(controlEl);
quizEl.appendChild(resultsEl);
resultsEl.appendChild(nameEl);

resultsEl.appendChild(nextButtonEl);
nextButtonEl.textContent="Send";

resultsEl.appendChild(resetButtonEl);
resetButtonEl.textContent="Reset";

resultsEl.appendChild(chart);

//Question Bank
var questionBank;
var answerBank;

questionBank=["Choose the language used to manage styles.","Choose the language used to manage scripting.","Choose the technology used to communicate with browser."];
answerQuestionBank=["0","1","2"];
answer1=["CSS","English","External apis"];
answer2=["Javascript","Javascript","Google Apis"];
answer3=["PHP","Google Chrome", "Web Apis"];
answer4=["Python","Microsoft Windows","Hardware Apis"];

answersEl.children[0].setAttribute("id", "0");
answersEl.children[1].setAttribute("id", "1");
answersEl.children[2].setAttribute("id", "2");
answersEl.children[3].setAttribute("id", "3");

//Question initialization
var questionIndex = 0
var puntuacion = 0;


//Continua() function defines the normal flow for the first time and for the end of Quiz.
continua();

//Event to be triggered every answer over the answer options
answersEl.addEventListener("click", function() {
    //Debuging purposes
    //console.log("entra a clic respuesta");
    event.preventDefault();
    event.stopPropagation();
    
    //Validation to the last question
    if(questionIndex<questionBank.length)
    {
        califica( (questionIndex) ,event.target.id);
        questionIndex++;
    }

    //Function that continues flow.
    continua();
      
});


    function continua(){
        //Debuging purposes
        //console.log("entra a continua");
        
        countdown();

        if(questionIndex<questionBank.length){
            answersEl.setAttribute("style", "display: visible");
            questionEl.setAttribute("style", "display: visible");
            questionEl.textContent = questionBank[questionIndex];
            answersEl.children[0].textContent = answer1[questionIndex];
            answersEl.children[1].textContent = answer2[questionIndex];
            answersEl.children[2].textContent = answer3[questionIndex];
            answersEl.children[3].textContent = answer4[questionIndex];
        }
        else{

            answersEl.setAttribute("style", "display: none");
            questionEl.setAttribute("style", "display: none");
            termina();
        }
    } 

    function califica(question, answer){
        console.log("entra a califica");

        console.log(questionIndex+" "+answer);
        if(answer==answerQuestionBank[question]){
        
            puntuacion = puntuacion+1;
            console.log("puntuacion"+puntuacion);

            var timeLeft2 = 5;
            var timeInterval2 = setInterval(function () {
                timeLeft2--;
                correctEl.textContent = "CORRECT!";

                if(timeLeft2 === 0) {
                // Stops execution of action at set interval
                clearInterval(timeInterval2);
                // Calls function to create and append image
                correctEl.textContent = "";
                }
            },100);
              
        }
        else{
            var timeLeft3 = 5;
            var timeInterval3 = setInterval(function () {
                timeLeft3--;
                correctEl.textContent = "INCORRECT!";

                if(timeLeft3 === 0) {
                // Stops execution of action at set interval
                clearInterval(timeInterval3);
                // Calls function to create and append image
                correctEl.textContent = "";
                }
            },100);
            puntuacion = puntuacion;
        }
    

    }


    function termina(){
        //Debug purposes
        //console.log("entra a termina");

        timerEl.setAttribute("style", "display: none");
        timerEl.textContent = "Your Quiz has started."
        timeLeft=0;
        //Restarts the index for new Quiz.
        questionIndex=0;

        //Disable options
        nextButtonEl.setAttribute("style", "display: visible");
        resetButtonEl.setAttribute("style", "display: none");
        resultsEl.setAttribute("style", "visibility: visible");
        nameEl.setAttribute("style", "display: visible");
        
        
    }


//Event to send results to localStorage
nextButtonEl.addEventListener("click", function(event) {
    //Debug purposes
    //console.log("entra a send");
    
    event.preventDefault();
    event.stopPropagation();
    
    var grades = {
      firstName: nameEl.value.trim(),
      puntuacion: puntuacion
    };
    
    localStorage.setItem(nameEl.value, JSON.stringify(grades));
    
    //reset the last grade.
    puntuacion=0;

    //Calls the Chart
    showResults();

});


//Function to display the chart of grades.
function showResults(){
    //Debug purposes
    //console.log("entra a show results");

    resetButtonEl.setAttribute("style", "display: visible");
    nextButtonEl.setAttribute("style", "display: none");
    nameEl.setAttribute("style", "display: none");
    
        //Get the localstorage and create an array.
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
            
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }
    
       
        //Parsing the array.
        for (let index = 0; index < values.length; index++) {
        
            var parse=JSON.parse(values[index]);
            var topGrades=document.createElement("div");
            topGrades.setAttribute("class", "grades");
            chart.appendChild(topGrades);
            topGrades.textContent=parse.firstName+" obtained "+parse.puntuacion+" points.";
            
        }

}

//Event to restart the Quiz.
resetButtonEl.addEventListener("click", function(event) {
    //Debug purposes.
    //console.log("entra a reset");
    event.preventDefault();
    event.stopPropagation();
    chart.innerHTML='';
    resultsEl.setAttribute("style", "visibility: hidden");
    continua();

});


var timeLeft;
function countdown() {
    
    timeLeft=50;
    timerEl.setAttribute("style", "display: visible");
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      //
      // YOUR CODE HERE
      //
  
      timeLeft--;
      timerEl.textContent = timeLeft + "s REMAINING.";
  
      if(timeLeft <= 0) {
        // Stops execution of action at set interval
        clearInterval(timeInterval);
        // Calls function to create and append image

        answersEl.setAttribute("style", "display: none");
        questionEl.setAttribute("style", "display: none");
        timerEl.setAttribute("style", "display: none");
        termina();
      }
    },1000);
  }

 countdown();