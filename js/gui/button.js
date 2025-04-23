function button_1_add(name, func, ...args) {
    var button = document.createElement("div")
    button.className = "button nor"
    button.textContent = name
    button.addEventListener("click", () => {
        func(...args);
    });
    return button;
}

function button_2_add(name, func, ...args) {
    var button = document.createElement("div")
    button.className = "button-fullwidth nor"
    button.textContent = name
    button.addEventListener("click", () => {
        func(...args);
    });
    return button;
}