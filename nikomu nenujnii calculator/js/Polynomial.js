class Polynomial {
    constructor (poly = []) {
        this.poly = poly;
        this.poly.sort((a, b) => b.power - a.power);
    }

    getValue(x) {
        const calc = new Calculator;
        return this.poly.reduce((S, el) => calc.prod(el.value, calc.pow(x, el.power)));
    }

    toString() {
        const arr = this.poly.map(el => el.toString()).filter(Boolean);
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i].includes("-") && i > 0) {
                arr[i] = "+" + arr[i];
            }
        }

        return arr.join("").replaceAll("*", "");
    }
}
