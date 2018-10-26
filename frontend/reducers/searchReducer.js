import { RECEIVE_SEARCH_GIFS } from '../actions/gifActions';

export default function gifReducer(state = null, action) {
    switch (action.type) {
        case RECEIVE_SEARCH_GIFS:
            return action.searchGIFs;
        default:
            return state;
    }
}
