const username = document.querySelector(".username");
const password = document.querySelector(".password");
const email = document.querySelector(".email");
const errorText = document.querySelectorAll(".error-text");

const validateUsername = () => {
  const regex = /^[a-zA-z]{2,10}$/i;
  const input = username.value;
  console.log("you are in blur event", input);
  if (!regex.check(input)) {
    errorText[0].classList.remove("hide");
  }
};

const validateEmail = () => {
  console.log("event blured");
};
const validatePassword = () => {
  console.log("event blured");
};

username.addEventListener("blur", validateUsername);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
