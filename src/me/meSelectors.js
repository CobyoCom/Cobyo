import { moduleName } from "./meReducer";

export function selectMe(state) {
  return state[moduleName];
}

/**
 * Whether me has been loaded at all, regardless of whether me is logged in or not
 * me = null vs me = {}
 */
export function selectMeLoaded(state) {
  return !!selectMe(state);
}

/**
 * Is me both loaded and logged in?
 */
export function selectHasLoggedIn(state) {
  return !!selectMe(state) && !!selectMe(state).name;
}

export function selectMyName(state) {
  if (!selectHasLoggedIn(state)) {
    return null;
  }
  return selectMe(state).name;
}

export function makeSelectIsMe(state) {
  return name => selectMyName(state) === name;
}
