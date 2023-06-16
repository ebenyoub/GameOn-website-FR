/*
**------------------------------------------------------------------------
**                  Handler
**------------------------------------------------------------------------
*/

class ErrorManager {
    constructor() {
        // object that stores error conditions and messages
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
                condition: date => !this.checkDate(date),
                message: "Veuillez entrer une date antérieur à celle d'aujourd'hui."
            },
            terms: {
                condition: () => !terms.checked,
                message: "Vous devez accepter les conditions d'utilisation."
            }
        }
    }

    checkConditions(input, conditions, style = true) {
        let isValid = true;
        for (let i = 0; i < conditions.length; i++) {
            const name = conditions[i];
            // if the field is invalid, the relative error message is displayed
            if (name.condition(input.value.trim())) {
                this.displayError(input, name.message, style);
                isValid = false;
                break;
            }
        }
        // if the field is valid, the error disappears and the border turns green
        isValid && this.displayValid(input, style);
        return isValid ? true : false;
    }

    checkDate(date) {
        // date format parsing
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);

        // date check
        if ((parseInt(year) < 1900 || parseInt(year) > 2023) ||
            (parseInt(month) < 1 || parseInt(month) > 12) ||
            (parseInt(day) < 1 || parseInt(day) > 31)) {
            return false;
        }
        return true;
    }

    checkRadio() {
        const span = selectRadio.querySelector('.msg-error');
        let isChecked = false;
        // we check if at least one of the radio buttons is checked
        for (const radio of radios) {
            radio.checked && (isChecked = true)
        }
        // message display
        span.textContent = isChecked ? '' : "Veuillez selectionner une ville.";
        return isChecked ? true : false;
    }

    displayError(input, error, style) {
        style && input.classList.add('isInvalid');
        const span = input.parentElement.querySelector('.msg-error');
        span.textContent = error;
    }

    displayValid(input, style) {
        input.parentElement.querySelector('.msg-error').textContent = '';
        style && input.classList.remove('isInvalid');
        style && input.classList.add('isValid');
    }
}


/*
**------------------------------------------------------------------------
**                  Listeners
**------------------------------------------------------------------------
*/

// init the app at load
window.addEventListener('load', loadInit);

btnSubmit.addEventListener('click', submitClick);

// we listen to each field for real-time validation
formData.forEach(component => {
    component.addEventListener('input', validator);
});


function loadInit() {
    createError();
    recoverValues();
    checkboxRadio.forEach(element => {
        element.addEventListener('keydown', event => {
            if (event.key === " ") {
                event.preventDefault();
                const button = element.parentNode.previousElementSibling;
                if (button.type === 'radio' && button.checked) {
                    return;
                }
                button.checked = !button.checked;
                saveValues();
            }
            validate();
        })
    })
}


function submitClick(event) {
    event.preventDefault();
    inputs.first.focus();
    revise = true;
    if (!thanks) {
        validate() && formConfirmation();
    } else {
        resetModal();
        closeModal();
    }
}

function validator() {
    if (quantity.value < 0) {
        quantity.value = Math.abs(quantity.value);
    }
    saveValues();
    revise && validate(); 
}

/*
**------------------------------------------------------------------------
**                  Functions
**------------------------------------------------------------------------
*/


function formConfirmation() {
            changeModal();
            resetValues();
        }

function createError() {
            // creation of a span tag to display errors in each field
            formData.forEach(component => {
                if (!component.querySelector('.msg-error')) {
                    const error = document.createElement('span');
                    error.classList.add('msg-error');
                    component.appendChild(error);
                }
            })
        }

// if a form is still saved in the localStorage, we display them
function recoverValues() {
            if (localStorage.getItem('subscription')) {
                const values = JSON.parse(localStorage.getItem('subscription'));
                inputs.first.value = values.first;
                inputs.last.value = values.last;
                inputs.email.value = values.email;
                inputs.birthdate.value = values.birthdate;
                inputs.quantity.value = values.quantity;
                values.checkbox1 === true && (checkbox1.checked = true);
                values.checkbox2 === true && (checkbox2.checked = true);
                values.location && (document.querySelector(`input[type="radio"][value="${values.location}"`).checked = true);
            }
        }


function validate() {
            let valid = true;

            // we create an instance for error handling
            const manager = new ErrorManager();

            // if a field is not valid, the function returns false
            !manager.checkConditions(inputs.first, [manager.err.required, manager.err.minLength]) && (valid = false);
            !manager.checkConditions(inputs.last, [manager.err.required, manager.err.minLength]) && (valid = false);
            !manager.checkConditions(inputs.email, [manager.err.required, manager.err.email]) && (valid = false);
            !manager.checkConditions(inputs.birthdate, [manager.err.required, manager.err.birthdate]) && (valid = false);
            !manager.checkConditions(inputs.quantity, [manager.err.required]) && (valid = false);
            !manager.checkConditions(terms, [manager.err.terms]) && (valid = false);
            !manager.checkRadio() && (valid = false);

            if (valid) {
                btnSubmit.disabled = false;
                btnSubmit.style.backgroundColor = "#fe142f";
                btnSubmit.style.cursor = 'pointer';
            } else {
                btnSubmit.disabled = true;
                btnSubmit.style.backgroundColor = "lightgrey";
                btnSubmit.style.cursor = 'default';
            }
            return valid;
        }

// store form value in an object
function setValues() {
            let formValues = {
                "first": inputs.first.value,
                "last": inputs.last.value,
                "email": inputs.email.value,
                "birthdate": inputs.birthdate.value,
                "quantity": inputs.quantity.value,
                "location": '',
                "checkbox1": terms.checked,
                "checkbox2": notification.checked,
            }

            const checkedLocation = document.querySelector('input[name="location"]:checked');
            if (checkedLocation) {
                formValues.location = checkedLocation.value;
            }
            return formValues;
        }

function resetValues() {
            inputs.first.value = '';
            inputs.last.value = '';
            inputs.email.value = '';
            inputs.birthdate.value = '';
            inputs.quantity.value = '0';
            radios.forEach(radio => radio.checked = false);
            checkbox1.checked = false;
            checkbox2.checked = false;
            // suppress datas stored in localStorage
            localStorage.removeItem('subscription');
        }

function saveValues() {
            const values = setValues();
            // store values in localStorage
            localStorage.setItem('subscription', JSON.stringify(values));
        }
