import { createStore } from '@reduxjs/toolkit';

const initalState = {
  words: [],
  nonPlayableWords: [],
  currentWord: '',
  grid: ['', '', '', '', '', ''],
  round: 0,
  msg: {},
  gameIsOver: false
};

export const reducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case 'SET_GAME_IS_OVER':
      return { ...state, gameIsOver: action.payload };
    case 'MSG': {
      return {
        ...state,
        msg: action.payload
      };
    }
    case 'SET_WORDS':
      return {
        ...state,
        words: action.payload
      };
    case 'SET_NON_PLAYABLE_WORDS':
      return {
        ...state,
        nonPlayableWords: action.payload
      };
    case 'SET_CURRENT_WORD':
      return {
        ...state,
        currentWord: action.payload
      };
    case 'SET_GRID':
      return {
        ...state,
        grid: action.payload
      };
    case 'SET_ROUND':
      return {
        ...state,
        round: action.payload
      };
    default:
      return state;
  }
};
export const store = createStore(reducer);
