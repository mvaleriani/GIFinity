import * as APIUtil from '../util/gifAPIUtil';

export const RECEIVE_TRENDING_GIFS = 'RECEIVE_TRENDING_GIFS';
export const RECEIVE_SEARCH_GIFS = 'RECEIVE_SEARCH_GIFS';
export const RECEIVE_FAV_GIFS = 'RECEIVE_FAV_GIFS';
export const DELETE_FAV = 'DELETE_FAV';
export const ADD_FAV = 'ADD_FAV';

export const deleteFav = gifData => {
    return {
        type: DELETE_FAV,
        gifData
    }
};
export const addFav = gifData => {
    return {
        type: ADD_FAV,
        gifData
    }
};

const receiveTrendingGIFs = trendingGIFs => ({
    type: RECEIVE_TRENDING_GIFS,
    trendingGIFs
});

const receiveSearchGIFs = searchGIFs => ({
    type: RECEIVE_SEARCH_GIFS,
    searchGIFs
});

const receiveFavGIFs = favGIFs => ({
    type: RECEIVE_FAV_GIFS,
    favGIFs
});

export const fetchTrendingGIFS = (num, offset) => dispatch => (
    APIUtil.fetchTrendingGIFs(num, offset).then(trendingGIFs => dispatch(receiveTrendingGIFs(trendingGIFs)))
)

export const fetchSearchGIFS = (searchStr, num, offset) => dispatch => (
    APIUtil.fetchSearchGIFs(searchStr, num, offset).then(searchGIFs => dispatch(receiveSearchGIFs(searchGIFs)))
)

export const fetchFavGIFS = (idsStr) => dispatch => (
    APIUtil.fetchFavGIFs(idsStr).then(favGIFs => dispatch(receiveFavGIFs(favGIFs)))
)