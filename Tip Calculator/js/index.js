const inputs = document.querySelectorAll("input[type='number']");
const btn = document.getElementById("btn");
const total = document.getElementById("total");
const errMsg = document.getElementById('errMsg');

class GetPercentage {
  constructor(inputs) {
    this.bill_amount = parseFloat(inputs[0].value);
    this.tip_percentage = parseFloat(inputs[1].value);
  }
  perc_calculation() {
    const result = (this.bill_amount * this.tip_percentage) / 100;
    total.innerText = this.bill_amount + result;
  }
}

class InputChecking extends GetPercentage {
  check_input(){
    if(isNaN(this.bill_amount) || isNaN(this.tip_percentage)){
      errMsg.style.display = 'block';
    } else {
      errMsg.style.display = 'none';
    }
  }
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  const percentages = new GetPercentage(inputs);
  percentages.perc_calculation();
  const inputChecker = new InputChecking(inputs);
  inputChecker.check_input();
});
