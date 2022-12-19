window.onload = () => {
    calcButtons.forEach(el => {
        el.addEventListener("click", addSymbol);
        el.addEventListener("mousemove", prikol);
    });

    numButtons.forEach(el => {
        el.addEventListener("click", equalRes)
    });

    ui.forEach(el => {
        el.addEventListener("mouseover", cursorHover);
        el.addEventListener("mouseout", cursorLeave);
    });

    window.addEventListener("mousemove", cursorMove);
    window.addEventListener("mousemove", auraMove);
    window.addEventListener("mouseout", cursorOut);
    window.addEventListener("mouseover", cursorOver);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    delLastEl.addEventListener("click", delLastElement);

    clearAll.addEventListener("click", clear);

    document.querySelectorAll('.a, .b').forEach(el => el.addEventListener("keyup", (event) => {
        const currentHeight = () => el.style.height.match("[0-9]*") - 0;

        if (event.key !== "Backspace") {
            switch (el.value) {
                case "[":
                    el.value = "[]";
                    el.setSelectionRange(1, 1);
                    break
                case "(":
                    el.value = "()";
                    el.setSelectionRange(1, 1);
                    break
            }
        } else {
            el.value.replace(/\n|\s/g, "") === "]" ? el.value = "" : el.value;
            el.value.replace(/\n|\s/g, "") === ")" ? el.value = "" : el.value;
            if (el.value !== "" && el.value.split("\n").slice(-1)[0] === "") {
                el.style.height = currentHeight() - 20 + "px";
            }
        }
        if (currentHeight() < 80 || el.value.split("\n").length <= 2) {
            el.style.height = "80px";
        }
        if (el.scrollTop > 0) {
            el.style.height = el.scrollHeight + "px";
        }
    }))

}

const calculator = new Calculator()
const calculatorHandler = new CalculatorHandler()

const delLastEl   = document.querySelector(".delLastEl")
const calcButtons = document.querySelectorAll(".calc_button")
const numButtons  = document.querySelectorAll(".num_button")
const result      = document.querySelector(".result")
const equal       = document.querySelector(".equal")
const clearAll    = document.querySelector(".clearAll")
const wrapper     = document.querySelector(".wrapper")
const ui          = document.querySelectorAll("button, textarea")
const cursor      = document.querySelector(".cursor")
const aura        = document.querySelector(".aura")
const textarea    = document.querySelectorAll("textarea")

function cursorMove(e) {
    let mouseX, mouseY;

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX;
    cursor.style.top  = mouseY;
}

function auraMove(e) {
    let mouseX, mouseY;

    mouseX = e.clientX;
    mouseY = e.clientY;

    aura.style.left = `${mouseX - 20}px`;
    aura.style.top  = `${mouseY - 20}px`;
}

function mouseDown() {
    aura.classList.add("click");
    cursor.classList.add("click");
    textarea.forEach(el => el.classList.add("resizing"));
}

function mouseUp() {
    aura.classList.remove("click");
    cursor.classList.remove("click");
    textarea.forEach(el => el.classList.remove("resizing"));
}

function cursorHover() {
    aura.classList.add("active");
    cursor.classList.add("active");
    window.removeEventListener("mousemove", cursorMove);
}

function cursorLeave() {
    aura.classList.remove("active");
    cursor.classList.remove("active");
    window.addEventListener("mousemove", cursorMove);
}

function cursorOut() {
    aura.classList.add("out");
    cursor.classList.add("out");
}

function cursorOver() {
    aura.classList.remove("out");
    cursor.classList.remove("out");
}

function delLastElement() {
    result.value = result.value.slice(0, -1)
}

function clear() {
    result.value = ""
}

function prikol(event) {
    let x = event.clientX
    let y = event.clientY

    let randomInt1  = Math.floor(Math.random() * 800);
    let randomInt2  = Math.floor(Math.random() * 100);

    if (x > innerWidth / 2 + 200) {
        wrapper.style.transform = `translate(${x / 20 - randomInt1}px, ${y / 20 - randomInt2}px)`
    } else {
        wrapper.style.transform = `translate(${x / 20 + randomInt1}px, ${y / 20 - randomInt2}px)`
    }
}

function equalRes() {
    let res;
    switch (containsValue()) {
        case "i":
            res = parseComplex()
            break
        case ";":
            res = parseVector()
            break
        default:
            res = result.value
    }

    result.value = res
}

function containsValue() {
    let value = result.value;
    if (value.split("").includes("i")) {
        return "i"
    }
    else if (value.split("").includes(";")) {
        return ";"
    }
}

function addSymbol(event) {
    if (limit(result.value + event.target.id)) {
        result.value += event.target.id
    }
}

function limit(str) {
    let arr = str.split("")
    const limit_symbols = ["+", "-", "*", "/"]
    if (arr.length > 1){
        const first_el  = arr[arr.length - 1]
        const second_el = str[arr.length - 2]
        return !(first_el === second_el && limit_symbols.includes(first_el) || limit_symbols.includes(first_el) && limit_symbols.includes(second_el));
    } else return true
}



