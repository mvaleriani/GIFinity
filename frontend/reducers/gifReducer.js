import { combineReducers } from 'redux';
import trendingGIFs from './trendingReducer';
import searchGIFs from './searchReducer';
import favGIFs from './favReducer';


const gifReducer = combineReducers({
    trendingGIFs,
    searchGIFs,
    favGIFs
});

export default gifReducer;
