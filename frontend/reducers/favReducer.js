import { RECEIVE_FAV_GIFS, DELETE_FAV } from '../actions/gifActions';

export default function gifReducer(state = null, action) {
    switch (action.type) {
        case RECEIVE_FAV_GIFS:
            return action.favGIFs;
        default:
            return state;
    }
}
