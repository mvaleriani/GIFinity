
export const fetchTrendingGIFs = (num, offset = 0) => (
  $.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/trending?api_key=qeGiBHwYSk7B6lIuL9dQy9EBZ6ZSZEgs&limit=${num}&offset=${offset}&rating=PG-13`
  })
);

export const fetchSearchGIFs = (searchStr, num, offset = 0) => (
  $.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?api_key=qeGiBHwYSk7B6lIuL9dQy9EBZ6ZSZEgs&q=${searchStr}&limit=${num}&offset=${offset}&rating=PG-13&lang=en`
  })
);

export const fetchFavGIFs = (idsStr) => (
  $.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs?api_key=qeGiBHwYSk7B6lIuL9dQy9EBZ6ZSZEgs&ids=${idsStr}`
  })
);