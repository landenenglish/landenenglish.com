// Get User Input and Calculate BMR
var form = document.getElementById("inputs");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let firstName = document.getElementById("name").value;
  let sex = radio("sex");
  let kg = weight();
  let age = document.getElementById("age").value;
  let cm = height();
  let activity = radio("activity");

  miffin(firstName, sex, kg, age, cm, activity);

  window.scrollTo(0, document.body.scrollHeight);
});

//calculate BMR from inputs with Mifflin St Jeor Equation
function miffin(firstName, sex, kg, age, cm, activity) {
  let BMR = 0;
  let factor = 0;
  let TDEE = 0;

  if ((sex = male)) {
    BMR = 10 * kg + 6.25 * cm - 5 * age + 5;
  } else {
    BMR = 10 * kg + 6.25 * cm - 5 * age - 161;
  }

  switch (activity) {
    case "sedentary":
      factor = 1.2;
      break;
    case "light":
      factor = 1.375;
      break;
    case "moderate":
      factor = 1.55;
      break;
    case "very":
      factor = 1.725;
      break;
    case "extremely":
      factor = 1.9;
      break;
  }

  BMR = Math.round(BMR);
  TDEE = BMR * factor;
  TDEE = Math.round(TDEE);
  display(firstName, TDEE);
}

//display message
function display(firstName, TDEE) {
  let output1 = document.getElementById("output1");
  let output2 = document.getElementById("output2");
  let output3 = document.getElementById("output3");

  output1.innerHTML = `${firstName}'s Total Daily Energy Expendature (maintenance) is ${TDEE} calories.`;

  output2.innerHTML = `Eat ${TDEE - 300}-${
    TDEE - 500
  } calories to lose weight (300-500 deficit).`;

  output3.innerHTML = `Eat ${TDEE + 300}-${
    TDEE + 500
  } calories to gain weight (300-500 surplus).`;
}

//conver lbs to kg
function weight() {
  let lbs = parseInt(document.getElementById("weight").value);
  let kg = lbs / 2.20462;
  return kg;
}

//calculate total inches
function height() {
  let feet = parseInt(document.getElementById("feet").value);
  let inches = parseInt(document.getElementById("inches").value);
  let totalInches = feet * 12 + inches;
  //convert to cm
  let totalCm = totalInches * 2.54;
  // round to 2 decimal places
  return totalCm;
}

//radio tool
function radio(option) {
  let ele = document.getElementsByName(`${option}`);
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) return ele[i].value;
  }
}
