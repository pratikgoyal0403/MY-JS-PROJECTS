//TRAVERSING LEFT I WANT TO KNOW HOW TO MANIPULATE PSUDO SELECTORS USING JS
//AND COMPLETE THIS PROBLEM

const ul = document.querySelector(".step-list");
const li = Array.from(document.querySelectorAll(".step-list li"));
const nextBtn = Array.from(ul.querySelectorAll(".next"));
const backBtn = Array.from(ul.querySelectorAll(".back"));
let progressTracker = 0;

const validate = currentStep => {
  const currentForm = li[currentStep].querySelector("input");
  if (currentForm.value.trim() !== null && currentForm.validity.valid) {
    return true;
  } else {
    li[progressTracker].querySelector(".error").style.display = "block";
    setTimeout(() => {
      li[progressTracker].querySelector(".error").style.display = "none";
    }, 3000);
    return false;
  }
};

// const traverseToNextStep = currentStep=>{
//    const after =  window.getComputedStyle(currentStep, ':after');
//    console.dir(after['backgroundColor']);
//    after['backgroundColor'] = 'lime';
//    console.dir(after);
// }

const nextStepHandler = () => {
  let currentStep = progressTracker;
  if (currentStep < 3) {
    if (validate(currentStep)) {
      li[currentStep].dataset.completed = true;
      li[currentStep].querySelector("div").classList.remove("active");
      traverseToNextStep(li[currentStep]);
      currentStep++;
    }
    li[currentStep].querySelector("div").classList.add("active");
    progressTracker = currentStep;
  }
};
const previousStepHandler = () => {
  let currentStep = progressTracker;
  if (currentStep > 0) {
    li[currentStep].querySelector("div").classList.remove("active");
    currentStep--;
    li[currentStep].querySelector("div").classList.add("active");
    progressTracker = currentStep;
  }
};

nextBtn.map(btn => {
  btn.addEventListener("click", nextStepHandler);
});
backBtn.map(btn => {
  btn.addEventListener("click", previousStepHandler);
});
