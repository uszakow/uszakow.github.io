'use strict';
import * as addEvent from './src/addEvent/controller.js';
import * as eventsInOneDay from './src/eventsInOneDay/controller.js';

//GLobalna funkcja dla zapisu całego dnia w localStorage, dzień w formacie 'yyyy-mm-dd'.
const saveDayInLocalStorage = (yyyymmddStr, arrayOfEvents) => {
    if (arrayOfEvents.length !== 0) {
        localStorage.setItem(yyyymmddStr, JSON.stringify(arrayOfEvents));
    }
    else {
        localStorage.removeItem(yyyymmddStr);
    }
};

//Globalna funkcja dla stworzenia key w formacie 'yyyy-mm-dd' z objektu Date.
const createYyyymmddStr = date => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let day = date.getDate();
    if (day < 10) day = '0' + day;
    const yyyymmddStr = `${year}-${month}-${day}`;
    return yyyymmddStr;
};

//Globalna funkcja dla przeczytania dnia z localStorage, zwraca dzień jako wysortowaną tablicę eventów.
const createArrayOfEventsInDay = yyyymmddStr => {
    let arrayOfEvents = [];
    if (localStorage.getItem(yyyymmddStr)) {
        arrayOfEvents = [...JSON.parse(localStorage.getItem(yyyymmddStr))];
    }
    arrayOfEvents.sort((a, b) => {
        if (a.time === '') a.time = String(Infinity);
        if (b.time === '') b.time = String(Infinity);
        return a.time > b.time ? 1 : -1
    });
    return arrayOfEvents;
};

addEvent.changeLabels();
addEvent.createNewEvent();

eventsInOneDay.showBlockOfDayEvents();
eventsInOneDay.saveDate();
eventsInOneDay.checkIfEventsForRemind();
eventsInOneDay.deleteOldReminder();

export { saveDayInLocalStorage, createYyyymmddStr, createArrayOfEventsInDay };
