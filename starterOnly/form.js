const form = document.getElementById('inscription');
const textControl = document.querySelectorAll('.text-control');
const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const radio = document.getElementsByName('location');
const checkbox1 = document.getElementById('checkbox1');
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class ErrorManager {
    constructor() {
        this.err = {
            required: {
                condition: value => value === '',
                message: "Veuillez remplir ce champ."
            },
            minLength: {
                condition: value => value.length < 2,
                message: "Veuillez entrer 2 caractères ou plus pour ce champ."
            },
            email: {
                condition: email => !regexEmail.test(email),
                message: "Veuillez entrer une adresse email valide."
            },
            birthdate: {
                condition: date => this.validDate(date),
                message: "Veuillez entrer une adresse email valide."
            }
        }
    }

    checkConditions(input, conditions) {
        var isValid = true;
        for (let i = 0; i < conditions.length; i++) {
            const name = conditions[i];
            if (name.condition(input.value.trim())) {
                this.displayError(input, name.message);
                isValid = false;
                break;
            }
        }
        isValid && this.displayValid(input);
    }

    validDate(date) {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        
        if (parseInt(year) < 1900 || parseInt(year) > 2023) {
            return false;
        }
        if (parseInt(month) < 1 || parseInt(month) > 12) {
            return false;
        }
        if (parseInt(day) < 1 || parseInt(day) > 31) {
            return false;
        }
        return true;
    }

    displayError(input, error) {
        input.classList.add('isInvalid');
        const span = input.nextElementSibling
        span.textContent = error;
    }

    displayValid(input) {
        input.nextElementSibling.textContent = '';
        input.classList.remove('isInvalid');
        input.classList.add('isValid');
    }
}
textControl.forEach(input => {
    const errorField = document.createElement('span');
    errorField.classList.add('msg-error');
    input.insertAdjacentElement('afterend', errorField);
})

form.addEventListener('click', function (e) {
    e.preventDefault();
    validate();
    textControl.forEach(input => {
        input.addEventListener('input', validate);
    })
})

function validate() {
    const manager = new ErrorManager();
    manager.checkConditions(first, [manager.err.required, manager.err.minLength]);
    manager.checkConditions(last, [manager.err.required, manager.err.minLength]);
    manager.checkConditions(email, [manager.err.required, manager.err.email]);
    manager.checkConditions(birthdate, [manager.err.required]);
    manager.checkConditions(quantity, [manager.err.required]);
}

function validDate(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    
    if (parseInt(year) < 1900 || parseInt(year) > 2023) {
        return false;
    }
    if (parseInt(month) < 1 || parseInt(month) > 12) {
        return false;
    }
    if (parseInt(day) < 1 || parseInt(day) > 31) {
        return false;
    }
    return true;
}