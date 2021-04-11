// DOM VARIABLES
    //buttons
var buttons = document.querySelectorAll('button');
var addRecipeBtn = document.getElementById('add-recipe');
var clearBtn = document.getElementById('clear');
var dessertBtn = document.getElementById('dessert');
var entireMealBtn = document.getElementById('entire-meal');
var favBtn = document.getElementById('favorite');
var letsCookBtn = document.getElementById('lets-cook');
var mainDishBtn = document.getElementById('main-dish');
var radioBtns = document.querySelectorAll('.radio');
var sideDishBtn = document.getElementById('side');
var homeHolder = document.getElementById('home');
var homeBtn = document.getElementById('homeBtn');

    //page areas
var cookpot = document.getElementById('cookpot');
var leftSide = document.getElementById('left');
var mainArea = document.getElementById('main');
var rightSide = document.getElementById('right');
var savedArea = document.getElementById('saved');
var savedCard = document.getElementById('card');
var savedNav = document.getElementById('savedNav');
var cardTitle = document.getElementById('title');

// EVENT LISTENERS
window.addEventListener('load', changeCookpotVisibility)
leftSide.addEventListener('change', disableUnchecked);
letsCookBtn.addEventListener('click', generateRandomRecipe);
rightSide.addEventListener('click', saveClearOrView);

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
      <p>${main} with a side</p>
      <p>of ${side} and</p>
      <p>${dessert} for dessert!</p>
      <br><button type="button" name="favorite" class="fav grow" id="favorite">FAVORITE</button>
      <br><br><span><button class="view-fav-button grow" id="viewFavs">VIEW FAVS</button></span><span><button type="button" name="clear" class="clear grow" id="clear">CLEAR</button></span>
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
    <img src="assets/cookpot.svg" alt="Cookpot icon" class="cook-pot grow2" id="cookpot" width="147.7" height="269.11">
    `
}

function saveClearOrView() {
  if (event.target.id === 'favorite') {
    console.log('favorite button clicked')
    saveEntireMeal(newRecipe);
    console.log(favorites);
  } else if (event.target.id === 'viewFavs') {
    console.log('view favorites button clicked');
    // revealSavedArea();
    displaySavedRecipes();
      // invoke populate saved recipe cards function
  } else {
    console.log('clear button clicked');
    rightSide.innerHTML = '';
    enableLetsCookBtn();
    changeRadioStatus();
    changeCookpotVisibility();
  }
 }

 function displaySavedRecipes() {
   savedNav.classList.remove('hidden');
   savedArea.classList.remove('hidden');
   var recipeList = '';
   savedArea.innerHTML = '';
   for (var i = 0; i < favorites.length; i++) {
     recipeList +=
      `
      <article class="saved hidden" id="saved">
        <div class="recipe-card" id="card">
          <p class="saved-card" id="title">SAVED RECIPE</p>
          <p>${favorites[i].main}</p>
          <p>with a side</p>
          <p>of ${favorites[i].side} and</p>
          <p>${favorites[i].dessert} for dessert!</p>
        </div>
      </article>
      `
   }
   savedArea.innerHTML = recipeList;
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
