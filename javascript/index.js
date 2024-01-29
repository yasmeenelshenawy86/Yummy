"use strict";
/// <reference types="../@types/jquery" />
// ***************************Jquery Section**********************************
$(".nav-header #burgerIcon").on("click", function () {
  $("header .side-nav-menu .nav-tab").animate({ width: "250px" }, 1000);
  $(".nav-header #burgerIcon").addClass("d-none");
  $(".nav-header #close").removeClass("d-none");
  $("header .side-nav-menu .nav-tab .links li.one").animate(
    { top: "0" },
    200,
    function () {
      $("header .side-nav-menu .nav-tab .links li.two").animate(
        { top: "0" },
        200,
        function () {
          $("header .side-nav-menu .nav-tab .links li.three").animate(
            { top: "0" },
            200,
            function () {
              $("header .side-nav-menu .nav-tab .links li.four").animate(
                { top: "0" },
                200,
                function () {
                  $("header .side-nav-menu .nav-tab .links li.five").animate(
                    { top: "0" },
                    200
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});
$(".nav-header #close").on("click", function () {
  $("header .side-nav-menu .nav-tab").animate({ width: "0px" }, 1000);
  $(".nav-header #burgerIcon").removeClass("d-none");
  $(".nav-header #close").addClass("d-none");
});
// *************************Declaration Variables*****************************************
const readyDataSec = document.getElementById("readyData");
const readyRow = document.getElementById('readyRow');
const inputNameSearch = document.getElementById("inputSName");
const inputFNSearch = document.getElementById("inputFLetter");
const searchByName = document.getElementById("searchByName");
const detailsMealSec = document.getElementById("detailsMealSec");
const rowDetails = document.getElementById("rowDetails");
let mealDesc = [];
let mealDescBox=[];
let show;
let catData = [];
const rowCategory = document.getElementById("rowCat");
const catSec = document.getElementById("categories");
const filterSec = document.getElementById("filterCat");
const rowFilter = document.getElementById("rowFilterCat");
const nameInput = document.getElementById("nameInput");
const nameAlert = document.getElementById("nameAlert");
const emailAlert = document.getElementById("emailAlert");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const phoneAlert = document.getElementById("phoneAlert");
const ageInput = document.getElementById("ageInput");
const ageAlert = document.getElementById("ageAlert");
const uAgeAlert = document.getElementById("uAgeAlert");
const passInput = document.getElementById("passInput");
const repassInput = document.getElementById("repassInput");
const submitBtn = document.getElementById("submitBtn");
const rowForm = document.getElementById("form");
const Link_1 = document.querySelector("header ul .one");
const Link_2 = document.querySelector("header ul .two");
const Link_3 = document.querySelector("header ul .three");
const Link_4 = document.querySelector("header ul .four");
const Link_5 = document.querySelector("header ul .five");
const loading = document.querySelector(".loading-screen");
const FilterIngSec = document.getElementById("FilterIngre");
const tab = document.querySelector(".nav-tab");
const searchSec = document.getElementById("search");
const areaSec = document.getElementById("area");
const ingSec = document.getElementById("ingredients");
const contactSec = document.getElementById("contactUs");

let debounceTimer;
let recipeName = [];
let dataFSearch = [];
let dataSearch = [];
let ingData = [];
let filterCatData = [];
let areaData = [];
let target;
let z;
  // *****************************  Function Ready Document Data  *****************************
async function getReadyShow() {
  loading.classList.remove("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  if (response.ok == true) {
    const finalResponse = await response.json();
    loading.classList.add("d-none");
    show = finalResponse.meals;
    displayReadyData();
      document.querySelectorAll("#readyRow .meal").forEach((item) => {
        item.addEventListener("click", function () {
          detailsMealSec.classList.remove("d-none");
          getMealDetails(item.dataset.id);
          readyDataSec.classList.add("d-none");
        });
      });
  }
}
function displayReadyData() {
  let showBox = '';
  for (let i = 0; i < show.length; i++){
    showBox += `
    			<div class="col-md-3">
				<div data-id="${show[i].idMeal}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
					<img class="w-100" src=${show[i].strMealThumb} alt="Meal Photo">
					<div class="meal-layer position-absolute d-flex flex-column align-items-center text-black ">
						<h3 class="my-auto text-center">${show[i].strMeal}</h3>
					</div>
				</div>
			</div>
    `;
  }
  readyRow.innerHTML = showBox;
}
     // ********************************  Function Search By Name  *****************************

async function getSearchName(term) {
  loading.classList.remove("d-none");
  const response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
		);
		if (response.ok == true) {
			const finalResponse = await response.json();
      loading.classList.add("d-none");
	    dataSearch = finalResponse.meals;
      searchNDisplay(); 
      document.querySelectorAll("#searchByName .meal").forEach(item => {
        item.addEventListener('click', function () {
          detailsMealSec.classList.remove('d-none');
          getMealDetails(item.dataset.id);
          searchSec.classList.add('d-none');
          console.log(item.dataset.id);
        })
      });
    }
}
function searchNDisplay() {
  let nameMeal = "";
  for (let i = 0; i < dataSearch.length; i++) {
    z = dataSearch[i];
    nameMeal += `
    	<div class="col-md-3">
				<div data-id="${dataSearch[i].idMeal}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
					<img class="w-100" src=${dataSearch[i].strMealThumb} alt="Meal Photo">
					<div class="meal-layer position-absolute d-flex flex-column align-items-center text-black ">
						<h3 class="my-auto text-center">${dataSearch[i].strMeal}</h3>
					</div>
				</div>
			</div>
    `;
  }
  searchByName.innerHTML = nameMeal;
}
getSearchName();
// ********************************  Function Search By Letter  *****************************

async function getSearchFLetter(letter) {
  loading.classList.remove("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  if (response.ok == true) {
    const finalResponse = await response.json();
    loading.classList.add("d-none");
    dataFSearch = finalResponse.meals;
    displayFLetter();
    document.querySelectorAll("#searchByName .meal").forEach((item) => {
      item.addEventListener("click", function () {
        detailsMealSec.classList.remove("d-none");
        getMealDetails(item.dataset.id);
        searchSec.classList.add("d-none");
      });
    });
  }
}
function displayFLetter() {
  let card = "";
  for (let i = 0; i < dataFSearch.length; i++) {
    card += `
		<div class="col-md-3">
			<div data-id="${dataFSearch[i].idMeal}" class="meal position-relative p-2 text-center overflow-hidden">
				<img class="w-100" src=${dataFSearch[i].strMealThumb} alt="Meal Photo">
				<div class="meal-layer position-absolute d-flex align-items-center text-black ">
					<h4 class="mx-auto">${dataFSearch[i].strMeal}</h4>
				</div>
			</div>
		</div>
		`;
  }
  searchByName.innerHTML = card;
}
getSearchFLetter();
// *********************************  Function Meal Details(Ingredients)  ***************************************************
async function getMealDetails(id) {
  let cartona = "";
  let strTag = "";
  let ingredients = "";
  loading.classList.remove("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  if (response.ok == true) {
    const finalResponse = await response.json();
    mealDesc = finalResponse.meals;
    loading.classList.add("d-none");
    for (let i = 0; i < mealDesc.length; i++) {
      mealDescBox = mealDesc[i];
      console.log(mealDescBox.strTags);
      if (mealDescBox.strTags !== null) {
        let tags = (mealDescBox.strTags).split(",");
        for (let k = 0; k < tags.length; k++) {
          let str = tags[k].trim();
          if (str) {
            strTag += `
            <li class="alert alert-danger m-2 p-1">${str}</li>
            `;
          }
        }
      }
      for (let j = 0; j <= 20; j++) {
        const ing = mealDescBox[`strIngredient${j}`];
        const mea = mealDescBox[`strMeasure${j}`];
        if (ing && mea) {
          ingredients += `
            <li class="alert alert-info m-2 p-1">${mea} ${ing}</li>
          `;
        }
      }
      cartona = `
        <div class="col-md-4">
          <img class="w-100 rounded-3" src=${mealDescBox.strMealThumb} alt="Photo Recipes">
          <h2 class="text-white">${mealDescBox.strMeal}</h2>
          </div>
          <div class="col-md-8">
          <h2 class="text-white">Instructions</h2>
          <p class="text-white">${mealDescBox.strInstructions}</p>
          <h3 class="text-white"><span class="fw-bolder">Area : </span>${mealDescBox.strArea}</h3>
          <h3 class="text-white"><span class="fw-bolder">Category : </span>${mealDescBox.strCategory}</h3>
          <h3 class="text-white">Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
          <h3 class="text-white">Tags :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">${strTag}</ul>

          <a target="_blank" href="#"class="btn btn-success">Source</a>
          <a target="_blank" href=${mealDescBox.strYoutube} class="btn btn-danger">Youtube</a>
        </div>
      `;
      }
  }
  rowDetails.innerHTML = cartona;
}
getMealDetails(); 
// ***************************** Function Category **********************************
async function getCatData() {
		loading.classList.remove("d-none");
		const response = await fetch(
			`https://www.themealdb.com/api/json/v1/1/categories.php`
			);
	if (response.ok == true) {
		const finalResponse = await response.json();
		loading.classList.add("d-none");
		catData = finalResponse.categories;
    displayCategory();
		document.querySelectorAll("#rowCat .meal").forEach((card) => {
      card.addEventListener("click", function () {
        filterSec.classList.remove("d-none");
        filterCat(card.dataset.id);
        catSec.classList.add("d-none");
      });
    });
  }
}
function displayCategory() {
  let x = '';
  for (let i = 0; i < catData.length; i++){
    // console.log(catData[i].idCategory);
		x += `
			<div class="col-md-3">
				<div data-id="${catData[i].idCategory}" class="meal position-relative overflow-hidden rounded-2">
					<img class="w-100" src=${catData[i].strCategoryThumb} alt="Meal Photo">
					<div class="meal-layer position-absolute d-flex flex-column align-items-center text-black ">
						<h3 class="mx-auto">${catData[i].strCategory}</h3>
						<p id="desc" class="overflow-hidden p-2">${catData[i].strCategoryDescription}</p>
					</div>
				</div>
			</div>
		`;
	}
	rowCategory.innerHTML = x;
}
getCatData();
// *******************************Function Filter By Category***********************************
async function filterCat(id) {
  loading.classList.remove("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
  );
  if (response.ok == true) {
    const finalResponse = await response.json();
    loading.classList.add("d-none");
    filterCatData = finalResponse.meals;
    console.log(filterCatData);
    displayFilterCat();
    // document.querySelectorAll("#rowFilter .meal").forEach((card) => {
    //   card.addEventListener("click", function () {
    //      filterSec.classList.remove("d-none");
    //      getMealDetails(item.dataset.id);
    //     catSec.classList.add("d-none");
    //   });
    // });
  }
}
function displayFilterCat() {
  let y = "";
  for (let i = 0; i < filterCatData.length; i++) {
    y += `
        <div class="col-md-3">
          <div data-id="${filterCatData[i].idMeal}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src=${filterCatData[i].strMealThumb} alt="Meal Photo">
            <div class="meal-layer position-absolute d-flex flex-column align-items-center text-black ">
              <h4 class="m-auto text-center">${filterCatData[i].strMeal}</h4>
            </div>
          </div>
        </div>
     `;
  }
rowFilter.innerHTML = y;
}
filterCat('beef');
// ************************** Function Area ********************************
async function getArea() {
	loading.classList.remove("d-none");
	const response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/list.php?a=list`
	);
	if (response.ok == true) {
		const finalResponse = await response.json();
		loading.classList.add("d-none");
    areaData = finalResponse.meals;
    displayArea();
	}
}
function displayArea() {
  let areaBox = "";
	for (let i = 0; i < areaData.length; i++){
		areaBox += `
			<div class="col-md-3">
				<div data-id="${areaData[i]}" class="area text-white text-center">
					<i class="fa-solid fa-house-laptop fa-4x"></i>
					<h3>${areaData[i].strArea}</h3>
				</div>
			</div>
		`;
	}
	document.getElementById("rowArea").innerHTML=areaBox;
}
getArea(); 
// *****************************Function Filter By Area**************************************
let filterArea=[];
async function getFilterArea() {
  // loading.classList.remove("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`
  );
  if (response.ok == true) {
    const finalResponse = await response.json();
    // loading.classList.add("d-none");
    // console.log(finalResponse);
    filterArea = finalResponse.meals;
    console.log(filterArea);
    displayFilterArea();
      document.querySelectorAll("#rowArea .meal").forEach((item) => {
        item.addEventListener("click", function () {
          const f = item.getAttribute("data-id");
          console.log(f);
          detailsMealSec.classList.remove("d-none");
          getMealDetails(item.dataset.f);
          areaSec.classList.add("d-none");
        });
      });
  }
}
function displayFilterArea() {
  let box = '';
  for (let i = 0; i < filterArea.length; i++){
    console.log(filterArea[i]);
    box += `
    		<div class="col-md-3">
				<div data-id="${filterArea[i].idMeal}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
					<img class="w-100" src=${filterArea[i].strMealThumb} alt="Meal Photo">
					<div class="meal-layer position-absolute d-flex flex-column align-items-center text-black ">
						<h4 class="my-auto text-center">${filterArea[i].strMeal}</h4>
					</div>
				</div>
			</div>
    `;
  }
  document.getElementById('rowArea').innerHTML = box;
}
// *********************************** Function Ingredients ***********************************
async function getIngredient() {
	loading.classList.remove("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  if (response.ok == true) {
		const finalResponse = await response.json();
		loading.classList.add("d-none");
    ingData = finalResponse.meals;
    displayIngredient(); 
      document.querySelectorAll("#rowIng .meal").forEach((item) => {
        item.addEventListener("click", function () {
          FilterIngSec.classList.remove("d-none");
          getSearchByIng(item.dataset.id);
          ingSec.classList.add("d-none");
        });
      });
  }
}
function displayIngredient() {
  let ingBox = "";
  for (let i = 0; i < ingData.length; i++) {
    // console.log(ingData[i].strDescription);
    if (ingData[i].strDescription) {
      ingBox += `
			<div class="col-md-3">
				<div data-id="${ingData[i].idIngredient}" class="meal text-white text-center cursor-pointer">
					<i class="fa-solid fa-drumstick-bite fa-4x"></i>
					<h3 class="mx-auto">${ingData[i].strIngredient}</h3>
					<p id="ingCard" class="overflow-hidden">${ingData[i].strDescription}</p>
				</div>
			</div>
		`;
    }
  }
  document.getElementById("rowIng").innerHTML = ingBox;
}
getIngredient();
// ****************************************function Search By Ingredients****************************************
let mealByIng = [];
async function getSearchByIng(id) {
  	loading.classList.remove("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`
  );
  if (response.ok == true) {
    const finalResponse = await response.json();
    console.log(finalResponse);
    loading.classList.add("d-none");
    mealByIng = finalResponse.meals;
    console.log(mealByIng);
    displayMealIng();
  }
}
function displayMealIng() {
  let dMI = "";
  for (let i = 0; i < mealByIng.length; i++) {
    let mealCard = mealByIng[i];
    console.log(mealCard);
        dMI += `
		<div class="col-md-3">
				<div data-id="${mealCard.idMeal}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
					<img class="w-100" src=${mealCard.strMealThumb} alt="Meal Photo">
					<div class="meal-layer position-absolute d-flex flex-column align-items-center text-black ">
						<h4 class="my-auto text-center">${mealCard.strMeal}</h4>
					</div>
				</div>
			</div>
		`;
    }
    document.getElementById("rowFilterIng").innerHTML = dMI;
}
getSearchByIng('salmon');
//******************************      Function Validation     *******************************************
function nameValid(){
  const nameRegex = /^[A-Za-z][a-zA-Z]{2,}$/;
  let checkName = nameInput.value;
  if (nameRegex.test(checkName)) {
    // nameAlert.classList.add("d-none");
    nameInput.classList.add("is-valid");
		nameInput.classList.remove("is-invalid");
		nameAlert.classList.add("d-none");
    return true;
	}
	else {
    nameInput.classList.remove("is-valid");
		nameInput.classList.add("is-invalid");
		nameAlert.classList.remove("d-none");
    return false;
  }
}
function emailValid(){
  const emailRegex =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  if (emailRegex.test(emailInput.value)) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    emailAlert.classList.add("d-none");
    return true;
  } else {
    emailInput.classList.remove("is-valid");
		emailInput.classList.add("is-invalid");
		emailAlert.classList.remove("d-none");
    return false;
  }
}
function phoneValid(){
  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  if (phoneRegex.test(phoneInput.value)) {
    phoneInput.classList.add("is-valid");
    phoneInput.classList.remove("is-invalid");
    phoneAlert.classList.add("d-none");
    return true;
  } else {
    phoneInput.classList.remove("is-valid");
		phoneInput.classList.add("is-invalid");
		phoneAlert.classList.remove('d-none');
    return false;
  }
}
function ageValid(){
	const ageRegex = /^(1[49]|[2-9]\d)$/gm;
	if (ageRegex.test(ageInput.value)) {
    ageInput.classList.add("is-valid");
    ageInput.classList.remove("is-invalid");
		ageAlert.classList.add("d-none");
		uAgeAlert.classList.add("d-none");
		
    return true;
  } else {
    ageInput.classList.remove("is-valid");
   	ageInput.classList.add("is-invalid");
    ageAlert.classList.remove("d-none");
    return false;
  }
}
function passwordValid() {
  const passwordRegex =
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/;
  let checkPassword = passInput.value;
  if (passwordRegex.test(checkPassword)) {
    passInput.classList.add("is-valid");
    passInput.classList.remove("is-invalid");
    passAlert.classList.add("d-none");
    return true;
  } else {
    passInput.classList.remove("is-valid");
    passInput.classList.add("is-invalid");
    passAlert.classList.remove("d-none");
    return false;
  }
}
function rePasswordValid() {
  if (passInput.value === repassInput.value) {
    repassInput.classList.add("is-valid");
    repassInput.classList.remove("is-invalid");
    return true;
  } else {
    repassInput.classList.remove("is-valid");
    repassInput.classList.add("is-invalid");
    return false;
  }
}
function clear() {
	nameInput.value = "";
	emailInput.value = "";
	phoneInput.value = "";
	ageInput.value = "";
	passInput.value = "";
	repassInput.value = "";
	nameInput.classList.remove('is-valid')
	emailInput.classList.remove("is-valid");
	phoneInput.classList.remove("is-valid");
	ageInput.classList.remove("is-valid");
	passInput.classList.remove("is-valid");
	repassInput.classList.remove("is-valid");
}
function updateSubmitButton() {
  if (
    nameValid() &&
    emailValid() &&
    phoneValid() &&
    ageValid() &&
    passwordValid() &&
    rePasswordValid()
	) {
		submitBtn.removeAttribute("disabled");
		submitBtn.addEventListener('click', function () {
			clear();
		})
  } else {
    submitBtn.setAttribute("disabled", "disabled");
  }
}
rowForm.addEventListener("input", function (event) {
  const target = event.target;
  if (target === nameInput) {
    nameValid();
  } else if (target === emailInput) {
    emailValid();
  } else if (target === phoneInput) {
    phoneValid();
  } else if (target === ageInput) {
    ageValid();
  } else if (target === passInput) {
    passwordValid();
  } else if (target === repassInput) {
    rePasswordValid();
  }
  updateSubmitButton();
});

// *****************************************   Events  *******************************************************
$(function () {
  getReadyShow();
  readyDataSec.classList.remove("d-none");
});

inputNameSearch.addEventListener("keyup",function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {});
    getSearchName(inputNameSearch.value);
  },
  300
);

inputFNSearch.addEventListener("keyup", function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    getSearchFLetter(inputFNSearch.value);
  }, 300);
});

Link_1.addEventListener("click", function () {
  $(tab).animate({ width: "0" }, 900);
  $(".nav-header #burgerIcon").removeClass("d-none");
  $(".nav-header #close").addClass("d-none");
  readyDataSec.classList.add("d-none");
  searchSec.classList.remove("d-none");
  catSec.classList.add("d-none");
  areaSec.classList.add("d-none");
  ingSec.classList.add("d-none");
  contactSec.classList.add("d-none");
});

Link_2.addEventListener("click", function () {
  $(tab).animate({ width: "0" }, 500);
  $(".nav-header #burgerIcon").removeClass("d-none");
  $(".nav-header #close").addClass("d-none");
  readyDataSec.classList.add("d-none");
  getCatData();
  catSec.classList.remove("d-none");
  filterSec.classList.remove("d-none");
  searchSec.classList.add("d-none");
  areaSec.classList.add("d-none");
  ingSec.classList.add("d-none");
  contactSec.classList.add("d-none");
});

Link_3.addEventListener("click", function () {
  $(tab).animate({ width: "0" }, 500);
  $(".nav-header #burgerIcon").removeClass("d-none");
  $(".nav-header #close").addClass("d-none");
   readyDataSec.classList.add("d-none");
  getArea();
  areaSec.classList.remove("d-none");
  searchSec.classList.add("d-none");
  catSec.classList.add("d-none");
  filterSec.classList.add("d-none");
  ingSec.classList.add("d-none");
  contactSec.classList.add("d-none");
});

Link_4.addEventListener("click", function () {
  $(tab).animate({ width: "0" }, 500);
  $(".nav-header #burgerIcon").removeClass("d-none");
  $(".nav-header #close").addClass("d-none");
  readyDataSec.classList.add("d-none");
  getIngredient();
  ingSec.classList.remove("d-none");
  searchSec.classList.add("d-none");
  catSec.classList.add("d-none");
  areaSec.classList.add("d-none");
  contactSec.classList.add("d-none");
});

Link_5.addEventListener("click", function () {
  $(tab).animate({ width: "0" }, 900);
  $(".nav-header #burgerIcon").removeClass("d-none");
  $(".nav-header #close").addClass("d-none");
  readyDataSec.classList.add("d-none");
  contactSec.classList.remove("d-none");
  searchSec.classList.add("d-none");
  catSec.classList.add("d-none");
  filterSec.classList.add("d-none");
  areaSec.classList.add("d-none");
  ingSec.classList.add("d-none");
  
});