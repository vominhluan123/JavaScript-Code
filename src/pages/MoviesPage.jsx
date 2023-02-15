import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movies/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import UseDebounce from "../hooks/UseDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>
const itemsPerPage = 20;
const MoviesPage = () => {
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [movies, setMovies] = useState(null);
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const Debounce = UseDebounce(filter);
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const { total_results } = data || [];

  const [itemOffset, setItemOffset] = useState(0);
  const pageCount = Math.ceil(total_results / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  const handlerFilter = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    if (Debounce) {
      setUrl(tmdbAPI.getMovieSreach(Debounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [Debounce, nextPage]);
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]);
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 outline-none text-white bg-slate-800"
            placeholder="Type here to sreach...."
            onChange={handlerFilter}
          />
        </div>
        <button className="p-4 bg-pink text-white">Seach movie</button>
      </div>
      {Debounce && (
        <div className="mb-5">
          Seach Results for: <span className="text-pink">{Debounce}</span>
        </div>
      )}
      {loading && (
        <div className="grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-md:grid-cols-1 ">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-md:grid-cols-1">
        {!loading &&
          movies?.length > 0 &&
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </div>
  );
};

export default MoviesPage;
