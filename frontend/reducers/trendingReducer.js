import merge from 'lodash/merge';

import { RECEIVE_TRENDING_GIFS } from '../actions/gifActions';

export default function gifReducer(oldState = {}, action) {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_TRENDING_GIFS:
            if (oldState.data) {
                for (let i = 0; i < action.trendingGIFs.data.length; i++) {
                    oldState.data.push(action.trendingGIFs.data[i]);  
                }
                action.trendingGIFs.data = oldState.data;
            }
            return action.trendingGIFs;
        default:
            return oldState;
    }
}
