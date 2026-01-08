const equal = document.querySelector("[data-equal]");
const display1 = document.getElementById("number_1");
const display2 = document.getElementById("number_2");
const currentInput = document.getElementById("currentInput");
const answerScreen = document.getElementById("answerScreen");
const number = document.querySelectorAll("[data-number]");
const operation = document.querySelectorAll("[data-operation]");
let arrayScreen = [];
function clearALL() {
    arrayScreen = [""];
    answerScreen.textContent = "";
    currentInput.textContent = 0;
}

function deleted() {
    arrayScreen.pop();
    currentInput.innerText = arrayScreen.join("") || "0";
}

function numberButton() {
    number.forEach((button) => {
        button.addEventListener("click", () => {
            if (arrayScreen.join("").length >= 15) return;
            const value = button.innerText;
            if (value === "." && arrayScreen.includes(".")) return;
            arrayScreen.push(value);
            currentInput.innerText = arrayScreen.join("");
        });
    });
    operation.forEach((button) => {
        button.addEventListener("click", () => {
            if (arrayScreen.join("").length >= 15) return;
            const value = button.innerText;
            arrayScreen.push(value);
            currentInput.innerText = arrayScreen.join("");
        });
    });
}

function updateResult() {
    arrayScreen = [""];
    currentInput.innerText = "0";
    answerScreen.innerText = "";
}
equal.addEventListener("click", () => {
    if (arrayScreen.length === 0) return;
    try {
        let expression = arrayScreen
            .join("")
            .replace(/x/g, "*")
            .replace(/÷/g, "/");
        const result = eval(expression);
        if (!isFinite(result) || isNaN(result)) {
            throw new Error("Math Error");
        }
        answerScreen.innerText = result.toPrecision(8);

        arrayScreen = [result.toPrecision(8).toString()];
        currentInput.innerText = arrayScreen.join("");
    } catch (error) {
        alert("Error");
        updateResult();
    }
});
numberButton();
clearALL();
