import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoIpsum from './services/dino-ipsum';

//BL
function clearFields() {
  $('#showLetters').text("");
  $('#letterGuess').val("");
}

function displayDinoWord(dinoArray) {
  for(let j = 0; j <= dinoArray.length; j++) {
    $(`#letter${j}`).text(dinoArray[j]);
  }
  
}
function displayErrors(error) {
  $('#showLetters').text(`${error}`);
}

//UL
$(document).ready(function() {
  $('#dinoButton').click(function() {
    clearFields();
    DinoIpsum.getIpsum()
      .then(function(dinoResponse) {
        if (dinoResponse instanceof Error) {
          throw Error(`Dino API error: ${dinoResponse.message}`);
        }
        const dinoWord = dinoResponse.toString().split("");
        let dinoArray = [];
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
  });
});


