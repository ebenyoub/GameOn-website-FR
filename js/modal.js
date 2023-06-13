/*
**------------------------------------------------------------------------
**                  Listener
**------------------------------------------------------------------------
*/


// ouvre la modale
modalBtn.map(btn => btn.addEventListener("click", launchModal));

// ferme la modale avec click extérieur
modalbg.addEventListener("click", e => !modalBody.contains(e.target) && closeModal());

// ferme la modale avec la croix
closeBtn.addEventListener("click", closeModal);

window.addEventListener('keydown', closeModalWithEscape);

function closeModalWithEscape(event) {
    if (!topNav.classList.contains('responsive')) {
        if (event.key === 'Escape') {
            closeModal()
        } ;
    }
}


/*
**------------------------------------------------------------------------
**                  Functions
**------------------------------------------------------------------------
*/

function launchModal() {
    modalbg.style.display = "block";
    thanks && changeModal();
    inputs.first.focus();
    // blocker le defilement de l'arriere-plan
    document.body.classList.add('modal-open');
}

function closeModal() {
    modalbg.style.display = "none";
    document.body.classList.remove('modal-open');
    thanks && resetModal();
}

function resetModal() {
    // supprime les messages d'erreur
    confirmMsg.style.display = 'none';
    // ré-affiche tous les champs du formulaire
    formData.forEach(field => {
        field.classList.remove('hideField');
    })
    // ré-initialise le bouton du formulaire
    btnSubmit.classList.remove('btn-confirm');
    btnSubmit.value = "C'est parti";
    // ré-initialise la couleur des champs
    for (let input of Object.values(inputs)) {
        input.classList.remove('isValid');
    }
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
    reset = false;
}
