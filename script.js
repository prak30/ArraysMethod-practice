const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesButton = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
// getRandomUser();
// getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  // console.log(data);

  const user = data.results[0];
  // console.log(user);
  const newUser = {
    name: `${user.name.first}  ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

function doubleMoney() {
  data = data.map((item) => {
    // console.log(item);

    return { ...item, money: item.money * 2 };
  });
  updateDOM();
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMillionaires() {
  data = data.filter((item) => item.money > 1000000);

  updateDOM();
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEL = document.createElement("div");
  wealthEL.innerHTML = `<h3>Total Wealth: <strong>${wealth}</strong></h3>`;
  main.appendChild(wealthEL);
}

function updateDOM(providedData = data) {
  //clear main div
  main.innerHTML = "<h2><strong>Person</strong>wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${item.money}`;
    main.appendChild(element);
  });
}

//adding users
addUserBtn.addEventListener("click", getRandomUser);

//doubling money
doubleBtn.addEventListener("click", doubleMoney);

//sort by richest
sortBtn.addEventListener("click", sortByRichest);

//shows only millionaires
showMillionairesButton.addEventListener("click", showMillionaires);

//calculates total wealth
calculateWealthBtn.addEventListener("click", calculateWealth);
