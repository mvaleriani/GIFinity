import { RECEIVE_SEARCH_GIFS, CLEAR_SEARCH_GIFS } from '../actions/gifActions';

export default function gifReducer(state = null, action) {
    switch (action.type) {
        case RECEIVE_SEARCH_GIFS:
            if (state && state.searchGIFs && state.searchGIFs.data) {
                for (let i = 0; i < action.searchGIFs.data.length; i++) {
                    state.data.push(action.searchGIFs.data[i]);
                }
                action.searchGIFs.data = state.data;
            }
            return action.searchGIFs;    
        default:
            return state;
    }
}
