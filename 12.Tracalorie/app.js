//LOCAL STORAGE NOT IMPLEMENTED
const wrapper = document.querySelector(".container");
const mealsInput = document.querySelector(".meal");
const caloriesInput = document.querySelector(".calories");
const addBtn = document.querySelector(".add-btn");
const updateBtn = document.querySelector(".update-btn");
const deleteBtn = document.querySelector(".delete-btn");
const totalCalories = document.querySelector(".total");
const meals = [];
let selectedMealIndex;

const changeBtnProp = (addBtnState, updateBtnState, deleteBtnState) => {
  addBtn.style.display = addBtnState;
  updateBtn.style.display = updateBtnState;
  deleteBtn.style.display = deleteBtnState;
};
const clearInputs = () => {
  mealsInput.value = "";
  caloriesInput.value = "";
};

const addMealHandler = () => {
  const meal = mealsInput.value;
  const calories = parseInt(caloriesInput.value);
  meals.push({ meal: meal, calories: calories });
  clearInputs();
  renderMeals();
  updateTotalCalorie();
};
const renderMeals = () => {
  let html;
  if (meals.length > 0) {
    meals.map(meal => {
      html = `<div class="food-calorie-box">
            <div class="text">
                <h6 class="item">${meal.meal}</h6>
                <p class="calories">${meal.calories} Calories</p>
            </div>
            <div class="edit">
                <p class="edit-icon">ed</p>
            </div>
        </div>`;
    });
    wrapper.insertAdjacentHTML("beforeend", html);
  }
  selectDynamicBtn();
};

const editMeal = event => {
  const targetElParent =
    event.target.parentElement.previousElementSibling.children[0];
  const targetIndex = meals.findIndex(meal => {
    return meal.meal === targetElParent.innerHTML;
  });
  selectedMealIndex = targetIndex;
  mealsInput.value = meals[targetIndex].meal;
  caloriesInput.value = meals[targetIndex].calories;
  changeBtnProp("none", "inline", "inline");
  meals.splice(selectedMealIndex, 1);
  wrapper.innerHTML = "";
  renderMeals();
};

const updateMealHandler = () => {
  const updatedMeal = mealsInput.value;
  const updatedCalories = parseInt(caloriesInput.value);
  meals.push({ meal: updatedMeal, calories: updatedCalories });
  changeBtnProp("inline", "none", "none");
  clearInputs();
  renderMeals();
  updateTotalCalorie();
};

const deleteMealHandler = () => {
  clearInputs();
  updateTotalCalorie();
};

const updateTotalCalorie = () => {
  const totalCalorie = meals
    .map(meal => {
      return meal.calories;
    })
    .reduce((prevValue, currValue) => {
      return prevValue + currValue;
    }, 0);
  console.log(totalCalorie);
  const html = `<h1 class="primary-heading">Total Calories: ${totalCalorie}</h1>`;
  totalCalories.innerHTML = html;
};

const selectDynamicBtn = () => {
  const editIcon = Array.from(document.querySelectorAll(".edit-icon"));
  editIcon.map(icon => {
    icon.addEventListener("click", editMeal.bind(event));
  });
};

addBtn.addEventListener("click", addMealHandler);
updateBtn.addEventListener("click", updateMealHandler);
deleteBtn.addEventListener("click", deleteMealHandler);
