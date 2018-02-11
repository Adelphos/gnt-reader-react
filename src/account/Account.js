import * as AppConstants from '../constants/AppConstants.js';

const preferences = {
  [AppConstants.MORPH_TYPE]: 'sbl'
};

export function getPreferences() {
  return preferences;
}

export function getPreference(preference) {
  return preferences[preference];
}