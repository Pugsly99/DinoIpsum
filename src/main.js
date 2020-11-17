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

function displayDinoWord(dinoWord) {
  dinoWord.toString().split("");
  $('#showLetters').text(`${dinoWord}`);
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
        const dinoWord = dinoResponse;
        displayDinoWord(dinoWord);
        return DinoIpsum.getIpsum(dinoWord);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});
