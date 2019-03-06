import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "./types";

export const setDisableBalanceOnAdd = () => {
  //get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  //toggle here
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  //again put back in locale storage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd
  };
};

export const setDisableBalanceOnEdit = () => {
  //get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  //toggle here
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

  //again put back in locale storage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit
  };
};

export const setAllowRegistration = () => {
  //get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  //toggle here
  settings.allowRegistration = !settings.allowRegistration;

  //again put back in locale storage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  };
};
