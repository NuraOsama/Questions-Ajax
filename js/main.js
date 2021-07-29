let countSpan=document.querySelector(".count span");
let mainBullets=document.querySelector(".bullets");
let bullets=document.querySelector(".bullets .spans");
let quizContent=document.querySelector(".quiz-content");
let Questions=document.querySelector(".quiz-area");
let Answers=document.querySelector(".answers-area");
let submitBtn=document.querySelector(".btn");
let MainResults=document.querySelector(".results");
let MainCount=document.querySelector(".countdown");
let countQuestions=0;
let rightAnswerCount=0;
let countDownInterval;

(function ($) { 

  
    $.ajax({

      url:"./json/question.json",
      method:"Get",
      dataType:"json",
      success:function(data){
   
      
       let dataLength=data.length;

        //Bullets Function
       createBullets(dataLength);
        
      
        //Questions Data Function
        createQuestionsData(data[countQuestions],dataLength);

        // Counter Function
        
        Counter(7,dataLength);


        //Submit Button Function

        $(submitBtn).on('click',function(){

          if( countQuestions < dataLength){

          let rightAnswer=data[countQuestions].right_answer;

          // Right Answer Fuction
          getRightAnwser(rightAnswer,dataLength);

          }
          // Delete Pervious Question 

          Questions.innerHTML='';

          Answers.innerHTML='';

          // Increase Count to get the next answer

          countQuestions++;

          // Get Next Question

          createQuestionsData(data[countQuestions],dataLength);
          
          // Handle Bullets On Class Depend of Next Question Functions

          bulletsOn();

          // Create Results
           

         clearInterval(countDownInterval);
          Counter(7,dataLength);

          // Results Function


           QuestionResults(dataLength);


         
          
        })
        
      
      },
      error:function(xhr,stauscode,error){
   
        console.log(xhr);
        console.log(stauscode);
        console.log(error);

      }
    })

})(jQuery);

// Bullets Function By Jquery

  function createBullets(num){

  countSpan.innerHTML=`Questions Number: ${num}`;

    // create bullets span

    for(let i=0; i< num ; i++){
    
    let createBulletsSpan=document.createElement('span');
    bullets.appendChild(createBulletsSpan);

    // make first question on and marked
     if(i==0){

      createBulletsSpan.className="on";
    }

}

}

//Questions  Function

function createQuestionsData(obj,num){

  if(countQuestions < num){
   // Create Question 

   let createQuestionElement=document.createElement('h2');

   let createQuestionText=document.createTextNode(obj.title);

    createQuestionElement.appendChild(createQuestionText);

    Questions.appendChild(createQuestionElement);

    // Create Answers

    for(i=1; i<=4 ; i++){

       //Create Answer Main Div
       let createMainDiv=document.createElement('div');
       createMainDiv.className="answer";
       //Create Input Type Radio For Answers
       let radioAnswers=document.createElement('input');
       radioAnswers.type='radio';
       radioAnswers.name='question';
       radioAnswers.id=`answer_${i}`;
       radioAnswers.dataset.answer=obj[`answer_${i}`];

       //Make First Input Checked
      /* if(i==1){
        radioAnswers.checked=true;

       }*/
       
       //Create Label for Inputs

       let LabelInputs=document.createElement('label');

       LabelInputs.htmlFor=`answer_${i}`;
       
       let LabelText=document.createTextNode(obj[`answer_${i}`]);

       LabelInputs.appendChild(LabelText);
       
       //Append  Input Type Radio & Lables To MainDiv
       createMainDiv.appendChild(radioAnswers);
       createMainDiv.appendChild(LabelInputs);

       //Append MainDiv To Answers Area

       Answers.appendChild(createMainDiv);

       
    }
  
  }  
  
}

// Right Answer Fuction

function getRightAnwser(rAnswer){

    
     let allAnswers=document.getElementsByName('question');
     let checkedAnswer;
              
     for(let i=0; i< allAnswers.length; i++){

      if(allAnswers[i].checked){

      checkedAnswer=allAnswers[i].dataset.answer;

      }
     }

     countSpan.innerHTML=`You Answered :${rightAnswerCount}`;


     if(rAnswer === checkedAnswer ){
     
       rightAnswerCount++;

       countSpan.innerHTML=`You Answered :${rightAnswerCount}`;
       console.log(`Good Answer`);

     }
    
}

// Bullets On Fuction
function bulletsOn(){

  let allBullets=document.querySelectorAll('.bullets .spans span');

  for(let i=0; i< allBullets.length; i++){

   
    if( i == countQuestions){

      allBullets[i].className="on";

    }
  /*  else{

      allBullets[i].className=" ";


    }*/


  }

  // Another Way to get Index Of Bullets by Convert it to Array and Using For each

  /* let arrayBullets=Array.from(allBullets);

   allBullets.forEach(function(span,index){

    if(index === countQuestions){

      span.className="on";

    }
   })*/

}

// Results Function

function QuestionResults(num){


  if(countQuestions == num){

    quizContent.remove();
    submitBtn.remove();
    mainBullets.remove();

  let Results;

  if( rightAnswerCount > num/2 && rightAnswerCount < num ){

    Results=`<span class="good">Good</span> Your Answered ${rightAnswerCount} From ${num}`;
    
  }
  else if(rightAnswerCount == num){

    Results=`<span class="perfect">Perfect</span> Your Answered ${rightAnswerCount} From ${num}`;

  }
  else{

    Results=`<span class="bad">Bad</span> Your Answered ${rightAnswerCount} From ${num}`;

  }

    MainResults.innerHTML=Results;
  }

}


//Counter Function

function Counter(duration,num){

  if(countQuestions < num){

    let minutes, seconds;

    countDownInterval=setInterval(function(){

      minutes=parseInt(duration / 60);
      seconds=parseInt(duration % 60);

      minutes= minutes < 10 ? `0${minutes}`: minutes;
      seconds= seconds < 10 ? `0${seconds}`: seconds;

      MainCount.innerHTML=`${minutes}:${seconds}`;

      if(--duration < 0){
      clearInterval(countDownInterval);
      submitBtn.click();
      }

    },1000)
  }
}


//Posting Data 

/*(function ($) { 

  
  $.ajax({

    url:"./json/question.json",
    method:"Get",
    dataType:"json",
    success:function(data){
 
  

     /* let dataValues=''*/
      /*for(let i=0; i< data.length; i++){

          dataValues += data[i].title

      }*/
      /*$.each(data,function(key,value){

        {
         dataValues.push("<li>"+ key +','+ value.title+"</li>")
         }
      })*/
      /* $.each(data,function(key){

        dataValues +=data[key].title;

       })*/


      /* $(".quiz-area").append('<div>'+dataValues+'</div>')*/
     /*$(".quiz-area").html("<ul>"+ dataValues.join("") +"</ul>")*/
    /* $(".quiz-area").append('<div>'+dataValues+'</div>')*/


    /*},
    error:function(xhr,stauscode,error){
 
      console.log(xhr);
      console.log(stauscode);
      console.log(error);

    }
  })

})(jQuery);*/

// Bullets Function By Jquery

/*$(function () {

     //Bullets Function by JQuery In Ajax Call

    // $(document).createBullets(dataLength);
    
  $.fn.createBullets=function (num){
  
    countSpan.innerHTML=`Questions Number: ${num}`;
  
      // create bullets span
  
      for(let i=0; i< num ; i++){
      
      let createBulletsSpan=document.createElement('span');
      bullets.appendChild(createBulletsSpan);
  
      // make first question on and marked
       if(i==0){
  
        createBulletsSpan.className="on";
      }
  
  }
  
  }
  });*/
