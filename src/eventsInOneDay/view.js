'use strict';
import * as global from '../../main.js';
import { manageElementsOnList } from './controller.js';

//Pokazać wybraną datę w tytule bloku.
const showDate = () => {
    let dateForList;

    if (localStorage.getItem('date')) {
        let key = JSON.parse(localStorage.getItem('date'));
        dateForList = global.createYyyymmddStr(new Date(key));
    }
    else {
        dateForList = global.createYyyymmddStr(new Date());
    }

    const dateOut = document.getElementById('dateOut');
    dateOut.value = dateForList;

    return dateForList;
};

//Wypisać listę eventów.
const showListOfEvents = arrayOfEvents => {
    const wrapForEvents = document.getElementById('wrapForEvents');
    wrapForEvents.innerHTML = '';
    for (let i = 0; i < arrayOfEvents.length; i++) {
        const itemInDay = document.createElement('div');
        itemInDay.classList.add('item-in-day');
        itemInDay.id = `itemInDay-${i}`;
        wrapForEvents.append(itemInDay);

        const itemRemind = document.createElement('img');
        itemRemind.classList.add('item-remind');
        if (arrayOfEvents[i].time !== String(Infinity)) {
            itemRemind.dataset.itemId = `itemInDay-${i}`;
            if (arrayOfEvents[i].remind === true) {
                itemRemind.src = '/img/remind-red.svg';
                itemRemind.dataset.remind = 'true';
            }
            else if (arrayOfEvents[i].remind === false) {
                itemRemind.src = '/img/remind-blue.svg';
                itemRemind.dataset.remind = 'false';
            }
            itemRemind.style.cursor = 'pointer';
        }
        itemInDay.append(itemRemind);

        const itemTime = document.createElement('span');
        itemTime.classList.add('item-time');
        let time = arrayOfEvents[i].time;
        if (time === String(Infinity)) time = '&#8226;';
        itemTime.innerHTML = time;
        itemInDay.append(itemTime);

        const itemMainPart = document.createElement('div');
        itemMainPart.classList.add('item-main-part');
        const div1 = document.createElement('div');
        switch (arrayOfEvents[i].type) {
            case 'meeting':
                let nameOfPerson = arrayOfEvents[i].nameOfPerson
                if (nameOfPerson === '') nameOfPerson = 'unknown';
                div1.innerHTML = `Meeting: ${nameOfPerson}`;
                break;
            case 'purchases':
                div1.innerHTML = 'Purchases';
                break;
            case 'lesson':
                let titleOfLesson = arrayOfEvents[i].titleOfLesson;
                if (titleOfLesson === '') titleOfLesson = 'unknown';
                div1.innerHTML = `Lesson: ${titleOfLesson}`;
                break;
            case 'other':
                let name = arrayOfEvents[i].name;
                if (name === '') name = 'without title';
                div1.innerHTML = `Event: ${name}`;
        }
        itemMainPart.append(div1);
        const div2 = document.createElement('div');
        let place = arrayOfEvents[i].place;
        if (place === '') place = 'no definition';
        div2.innerHTML = `Place: ${place}`;
        itemMainPart.append(div2);
        itemInDay.append(itemMainPart);

        const itemDelete = document.createElement('img');
        itemDelete.classList.add('item-delete');
        itemDelete.dataset.itemId = `itemInDay-${i}`;
        itemDelete.src = '/img/delete.svg';
        itemDelete.alt = 'delete';
        itemDelete.style.cursor = 'pointer';
        itemInDay.append(itemDelete);
    }

    manageElementsOnList();
}

//Pokazać szczegóły wybranego eventa
const showDetailsOfEvent = arrayOfEvents => {
    const detailsOfEvent = document.getElementById('detailOfEvent');

    for (let i = 0; i < arrayOfEvents.length; i++) {
        const mouseover = () => {
            let note = arrayOfEvents[i].note;
            if (note === '') note = 'no notes';
            switch (arrayOfEvents[i].type) {
                case 'meeting':
                    let topicOfMeeting = arrayOfEvents[i].topicOfMeeting;
                    if (topicOfMeeting === '') topicOfMeeting = 'unknown';
                    detailsOfEvent.innerText = `Topic of meeting: ${topicOfMeeting}`;
                    detailsOfEvent.innerText += `\nNotes: ${note}`;
                    break;
                case 'purchases':
                    let shoppingList = arrayOfEvents[i].shoppingList;
                    if (shoppingList === '') shoppingList = 'no items';
                    detailsOfEvent.innerText = `Shopping list:\n${shoppingList}`;
                    detailsOfEvent.innerText += `\nNotes: ${note}`;
                    break;
                case 'lesson':
                    let nameOfTeacher = arrayOfEvents[i].nameOfTeacher;
                    if (nameOfTeacher === '') nameOfTeacher = 'unknown';
                    detailsOfEvent.innerText = `Teacher: ${nameOfTeacher}`;
                    detailsOfEvent.innerText += `\nNotes: ${note}`;
                    break;
                case 'other':
                    detailsOfEvent.innerText += `\nNotes: ${note}`;
                    break;
            }
        };
        const mouseout = () => {
            detailOfEvent.innerHTML = '';
        };

        const item = document.getElementById(`itemInDay-${i}`);
        item.addEventListener('mouseover', mouseover);
        item.addEventListener('mouseout', mouseout);
    }
}

const showBlockOfDayEvents = () => {
    const dateForList = showDate();
    const arrayOfEvents = global.createArrayOfEventsInDay(dateForList);
    showListOfEvents(arrayOfEvents);
    showDetailsOfEvent(arrayOfEvents);
};

export { showBlockOfDayEvents };