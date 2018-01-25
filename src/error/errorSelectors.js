import {moduleName} from './errorReducer';

const selectError = state => state[moduleName];

export const selectErrorMessage = state => selectError(state);
export const selectHasError = state => !!selectError(state);