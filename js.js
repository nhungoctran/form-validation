
function validateUsername(username) {
    if (!username) return "Username is required.";
    return true;
}
function validateEmail(email) {
    if (!email) return "Email is required.";
    const re = /\S+@\S.\S+/;
    if (!re.test(email)) return "Email is invalid";
    return true;
}

function validatePassword(password) {
    if (!password) return "Password is required.";
    if (password.length < 3) return "Password must be at least 3 characters.";
    return true;
}
function validatePasswordConfirmation(passwordConfirmation,password) {
    if (!passwordConfirmation) return "Password is required.";
    if (passwordConfirmation !== password) return "Password does not match.";
    return true;
}

function displayValidation(input, message, type) {
    const successIcon = input.parentNode.querySelector(".icon-success");
    const errorIcon = input.parentNode.querySelector(".icon-error");
    const errorMessage = input.parentNode.querySelector(".error-message");
    if (type === "success") {
        // show success icon
        successIcon.classList.remove("hidden");
        errorIcon.classList.add("hidden");
        errorMessage.textContent = "";
    } else {
        // show error message
        successIcon.classList.add("hidden");
        errorIcon.classList.remove("hidden");
        errorMessage.textContent = message;
    }
}

function validateField(input) {
    let message;
    switch (input.id) {
        case "username":
        message = validateUsername(input.value.trim());
        break;
        case "email":
        message = validateEmail(input.value.trim());
        break;
        case "password":
        message = validatePassword(input.value.trim());
        break;
        case "password-confirmation":
        const password = document.querySelector("#password").value.trim();
        message = validatePasswordConfirmation(input.value.trim(),password);
        break;
        default:
        break;
    }
    if (message === true) {
        displayValidation(input, "", "success");
    } else {
        displayValidation(input, message, "error");
    }
}

const form = document.querySelector(".form");
const fields = ["username", "email", "password", "password-confirmation"];
const inputs = fields.map (field => document.querySelector(`#${field}`));

inputs.forEach(input => {
    input.addEventListener("input", () => {
        validateField(input);
    })
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    inputs.forEach(input => validateField(input))
})