import { createStore } from "@reduxjs/toolkit";

const initalState = {
	words: [],
	nonPlayableWords: [],
	currentWord: "",
};

export const reducer = (state = initalState, action = {}) => {
	switch (action.type) {
		case "SET_WORDS":
			return {
				...state,
				words: action.payload,
			};
		case "SET_NON_PLAYABLE_WORDS":
			return {
				...state,
				words: action.payload,
			};
		case "SET_CURRENT_WORD":
			return {
				...state,
				currentWord: action.payload,
			};
		default:
			return state;
	}
};
export const store = createStore(reducer);
