// Event listeners
document.getElementById('unit-type').addEventListener('change', updateUnits);
document.getElementById('convert-btn').addEventListener('click', convertValue);

// Unit conversion data
const conversionRates = {
    length: {
        "meters": 1,
        "kilometers": 0.001,
        "centimeters": 100,
        "millimeters": 1000,
        "miles": 0.000621371,
        "inches": 39.3701,
    },
    temperature: {
        "Celsius": {
            "Fahrenheit": (value) => (value * 9/5) + 32,
            "Kelvin": (value) => value + 273.15,
        },
        "Fahrenheit": {
            "Celsius": (value) => (value - 32) * 5/9,
            "Kelvin": (value) => (value - 32) * 5/9 + 273.15,
        },
        "Kelvin": {
            "Celsius": (value) => value - 273.15,
            "Fahrenheit": (value) => (value - 273.15) * 9/5 + 32,
        }
    },
    weight: {
        "grams": 1,
        "kilograms": 0.001,
        "pounds": 0.00220462,
        "ounces": 0.035274,
        "stones": 0.000157473,
    },
    volume: {
        "liters": 1,
        "milliliters": 1000,
        "cubic meters": 0.001,
        "gallons": 0.264172,
        "quarts": 1.05669,
    }
};

// Initial population of units
function updateUnits() {
    const unitType = document.getElementById('unit-type').value;
    const fromUnitSelect = document.getElementById('from-unit');
    const toUnitSelect = document.getElementById('to-unit');
    
    // Clear previous options
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';

    let units;
    if (unitType === 'length') {
        units = ["meters", "kilometers", "centimeters", "millimeters", "miles", "inches"];
    } else if (unitType === 'temperature') {
        units = ["Celsius", "Fahrenheit", "Kelvin"];
    } else if (unitType === 'weight') {
        units = ["grams", "kilograms", "pounds", "ounces", "stones"];
    } else if (unitType === 'volume') {
        units = ["liters", "milliliters", "cubic meters", "gallons", "quarts"];
    }

    // Populate both dropdowns with unit options
    units.forEach(unit => {
        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = unit;
        fromUnitSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = unit;
        toUnitSelect.appendChild(option2);
    });
}

// Perform the conversion
function convertValue() {
    const value = parseFloat(document.getElementById('value').value);
    const unitType = document.getElementById('unit-type').value;
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;

    // Input validation
    if (isNaN(value)) {
        alert("Please enter a valid number.");
        return;
    }

    let convertedValue;
    
    // Handle conversion logic
    if (unitType === "length") {
        convertedValue = value * conversionRates.length[toUnit] / conversionRates.length[fromUnit];
    } else if (unitType === "temperature") {
        convertedValue = conversionRates.temperature[fromUnit][toUnit](value);
    } else if (unitType === "weight") {
        convertedValue = value * conversionRates.weight[toUnit] / conversionRates.weight[fromUnit];
    } else if (unitType === "volume") {
        convertedValue = value * conversionRates.volume[toUnit] / conversionRates.volume[fromUnit];
    }

    // Display result
    document.getElementById('result').textContent = convertedValue.toFixed(4);
}

// Initial setup: populate unit options for length
updateUnits();
