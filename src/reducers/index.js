import { combineReducers } from 'redux';
import app from './app';
import testsData from './testsData';
import test from './test';
import question from './question';

export default combineReducers({
	app,
	testsData,
	test,
	question
});