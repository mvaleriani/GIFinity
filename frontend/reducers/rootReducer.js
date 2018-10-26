import { combineReducers } from 'redux';
import ui from './uiReducer';
import gifs from './gifReducer';



const rootReducer =  combineReducers({
  ui,
  gifs
});

export default rootReducer;
