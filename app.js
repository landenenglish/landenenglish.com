// slider event listner
let slider = document.getElementById("range");
slider.addEventListener("input", function () {
  let sliderValue = slider.value;
  let goal = radio("goal");
  let goalMessageOne = "change";
  let goalMessageTwo = "deficit/surplus";
  let rate = 500;
  let weeklyWeightChange = (rate * 7) / 3500;

  rate = sliderValue * 100;
  weeklyWeightChange = (rate * 7) / 3500;

  if (goal == "gain") {
    goalMessageOne = "gain";
    goalMessageTwo = "surplus";
  } else {
    goalMessageOne = "loss";
    goalMessageTwo = "deficit";
  }

  let output = document.getElementById("sliderOutput");
  output.innerHTML = `${weeklyWeightChange}lb of weight ${goalMessageOne} per week (${rate} calorie ${goalMessageTwo} per day).`;
});

// Get User Input and Calculate BMR
let form = document.getElementById("inputs");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let sex = radio("sex");
  let kg = weight();
  let age = document.getElementById("age").value;
  let cm = height();
  let activity = radio("activity");
  let goal = radio("goal");
  let rate = document.getElementById("range").value * 100;

  mifflin(sex, kg, age, cm, activity, goal, rate);
  window.scrollTo(0, document.body.scrollHeight);
});

//calculate BMR from inputs with Mifflin St Jeor Equation
function mifflin(sex, kg, age, cm, activity, goal, rate) {
  let BMR = 0;
  let factor = 0;
  let TDEE = 0;

  if (sex == "male") {
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

  display(TDEE, goal, rate);
}

//display message
function display(TDEE, goal, rate) {
  let output1 = document.getElementById("output1");
  let output2 = document.getElementById("output2");

  output1.innerHTML = `Your total daily energy expendature is ${TDEE} calories (maintenance).`;

  if (goal == "gain") {
    output2.innerHTML = `Eat ${TDEE + rate} calories per day to gain about ${
      (rate * 7) / 3500
    }lbs per week.`;
  } else {
    output2.innerHTML = `Eat ${TDEE - rate} calories per day to lose about ${
      (rate * 7) / 3500
    }lbs per week.`;
  }
}

//conver lbs to kg
function weight() {
  let lbs = parseInt(document.getElementById("weight").value);
  let kg = lbs / 2.20462;
  return kg;
}

function height() {
  //calculate total inches
  let feet = parseInt(document.getElementById("feet").value);
  let inches = parseInt(document.getElementById("inches").value);
  let totalInches = feet * 12 + inches;
  //convert to cm
  let totalCm = totalInches * 2.54;
  return totalCm;
}

//radio tool
function radio(option) {
  let ele = document.getElementsByName(`${option}`);
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) return ele[i].value;
  }
}
