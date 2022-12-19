class CalculatorHandler {
    constructor() {
        this.calculator = new Calculator();

        this.textA = document.querySelector('.a');
        this.textB = document.querySelector('.b');
        this.textC = document.querySelector('.c');
        this.textX = document.querySelector('.x');

        this.textX.addEventListener('keyup', () => {
            if (this.textC.value.includes("x")) {
                return this.textC.value = this.calculator.x(this.textC.value, this.textX.value);
            }
        })

        const buttons = document.querySelectorAll('.operand');
        buttons.forEach(button => {
            button.addEventListener('click', () =>  this.makeCalculate(button.dataset.operand));
        });
    }

    makeCalculate(operand) {
        let a = this.calculator.getEntity(this.textA.value);
        let b = this.calculator.getEntity(this.textB.value);

        if (a && b) {
            return this.textC.value = this.calculator[operand](a, b).toString();
        }
    }
}