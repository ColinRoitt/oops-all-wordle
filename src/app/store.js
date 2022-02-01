import { createStore } from '@reduxjs/toolkit';

const initalState = {
  words: "",
}

export const reducer = (state = initalState, action={}) => {
  switch (action.type) {
    case 'SET_WORDS': return {...state, words: action.payload}
    default:
      return state;
  }
}
export const store = createStore(reducer);