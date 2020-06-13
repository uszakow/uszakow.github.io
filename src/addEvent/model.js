'use strict';
import * as global from '../../main.js';

//Klasy dla stworzenia poszczególnych eventów
class Event {
    constructor(date, time, place, note, remind) {
        this.date = date;
        this.time = time;
        this.place = place;
        this.note = note;
        this.remind = remind;
    }
}
class Meeting extends Event {
    constructor(date, time, place, note, remind, nameOfPerson, topicOfMeeting) {
        super(date, time, place, note, remind);
        this.nameOfPerson = nameOfPerson;
        this.topicOfMeeting = topicOfMeeting;
        this.type = 'meeting';
    }
}
class Purchases extends Event {
    constructor(date, time, place, note, remind, shoppingList) {
        super(date, time, place, note, remind);
        this.shoppingList = shoppingList;
        this.type = 'purchases';
    }
}
class Lesson extends Event {
    constructor(date, time, place, note, remind, nameOfTeacher, titleOfLesson) {
        super(date, time, place, note, remind);
        this.titleOfLesson = titleOfLesson;
        this.nameOfTeacher = nameOfTeacher;
        this.type = 'lesson';
    }
}
class Other extends Event {
    constructor(date, time, place, note, remind, name) {
        super(date, time, place, note, remind);
        this.name = name;
        this.type = 'other';
    }
}

//Dodać utworzony event do danego dnia.
const addEventInDay = newEvent => {
    const yyyymmddStr = newEvent.date;
    const arrayOfEvents = global.createArrayOfEventsInDay(yyyymmddStr);
    arrayOfEvents.push(newEvent);
    global.saveDayInLocalStorage(yyyymmddStr, arrayOfEvents);
};

//Otrzymać event z formy.
const createNewEvent = () => {
    const submit = document.querySelector('button.submit');
    submit.addEventListener('click', () => {
        const date = document.getElementById('datePut').value;
        const time = document.getElementById('timePut').value;
        const place = document.getElementById('placePut').value;
        const note = document.getElementById('notesPut').value;
        const remind = document.getElementById('remind').checked;

        const typeOfEvent = document.getElementById('typeOfEvent');
        let newEvent = {};
        switch (typeOfEvent.value) {
            case 'meeting':
                const nameOfPerson = document.getElementById('nameOfPerson').value;
                const topicOfMeeting = document.getElementById('topicOfMeeting').value;
                newEvent = new Meeting(date, time, place, note, remind, nameOfPerson, topicOfMeeting);
                break;
            case 'purchases':
                const shoppingList = document.getElementById('shoppingList').value;
                newEvent = new Purchases(date, time, place, note, remind, shoppingList);
                break;
            case 'lesson':
                const titleOfLesson = document.getElementById('titleOfLesson').value;
                const nameOfTeacher = document.getElementById('nameOfTeacher').value;
                newEvent = new Lesson(date, time, place, note, remind, nameOfTeacher, titleOfLesson);
                break;
            case 'other':
                const name = document.getElementById('otherEvent').value;
                newEvent = new Other(date, time, place, note, remind, name);
                break;
        }

        if (newEvent.date) {
            addEventInDay(newEvent);
        }
    })
};

export { createNewEvent };