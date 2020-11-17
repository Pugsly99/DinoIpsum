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
  for(let j = 0; j <= dinoArray.length; j++) {
    $(`#letter${j}`).text(dinoArray[j]);
    $(`#underscore${j}`).text("_ ");
  }
}

function checkLetter(letter, dinoArray) {
  let wrong = 0;
  for(let l = 0; l <= dinoArray.length; l++) {
    if(letter === dinoArray[l]) {
      $(`#letter${l}`).show();
      $(`#underscore${l}`).hide();
    } else if(is_dinoArray(letter) = false) {
      console.log(wrong);
      wrong = wrong + 1
    } else if(wrong === 8) {
      alert("OUT OF TURNS");
    }
  }
}

function displayErrors(error) {
  $('#errors').text(`${error}`);
}

//UL
$(document).ready(function() {
  let dinoArray = [];
  $('#dinoButton').click(function(event) {
    clearFields();
    event.preventDefault();
    DinoIpsum.getIpsum()
      .then(function(dinoResponse) {
        if (dinoResponse instanceof Error) {
          throw Error(`Dino API error: ${dinoResponse.message}`);
        }
        const dinoWord = dinoResponse.toString().split("");
        for(let i = 0; i <= dinoWord.length; i++) {
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
      checkLetter(letter, dinoArray);
    });
  });

  
});


