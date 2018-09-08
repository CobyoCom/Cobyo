// 50% 25% black black
const DARK_GREEN_GRADIENTS = [
  '#537953',
  '#3e5b3e',
  '#293d29',
  '#151e15',
  'black'
];
const DARK_BLUE_GRADIENTS = [
  '#4a6c82',
  '#385161',
  '#253641',
  '#131b20',
  'black'
];
const DARK_YELLOW_GRADIENTS = [
  '#cbc134',
  '#7a741f',
  '#514d15',
  '#29270a',
  'black'
];
const BASE_GRADIENTS = ['black'];

export function getGradientByTime(milliseconds = new Date().getTime()) {
  const hour = new Date(milliseconds).getHours();

  if (hour <= 6) {
    // Night
    return DARK_GREEN_GRADIENTS;
  } else if (hour <= 12) {
    // Morning
    return DARK_GREEN_GRADIENTS;
  } else if (hour <= 18) {
    // Afternoon
    return DARK_YELLOW_GRADIENTS;
  } else if (hour <= 24) {
    // Evening
    return DARK_BLUE_GRADIENTS;
  }

  return BASE_GRADIENTS;
}

export function getColorByTime(milliseconds = new Date().getTime()) {
  return getGradientByTime(milliseconds)[0];
}

export function getGradientCSS(gradient, direction = 'to bottom') {
  return `linear-gradient(${direction}, ${gradient.join(', ')})`;
}
