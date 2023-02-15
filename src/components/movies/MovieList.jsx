import React, { Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetcher, tmdbAPI } from "../../config";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import { useEffect } from "react";
// https://api.themoviedb.org/3/movie/now_playing?api_key=1297fc1f6e6d865cdb8ff8d6f8833e68
const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState(null);
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]);
  return (
    <div className="movie-list">
      {isLoading && (
        <Fragment>
          <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </Fragment>
      )}
      {!isLoading && (
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {movies?.length > 0 &&
            movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieList;
