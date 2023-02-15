export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "1297fc1f6e6d865cdb8ff8d6f8833e68";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSreach = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetail: (movieID) => `${tmdbEndpoint}/${movieID}?api_key=${apiKey}`,
  getMovieMeta: (movieID, type) =>
    `${tmdbEndpoint}/${movieID}/${type}?api_key=${apiKey}`,
  getMovieSreach: (query, page) =>
    `${tmdbEndpointSreach}?api_key=${apiKey}&query=${query}&page=${page}`,
  imgOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  img500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
