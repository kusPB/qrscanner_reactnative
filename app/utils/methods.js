import { color } from '../common/color';

export const isValidObjField = obj => {
  return Object.values(obj).every(value => value.trim());
};

export const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater('');
  }, 2500);
};

export const isValidEmail = value => {
  const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regx.test(value);
};



export const showToast = (obj, message, bg=color.color_primary, txtcolor=color.color_white) => {
  // Add a Toast on screen.

  
}

