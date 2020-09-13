import { INCREMENT_COUNTER , DECREMENT_COUNTER } from '../actionType'


export const incrementCounter = () => ({
    type: INCREMENT_COUNTER
});

export const decrementCounter = () => ({
    type: DECREMENT_COUNTER
});