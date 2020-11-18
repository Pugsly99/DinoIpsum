import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoIpsum from './services/dino-ipsum';

//BL
function clearFields() {
  $('#row').text("");
  $('#letterGuess').val("");
}

function displayDinoWord(dinoArray) {
  for(let j = 0; j <= dinoArray.length -1; j++) {
    $(`#letter${j}`).text(dinoArray[j]);
    $(`#underscore${j}`).text("_ ");
  }
}

function checkLetter(letter, dinoArray, wrong) {
  for(let l = 0; l <= dinoArray.length -1; l++) {
    if(letter === dinoArray[l]) {
      $(`#letter${l}`).show();
      $(`#underscore${l}`).hide();
    }
  } 
  if(dinoArray.includes(letter) === false) {
    let totalWrong = wrong + 1;
    console.log(totalWrong);
  } else if(totalWrong === 8) {
    alert("OUT OF TURNS");
    }
}

function displayErrors(error) {
  $('#errors').text(`${error}`);
}

//UL
$(document).ready(function() {
  let dinoArray = [];
  $('#dinoButton').click(function(event) {
    let wrong = 0;
    clearFields();
    event.preventDefault();
    DinoIpsum.getIpsum()
      .then(function(dinoResponse) {
        if (dinoResponse instanceof Error) {
          throw Error(`Dino API error: ${dinoResponse.message}`);
        }
        const dinoWord = dinoResponse.toString().toLowerCase().split("");
        for(let i = 0; i <= dinoWord.length - 1; i++) {
          dinoArray.push(dinoWord[i]);
        }
        console.log(dinoArray);
        displayDinoWord(dinoArray);
        return DinoIpsum.getIpsum(dinoArray);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });

    $('#letterButton').click(function(event) {
      event.preventDefault();
      let letter = $('#letterGuess').val();
      checkLetter(letter, dinoArray, wrong);
    });
  });

  
});


