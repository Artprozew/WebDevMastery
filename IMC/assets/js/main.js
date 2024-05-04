(function main() {
    function addElementWithClass(elementToAddTo, className) {
        const resultsText = document.createElement("p");
        resultsText.classList.add(className);
        resultsText.classList.add("results-box");
        elementToAddTo.innerHTML = "";
        elementToAddTo.appendChild(resultsText);
        return resultsText
    }

    function getInterpretedIMCAndColorClass(imc) {
        const resultsTexts = ["Abaixo do peso", "Peso normal", "Sobrepeso",
        "Obesidade grau 1", "Obesidade grau 2", "Obesidade grau 3"]
        
        if (imc < 18.5) return [resultsTexts[0], "underweight"]
        else if (imc >= 18.5 && imc <= 24.9) return [resultsTexts[1], "normal-weight"]
        else if (imc >= 25 && imc <= 29.9) return [resultsTexts[2], "overweight"]
        else if (imc >= 30 && imc <= 34.9) return [resultsTexts[3], "obesity1"]
        else if (imc >= 35 && imc <= 39.9) return [resultsTexts[4], "obesity2"]
        else return [resultsTexts[5], "obesity3"]
    }
    
    const form = document.getElementById("form");
    form.querySelector("#button-submit").addEventListener("click", function(event) {
        event.preventDefault();
        const weight = parseFloat(form.querySelector("#weight-input").value.replace(",", "."));
        const height = parseFloat(form.querySelector("#height-input").value.replace(",", "."));
        const resultIMC =  parseFloat(weight / (height * height));
        const resultsContainer = document.getElementById("results-container");

        if (isNaN(weight)) {
            addElementWithClass(resultsContainer, "result-error").textContent = "Você deve inserir um peso válido!";
        } else if (isNaN(height)) {
            addElementWithClass(resultsContainer, "result-error").textContent = "Você deve inserir uma altura válida!";
        } else {
            const [resultText, classColor] = getInterpretedIMCAndColorClass(resultIMC);
            addElementWithClass(resultsContainer, classColor).textContent = `Seu IMC é de \
            ${resultIMC.toFixed(2)} (${resultText})`;
        }
    });
})(); // IIFE