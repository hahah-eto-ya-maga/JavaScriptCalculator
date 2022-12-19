class Calculator {
    getEntity(str) {
        if (str.includes('(')) { return this.toVector(str); }
        if (str.includes('[')) { return this.toMatrix(str); }
        if (str.includes('x')) { return this.toPolynomial(str); }
        if (str.includes('i')) { return this.toComplex(str); }
        return str - 0;
    }

    toComplex(str) {
        if (typeof str === 'number') {
            return new Complex(str - 0);
        }
        if (str && typeof str === 'string') {
            const arrStr = str.split('i');
            if (arrStr.length === 2) {
                if (arrStr[0].includes('+')) {
                    const arrRe = arrStr[0].split('+');
                    return new Complex(arrRe[0] - 0, arrStr[1] - 0);
                }
                if (arrStr[0].includes('-')) {
                    const arrRe = arrStr[0].split("").slice(0, -1).join("");
                    return new Complex(arrRe - 0, -arrStr[1]);
                }
                return null;
            }
            if (arrStr.length === 1) {
                isNaN(arrStr) ? null : new Complex(arrStr[0])
            }
        }
        return null;
    }

    toVector(str) {
        if (str && typeof str ==  'string') {
            const arr = str.slice(1, -1).replaceAll(" ", "").split(",").map(Number);
            return new Vector(arr);
        }
        return null
    }

    toMatrix(str) {
        if (str && typeof str ==  "string") {
            const values = [];
            str.split("|").forEach(el => values.push(el.match(/\d+/g).map(Number)));
            return new Matrix(values)
        }
        return null
    }

    toPolynomial(str) {
        if (str && typeof str ==  "string") {
            str = str.replaceAll(/\s/g, "");
            const arr = str.match(/[+-]?\d*\*?x?(\^\d+)?/g);
            arr.pop();
            return new Polynomial(arr.map(this.toMember));
        }
        return null
    }

    toMember(str) {
        if (str && typeof str == "string") {
            if (str.includes("x")) {
                str = str.replace(/\s/g, "");
                let value = str.match(/^[-+]?\d/g); if (!value) value = 1;
                let power = str.match(/[-+]?\d$/g); if (!power) power = 1;
                return new Member(value - 0, power - 0);
            }
            return new Member(str - 0, 0)
        }
    }

    get(el) {
        return (el instanceof Polynomial) ? new PolynomialCalculator() : (el instanceof Vector) ? new VectorCalculator : (el instanceof Matrix) ? new MatrixCalculator() : (el instanceof Complex) ? new ComplexCalculator : new RealCalculator;
    }

    vector(values) {
        return new Vector(values);
    }

    matrix(values) {
        return new Matrix(values);
    }

    complex(re, im) {
        return new Complex(re, im);
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    divide(a, b) {
        return this.get(a).div(a, b)
    }

    prod(a, b) {
        return this.get(a).prod(a, b)
    }

    pow(a, n) {
        if (typeof n == 'object') {
            return this.get(a).pow(a, n.re);
        }
        if (typeof n == 'number') {
            return this.get(a).pow(a, n);
        }
        return null;
    }

    x(str, x) {
        str = str.replace(/\s/g, "");
        str = str.replace(/=[+-]?\d*$/g, "");

        let result = str;
        result = result.replace(/(?<=\d+)x/g, `*${x}`);
        result = result.replace(/x/g, x);
        result = result.replace(/\^/g, '**');

        return str + " = " + eval(result);
    }
}