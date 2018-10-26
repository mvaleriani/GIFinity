export const SET_APP_SIZE = 'SET_APP_SIZE';
export const SET_APP_TAB = 'SET_APP_TAB';

export const setAppSize = appInfo => {
    return {
        type: SET_APP_SIZE,
        appInfo
    }
};

export const setAppTab = appTab => {
    return {
        type: SET_APP_TAB,
        appTab
    }
};