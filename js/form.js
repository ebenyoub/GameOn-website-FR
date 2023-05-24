/*
**------------------------------------------------------------------------
**                  Handler
**------------------------------------------------------------------------
*/

class ErrorManager {
    constructor() {
        // objet qui stocke les conditions et les messages d'erreur
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
            // si le champ est invalide, le message d'erreur relatif est affiché
            if (name.condition(input.value.trim())) {
                this.displayError(input, name.message, style);
                isValid = false;
                break;
            }
        }
        // si le champ est valid, l'erreur disparait et la bordure devient verte
        isValid && this.displayValid(input, style);
        return isValid ? true : false;
    }

    checkDate(date) {
        // parsing du format de la date
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        
        // vérification de la date
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
        // on vérifie si au moins un des bouton radio est coché
        for (const radio of radios) {
            radio.checked && (isChecked = true)
        }
        // affichage du message
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

window.addEventListener('load', () => {
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
            }
            validate();
        })
    })
})

btnSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('first').focus();
    revise = true;
    if (!thanks) {
        validate() && formConfirmation();
    } else {
        resetModal();
    }

    
    console.log('thanks', thanks);
})

formData.forEach(component => {
    // on ecoute chaque champ pour une validation en temps réel
    component.addEventListener('input', () => {
        if (quantity.value < 0) {
            quantity.value = Math.abs(quantity.value);
        }
        saveValues();
        revise && validate()
    });
})


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
    // creation d'une balise span pour l'affichage des erreurs dans chaque champs
    formData.forEach(component => {
        if (!component.querySelector('.msg-error')) {
            const error = document.createElement('span');
            error.classList.add('msg-error');
            component.appendChild(error);
        }
    })
}

function recoverValues() {
    const checkedLocation = document.querySelector('input[name="location"]:checked');
    if (localStorage.getItem('subscription')) {
        const values = JSON.parse(localStorage.getItem('subscription'));
        console.log(values);
        inputs.first.value = values.first;
        inputs.last.value = values.last;
        inputs.email.value = values.email;
        inputs.birthdate.value = values.birthdate;
        inputs.quantity.value = values.quantity;
        values.checkbox1 === true && (checkbox1.checked = true);
        values.checkbox2 === true && (checkbox2.checked = true);
        if (checkedLocation) {
            document.querySelector(`input[type="radio"][value="${values.location}"`).checked = true;
        }
    }
}

function validate() {
    let valid = true;

    // on crée une instance pour la gestion d'erreur
    const manager = new ErrorManager();

    // si un champ n'est pas valide, la fonction renvoie false
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

// on stocke les valeurs du formulaire dans un objet
function setValues() {
    let formValues = {
        "first": inputs.first.value,
        "last": inputs.last.value,
        "email": inputs.email.value,
        "birthdate": inputs.birthdate.value,
        "quantity": inputs.quantity.value,
        "location": '',
        "checkbox1": terms.checked,
        "checkbox2": notification.checked
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
}

function saveValues() {
    const values = setValues();
    console.log(values)
    // on stock les valeurs dans le localStorage
    localStorage.setItem('subscription', JSON.stringify(values));
}
