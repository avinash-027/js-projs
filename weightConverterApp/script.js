const inputValue = document.getElementById("inputWgtValue")
const outputField = document.getElementById("output")
const themeSwitch = document.getElementById("theme")

themeSwitch.addEventListener("click", () => {
    const html = document.querySelector("html");
    const currentTheme = html.getAttribute("data-theme")
    let value = currentTheme == "dark" ? "light" : "dark"
    html.setAttribute("data-theme", value)
})

inputValue.addEventListener('input', convertWgt)

const radioButtons = document.querySelectorAll('input[name="input"]');

// Convert immediately if radio buttons are changed
radioButtons.forEach(radio => radio.addEventListener('change', convertWgt));

function getSelectedUnit() {
    for (let unit of radioButtons) {
        if (unit.checked) {
            return unit.value
        }
    }
    return null
}

function convertWgt() {
    // let wgtValue = parseFloat(e.target.value)
    // Returned HTML ELEMENT is live DOM element,
    let wgtValue = parseFloat(inputValue.value)
    let wgtUnit = getSelectedUnit()

    if (isNaN(wgtValue) || !wgtUnit) {
        // Clear if invalid
        document.getElementById("WgtInputVal").textContent = "...";
        document.getElementById("WgtKiloGramsVal").textContent = "...";
        document.getElementById("WgtGramsVal").textContent = "...";
        document.getElementById("WgtPoundsVal").textContent = "...";
        return; 
    }

    const result = cal(wgtValue, wgtUnit);
    document.getElementById("WgtInputVal").textContent = `${wgtValue} ${wgtUnit}`;
    document.getElementById("WgtKiloGramsVal").textContent = result.kg.toFixed(3) + " kg";
    document.getElementById("WgtGramsVal").textContent = result.gm.toFixed(1) + " g";
    document.getElementById("WgtPoundsVal").textContent = result.pounds.toFixed(3) + " lbs";
}

function cal(value, wgtMeasure) {
    let resultMap = {
        kg: 0, gm: 0, pounds: 0
    }
    if (!value || isNaN(value)) return resultMap

    switch (wgtMeasure) {
        case 'kg':
            resultMap.kg = value;
            resultMap.gm = value * 1000;
            resultMap.pounds = value * 2.20462;
            break;
        case 'gm':
            resultMap.kg = value / 1000;
            resultMap.gm = value;
            resultMap.pounds = value / 453.592;
            break;
        case 'pounds':
            resultMap.kg = value / 2.20462;
            resultMap.gm = (value / 2.20462) * 1000;
            resultMap.pounds = value;
            break;
        default:
            // Invalid unit - return zeroed resultMap
            break;
    }
    return resultMap
}
