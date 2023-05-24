/*
**------------------------------------------------------------------------
**                  DOM Elements
**------------------------------------------------------------------------
*/

const modalbg = document.querySelector(".bground");
const modalBody = document.querySelector(".modal-body");
const closeBtn = document.querySelector(".close");
const modalBtn = document.querySelector(".modal-btn");
const btnConfirm = document.querySelector('.btn-confirm');
const formConfirm = document.querySelector('.form-confirm');
const formData = document.querySelectorAll('.formData');
const btnSubmit = document.getElementById('inscription');

const inputs = {
    first: document.getElementById('first'),
    last: document.getElementById('last'),
    email: document.getElementById('email'),
    birthdate: document.getElementById('birthdate'),
    quantity: document.getElementById('quantity')
} 
const form = document.getElementById('subscription');
const radios = document.getElementsByName('location');
const selectRadio = document.getElementById('selectRadio');
const checkboxRadio = document.querySelectorAll('.checkbox-icon');
const terms = document.getElementById('checkbox1');
const notification = document.getElementById('checkbox2');
const confirmMsg = document.querySelector('.confirm-msg');
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let revise = false;
let thanks = false;

/*
**------------------------------------------------------------------------
**                  Listener
**------------------------------------------------------------------------
*/

// ouvre la modale
modalBtn.addEventListener("click", launchModal);

// ferme la modale avec click extérieur
modalbg.addEventListener("click", e => !modalBody.contains(e.target) && closeModal());

// ferme la modale avec la croix
closeBtn.addEventListener("click", closeModal);

// ferme la modale avec la touche 'echap'
modalbg.addEventListener("keydown", e => e.key === "Escape" && closeModal());

/*
**------------------------------------------------------------------------
**                  Functions
**------------------------------------------------------------------------
*/

function launchModal() {
    modalbg.style.display = "block";
    document.getElementById('first').focus();
    // blocker le defilement de l'arriere-plan
    document.body.classList.add('modal-open');
}
function closeModal() {
    modalbg.style.display = "none";
    document.body.classList.remove('modal-open');
}

function resetModal() {
    confirmMsg.style.display = 'none';
    formData.forEach(field => {
        field.classList.remove('hideField');
    })
    btnSubmit.classList.remove('btn-confirm');
    btnSubmit.value = "C'est parti";
    for (let input of Object.values(inputs)) {
        console.log(input)
        input.classList.remove('isValid');
    }
    localStorage.removeItem('subscription');
    closeModal();
    thanks = false;
}

function changeModal() {
    formData.forEach(field => {
        field.classList.add('hideField');
    })
    btnSubmit.classList.add('btn-confirm');
    btnSubmit.value = 'Fermer';
    confirmMsg.style.display = 'block';
    closeBtn.style.display = 'none';
    thanks = true;
}

function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
