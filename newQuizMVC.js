"use strict";
//---------------------------------------------View-----------------------------------------------------------------

let view = (function () {
  document.querySelector(".DivMiddle").style.display = "none";
  document.querySelector("#detailsDiv").style.display = "none";
  document.querySelector(".DivTop_1").style.display = "none";
  document.querySelector(".DivTop_2").style.display = "none";
  document.querySelector("#Result_div").style.display = "none";

  return {
    showQuiz: function () {
      document.querySelector(".DivMiddle").style.display = "block";
      document.querySelector("#detailsDiv").style.display = "none";
      document.querySelector(".DivTop_1").style.display = "block";
      document.querySelector(".DivTop_2").style.display = "block";
    },

    showResult: function () {
      document.querySelector(".DivMiddle").style.display = "none";
      document.querySelector("#Result_div").style.display = "block";
      document.querySelector(".DivTop_2").style.display = "none";
    },
  };
})(); //IIFE
//
//
//--------------------------------------------Controller------------------------------------------------------------
//
//
//
let controller = (function () {
  var correctAns = [
    "D1",
    "D2",
    "A3",
    "C4",
    "D5",
    "D6",
    "A7",
    "B8",
    "C9",
    "B10",
  ];

  var answerSheet = [];
  return {
    checkUser: function () {
      let nameID, password;
      nameID = document.getElementById("idBox").value;
      password = document.getElementById("passwordBox").value;
      if (nameID === "8860" && password === "8860") {
        document.querySelector("#detailsDiv").style.display = "block";
        document.querySelector(".DivLower").style.display = "none";
      } else {
        alert("Invalid");
      }
    },
    checkAnswer: function () {
      let score = 0;
      for (let i = 0; i <= answerSheet.length - 1; i++)
        if (correctAns.includes(answerSheet[i])) {
          // if don't use includes then you have to attempt questions sequence wise from 1 to 10
          console.log("Correct");
          score++;
        } else {
          console.log("Incorrect");
          score = score - 0.25;
        }

      return score;
    },
    answerSheet,
    addScore: function () {
      var html, newhtml, updatedScore;
      updatedScore = controller.checkAnswer();
      html = '<p id="Score">You scored %____% out of 10.</p>';
      newhtml = html.replace("%____%", updatedScore);

      document
        .querySelector("#Result_div")
        .insertAdjacentHTML("afterbegin", newhtml);
    },
  };
})(); //IIFE
//
//
//
//
//--------------------------------------------------Model---------------------------------------------------------
//
//
//
//
let model = (function (ctrl, view) {
  let getAccess = ctrl.checkUser;
  let startQuiz = view.showQuiz;
  let checkAns = ctrl.checkAnswer;
  // let startTimer = ctrl.timer;

  let setupEventListner = function () {
    document.querySelector("#quizAccess").addEventListener("click", getAccess);
    document.querySelector("#start").addEventListener("click", startQuiz);
    document.querySelector("#start").addEventListener("click", timer);
    document.querySelector("#submitQuiz").addEventListener("click", submit);
    document.querySelector("#submitQuiz").addEventListener("click", checkAns);
    document.querySelector("#Exit").addEventListener("click", exit);
    document
      .querySelector("#clear_btn1")
      .addEventListener("click", clearResponse.bind(null, "Ques_1"));

    document
      .querySelector("#clear_btn2")
      .addEventListener("click", clearResponse.bind(null, "Ques_2"));
    document
      .querySelector("#clear_btn3")
      .addEventListener("click", clearResponse.bind(null, "Ques_3"));
    document
      .querySelector("#clear_btn4")
      .addEventListener("click", clearResponse.bind(null, "Ques_4"));
    document
      .querySelector("#clear_btn5")
      .addEventListener("click", clearResponse.bind(null, "Ques_5"));
    document
      .querySelector("#clear_btn6")
      .addEventListener("click", clearResponse.bind(null, "Ques_6"));
    document
      .querySelector("#clear_btn7")
      .addEventListener("click", clearResponse.bind(null, "Ques_7"));
    document
      .querySelector("#clear_btn8")
      .addEventListener("click", clearResponse.bind(null, "Ques_8"));
    document
      .querySelector("#clear_btn9")
      .addEventListener("click", clearResponse.bind(null, "Ques_9"));
    document
      .querySelector("#clear_btn10")
      .addEventListener("click", clearResponse.bind(null, "Ques_10"));
  };
  var interval;

  var timer = function () {
    var counter = 0;
    var timeLeft = 60;

    var convertSeconds = function (seconds) {
      var min = Math.floor(seconds / 60);
      var sec = seconds % 60;
      function twoDigits(n) {
        return n <= 9 ? "0" + n : n;
      }
      var minLeft = twoDigits(min);
      var secLeft = twoDigits(sec);
      return minLeft + ":" + secLeft;
    };
    // console.log(convertSeconds(90)); // Total Time 90secs = 1.5min

    let showTime = function () {
      counter++;
      var newTimeLeft = convertSeconds(timeLeft - counter);
      document.getElementById("Timer").textContent = newTimeLeft;

      if (newTimeLeft === "00:00") {
        submit();
        clearInterval(interval);
      }
    };
    interval = setInterval(showTime, 1000);
  };

  function clearResponse(Ques) {
    var radioBtnVal = document.getElementsByName(Ques);
    for (let i = 0; i < radioBtnVal.length; i++) {
      radioBtnVal[i].checked = false;
    }
  }
  let answerSheet = ctrl.answerSheet;
  let submit = function () {
    var ans = document.getElementsByTagName("input");
    for (let i = 0; i < ans.length; i++) {
      if ((ans[i].type = "radio")) {
        if (ans[i].checked) {
          answerSheet.push(ans[i].value);
        }
      }
    }
    clearInterval(interval);
    view.showResult();
    ctrl.addScore();
  };

  let exit = function () {
    window.location.reload();
  };
  return {
    init: function () {
      setupEventListner();
      console.log("Hello");
    },
  };
})(controller, view); // IIFE

model.init(); // Initial fn
