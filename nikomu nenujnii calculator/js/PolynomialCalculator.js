class PolynomialCalculator {
    polynomial(members) {
        return new Polynomial(members)
    }

    getPolynominal(str) {

    }

    add(a, b) {
        const calc = new Calculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
            }
            else {
                members.push(new Member(elemA.value, elemA.power));
            }
        })
        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        })
        return this.polynomial(members);
    }

    sub(a, b) {
        const calc = new Calculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.sub(elemA.value, member.value), elemA.power));
            }
            else {
                members.push(new Member(elemA.value, elemA.power));
            }
        })
        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(-elemB.value, elemB.power));
            }
        })
        return this.polynomial(members);
    }

    mult(a, b) {
        const calc = new Calculator;
        let polynomial = this.polynomial();
        a.poly.forEach(elemA => {
            const members = [];
            b.poly.forEach (elemB => {
                members.push(new Member(calc.mult(elemA.value, elemB.value),
                    elemA.power + elemB.power));
            });
            polynomial = this.add(polynomial, this.polynomial(members));
        })
        return polynomial;
    }
}