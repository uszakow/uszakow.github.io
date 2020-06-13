'use strict';

const labelsForEvents = document.querySelectorAll('label.labelForType');
const typeOfEvent = document.getElementById('typeOfEvent');

//Ukryć checkbox dla remindera, jeżeli nie ma czasu eventu
const deactivateRemind = () => {
    const timePut = document.getElementById('timePut');
    const remind = document.getElementById('remind');
    remind.setAttribute('disabled', 'disabled');

    timePut.addEventListener('change', () => {
        if (timePut.value === '') {
            remind.checked = false;
            remind.setAttribute('disabled', 'disabled');
        }
        else {
            remind.removeAttribute('disabled');
        }
    });
};

//Ukryć wszystkie pola dla typów eventów
const hideLabels = () => {
    labelsForEvents.forEach(item => {
        item.style.display = 'none';
    });
}

//Pokazać te pola, które są potrzebne dla danego typu eventu.
const changeLabels = () => {
    deactivateRemind();
    hideLabels();
    typeOfEvent.addEventListener('change', () => {
        hideLabels();
        switch (typeOfEvent.value) {
            case 'meeting':
                labelsForEvents[0].style.display = '';
                labelsForEvents[1].style.display = '';
                break;
            case 'purchases':
                labelsForEvents[2].style.display = '';
                break;
            case 'lesson':
                labelsForEvents[3].style.display = '';
                labelsForEvents[4].style.display = '';
                break;
            case 'other':
                labelsForEvents[5].style.display = '';
                break;
        }
    })
};

export { changeLabels }