// import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modalActions';
import { SET_APP_SIZE, SET_APP_TAB } from '../actions/uiActions';
import merge from 'lodash/merge';

export default function uiReducer(oldState = {}, action) {
    Object.freeze(oldState);
    switch (action.type) {
        case SET_APP_SIZE:
            return merge({}, oldState, {app: action.appInfo});
        case SET_APP_TAB:
            return merge({}, oldState, { tab: action.appTab });
        default:
            return oldState;
    }
}
