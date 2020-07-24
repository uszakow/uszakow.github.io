'use strict';
import * as view from './view.js';
import * as model from './model.js';

const changeLabels = () => view.changeLabels();

const createNewEvent = () => model.createNewEvent();

export { changeLabels, createNewEvent };