/*
**------------------------------------------------------------------------
**                  DOM Elements
**------------------------------------------------------------------------
*/

const modalbg = document.querySelector(".bground");
const modalBody = document.querySelector(".modal-body");
const modalBtn = [
    document.querySelector('.modal-btn'),
    document.querySelector('.modal-btn--responsive')
];
const closeBtn = document.querySelector(".close");
const btnConfirm = document.querySelector('.btn-confirm');
const formConfirm = document.querySelector('.form-confirm');
const formData = document.querySelectorAll('.formData');
const btnSubmit = document.getElementById('inscription');
const burgerMenu = document.querySelector('.icon');
const topNav = document.getElementById("myTopnav");
const mainNavbar = document.querySelector('.main-navbar');
const overlay = document.querySelector('.overlay');
const main = document.querySelector('main');

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

let transitionTimeOut;
let revise = false;
let thanks = false;

/*
**------------------------------------------------------------------------
**                  Listener
**------------------------------------------------------------------------
*/


//ferme le menu lorsqu'on modifie la taille de la fenêtre
window.addEventListener('resize', handleResize);

// ouvre/ferme le menu au click sur le menu burger
burgerMenu.addEventListener('click', editNav);

// ferme le menu deroulant lorsqu'on click en dehors de la zone
overlay.addEventListener('click', closeMenuOutside);

// ferme le menu avec echap sinon la modale
window.addEventListener("keydown", closeWithEscape);

// jump from birthdate to quantity on ios
inputs.birthdate.addEventListener('blur', jumpField);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        console.log("L'element avec le focus est : ", document.activeElement);
    }
})

/*
**------------------------------------------------------------------------
**                  Navigation
**------------------------------------------------------------------------
*/

function closeMenuOutside(event) {
    if (!mainNavbar.contains(event.target)) {
        editNav();
    }
}

function jumpField(event) {
    if (event.target.value && event.target.validity.valid) {
        inputs.quantity.focus();
    }
}

function closeWithEscape(event) {
    if (event.key === "Escape" && topNav.classList.contains('responsive')) {
        editNav();
    }
}

function editNav() {
    topNav.classList.toggle('responsive');
    topNav.className === 'topnav' ?
        overlay.style.display = 'none' :
        overlay.style.display = 'block';
    if (topNav.classList.contains('responsive')) {
        topNav.setAttribute('tabindex', '-1');
    } else {
        topNav.removeAttribute('tabindex');
    }
}

function handleResize() {
    if (topNav.classList.contains('responsive')) {
        topNav.classList.remove('responsive');
    }
    clearTimeout(transitionTimeOut);
    mainNavbar.style.transition = 'none';
    transitionTimeOut = setTimeout(() => {
        mainNavbar.style.transition = 'transform .5s ease';
    }, 100);
}

/*
**------------------------------------------------------------------------
**                  Main
**------------------------------------------------------------------------
*/


function toggleModalBtnResponsive() {
    let btn;
    if (window.innerWidth < 768) {
        btn = document.querySelector('.modal-btn--responsive')
    } else {
        btn = document.querySelector('.modal-btn');
    }
    return btn;
}