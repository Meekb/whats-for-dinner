// DOM VARIABLES
    //buttons
var addRecipeBtn = document.getElementById('add-recipe');
var dessertBtn = document.getElementById('dessert');
var entireMealBtn = document.getElementById('entire-meal');
var letsCookBtn = document.getElementById('lets-cook');
var mainDishBtn = document.getElementById('main-dish');
var sideDishBtn = document.getElementById('side');
var clearBtn = document.getElementById('clear');
var radioBtns = document.querySelectorAll('.radio');

    //page areas
var cookpot = document.getElementById('cookpot');
var leftSide = document.getElementById('left');
var rightSide = document.getElementById('right');



// EVENT LISTENERS
window.addEventListener('load', changeCookpotVisibility)
letsCookBtn.addEventListener('click', generateRandomRecipe);
rightSide.addEventListener('click', resetLRSides);
// leftSide.addEventListener('change', disableUnchecked);


// EVENT HANDLERS
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
};

function generateRandomRecipe() {
  for (i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].checked && radioBtns[i].id === 'entire-meal') {
      entireMealInnerHTML();
    }
  }
  changeRadioStatus();
  changeLetsCookClickability();
}

function entireMealInnerHTML() {
    rightSide.innerHTML = '';
      rightSide.innerHTML =
        `
        <div>
          <br><p class="recipe" id="recipe">You should make:</p>
          <p>${mains[getRandomIndex(mains)]} with a side of</p>
          <p>${sides[getRandomIndex(sides)]} and ${desserts[getRandomIndex(desserts)]}!</p>
          <br><br><br><br><button type="button" name="clear" class="clear" id="clear">CLEAR</button>
        </div>
         `
}

function sideRecipeInnerHTML() {
    rightSide.innerHTML = '';
    rightSide.innerHTML =
    `
    `
}


function resetLRSides() {
  if (event.target.id === 'clear') {
    rightSide.innerHTML = '';
    changeRadioStatus()
    changeCookpotVisibility();
    changeLetsCookClickability();
   }
 }

function changeRadioStatus() {
  for (var i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].disabled) {
      radioBtns[i].disabled = !radioBtns[i].disabled;
      console.log('working?');
    }
  }
}

function disableUnchecked(event) {
  for (var i = 0; i < radioBtns.length; i++) {
    if (event.target.id === 'radio' && radioBtns[i].checked) {
      radioBtns[i].disabled = false;
    } else {
      radioBtns[i].disabled = true;
    }
  }
}

function changeCookpotVisibility() {
    rightSide.innerHTML =
    `
    <img src="assets/cookpot.svg" alt="Cookpot icon" class="cook-pot" id="cookpot">
    `
}

function changeLetsCookClickability() {
  if (!letsCookBtn.disabled) {
    letsCookBtn.disabled = !letsCookBtn.disabled
  }
}
