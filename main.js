// DOM VARIABLES
    //buttons
var addRecipeBtn = document.getElementById('add-recipe');
var clearBtn = document.getElementById('clear');
var dessertBtn = document.getElementById('dessert');
var entireMealBtn = document.getElementById('entire-meal');
var favBtn = document.getElementById('favorite');
var letsCookBtn = document.getElementById('lets-cook');
var mainDishBtn = document.getElementById('main-dish');
var radioBtns = document.querySelectorAll('.radio');
var sideDishBtn = document.getElementById('side');

    //page areas
var cookpot = document.getElementById('cookpot');
var leftSide = document.getElementById('left');
var rightSide = document.getElementById('right');

// EVENT LISTENERS
window.addEventListener('load', changeCookpotVisibility)
leftSide.addEventListener('change', disableUnchecked);
letsCookBtn.addEventListener('click', generateRandomRecipe);
rightSide.addEventListener('click', saveOrClear);

// Global VAR
var newRecipe;

// EVENT HANDLERS
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
};

function generateRandomRecipe() {
  if (!checkSelectedRadios()) {
    alert('TELL US WHAT YOU\'RE LOOKING FOR!');
  } else if (checkSelectedRadios() === 'entire-meal') {
    entireMealInnerHTML();
  } else {
    singleItemInnerHTML();
  }
  disableLetsCookBtn();
}

function entireMealInnerHTML() {
  var main = mains[getRandomIndex(mains)];
  var side = sides[getRandomIndex(sides)];
  var dessert = desserts[getRandomIndex(desserts)];
  newRecipe = new Recipe({main: main, side: side, dessert: dessert});
  rightSide.innerHTML =
    `
    <div>
      <br><br><p class="recipe-head" id="recipe">You should make:</p>
      <p>${main} with a side of ${side} and ${dessert}!</p>
      <br><br><br><br><button type="button" name="favorite" class="fav grow" id="favorite">FAVORITE</button>
      <br><br><button type="button" name="clear" class="clear grow" id="clear">CLEAR</button>
    </div>
    `
}

function singleItemInnerHTML() {
  var item;
  if (checkSelectedRadios() === 'side') {
    item = sides[getRandomIndex(sides)];
  } else if (checkSelectedRadios() === 'main-dish') {
    item = mains[getRandomIndex(mains)];
  } else {
    item = desserts[getRandomIndex(desserts)];
  }
  rightSide.innerHTML =
  `
  <div>
  <br><br><p class="recipe-head" id="recipe">You should make:</p>
  <p>${item}!</p>
  <br><br><br><br><br><br><br><br><button type="button" name="clear" class="clear grow" id="clear">CLEAR</button>
  </div>
  `
}

function changeCookpotVisibility() {
  rightSide.innerHTML =
    `
    <img src="assets/cookpot.svg" alt="Cookpot icon" class="cook-pot" id="cookpot" width="147.7" height="269.11">
    `
}

function saveOrClear() {
  if (event.target.id === 'clear') {
    rightSide.innerHTML = '';
    enableLetsCookBtn();
    changeRadioStatus();
    changeCookpotVisibility();
  } else {
    saveEntireMeal(newRecipe);
  }
 }

function saveEntireMeal(newRecipe) {
  if (!favorites.includes(newRecipe)) {
    favorites.push(newRecipe);
  }
 }

function changeRadioStatus() {
  for (var i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].disabled || radioBtns[i].checked) {
      radioBtns[i].checked = false;
      radioBtns[i].disabled = false;
    }
  }
}

function disableUnchecked() {
  for (var i = 0; i < radioBtns.length; i++) {
    if (!radioBtns[i].checked) {
      radioBtns[i].disabled = true;
    }
  }
}

function checkSelectedRadios() {
  for (var i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].checked) {
      return radioBtns[i].id;
    }
  }
}

function disableLetsCookBtn() {
  if (checkSelectedRadios()) {
    letsCookBtn.disabled = true;
    letsCookBtn.classList.add('inactive');
  }
}

function enableLetsCookBtn() {
  letsCookBtn.disabled = false;
  letsCookBtn.classList.remove('inactive');
}
