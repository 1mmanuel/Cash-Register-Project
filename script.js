let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const purchase = document.getElementById("purchase-btn");
const cashDrawer = document.querySelectorAll("#cash-drawer-display span");
const changeDueDiv = document.getElementById("change-due");
const priceScreen = document.getElementById("price-screen");

let totalAmount = [];

const updateDisplay = (cashDisplay) => {
  cashDisplay.forEach((amount, index) => {
    let spanElement = document.querySelectorAll("#cash-drawer-display span")[
      index
    ];

    spanElement.textContent = `$${parseFloat(amount[1]).toFixed(2)}`;
  });
};

updateDisplay(cid);
priceScreen.textContent = `Total: $${price}`;

purchase.addEventListener("click", function () {
  let input = document.getElementById("cash").value;
  let changeDue = parseFloat(cash.value) - price;
  totalAmount = parseFloat(
    cid
      .map((total) => total[1])
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2)
  );
  if (Number(input) < price) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    return;
  }
  if (changeDue > totalAmount) {
    return (changeDueDiv.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`);
  }
  if (Number(input) === price) {
    changeDueDiv.innerHTML =
      "<p>No change due - customer paid with exact cash</p>";
    cash.value = "";
    return;
  }
  calculateChange(changeDue);
});

const calculateChange = (changeDue) => {
  let reversedCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let output = [];
  for (let i = 0; i <= reversedCid.length; i++) {
    const amount = denominations[i];
    if (changeDue > amount && changeDue > 0) {
      let count = 0;
      let currAmount = reversedCid[i][1];

      while (currAmount > 0 && changeDue >= denominations[i]) {
        currAmount -= amount;
        changeDue = parseFloat((changeDue -= amount).toFixed(2));
        reversedCid[i][1] = currAmount.toFixed(2);
        count++;
      }

      if (count > 0) {
        output.push([reversedCid[i][0], count * amount]);
      }
    }
  }
  console.log(cid);
  if (changeDue > 0) {
    return (changeDueDiv.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
  }

  updateDisplay(cid);
  displayOutput(output);
};

const displayOutput = (output) => {
  const outputTotal = Number(
    output.reduce((acc, curr) => acc + curr[1], 0)
  ).toFixed(2);
  const status =
    parseFloat(outputTotal) === parseFloat(totalAmount) ? "CLOSED" : "OPEN";

  let changeDiv = document.getElementById("change-due");
  changeDiv.innerHTML = `<p>Status: ${status}</p>`;

  output.map(
    (amount) => (changeDiv.innerHTML += `<p>${amount[0]}: $${amount[1]}</p>`)
  );
};
