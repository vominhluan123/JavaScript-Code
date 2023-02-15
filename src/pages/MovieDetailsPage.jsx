import useSWR from "swr";
import React from "react";
import MovieCard from "../components/movies/MovieCard";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetcher, tmdbAPI } from "../config";
import { useEffect } from "react";
import LoadingSekeleton from "../loading/LoadingSekeleton";
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

const MovieDetailsPage = () => {
  const { movieID } = useParams();
  const { data, errors } = useSWR(tmdbAPI.getMovieDetail(movieID), fetcher);
  const { backdrop_path, poster_path, title, genres, overview } = data || [];
  const loading = !data && !errors;
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [data]);
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative page-container">
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${tmdbAPI.imgOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>

      <div className="w-full h-[500px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.imgOriginal(poster_path)}
          className="object-cover object-top w-full h-full rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-4xl font-bold text-center text-white">
        {title}
      </h1>
      {genres?.length && (
        <div className="flex items-center justify-center mb-10 gap-x-5">
          {genres.slice(0, 2).map((genre) => (
            <span
              className="px-4 py-2 border rounded border-pink text-pink"
              key={genre.id}
            >
              {genre.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};
function MovieCredits() {
  const { movieID } = useParams();
  const { data, errors } = useSWR(
    tmdbAPI.getMovieMeta(movieID, "credits"),
    fetcher
  );
  const { cast } = data || [];

  return (
    <div className="py-10">
      <h2 className="mb-10 text-3xl text-center">Cast</h2>
      <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
        {cast?.length > 0 &&
          cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.imgOriginal(item.profile_path)}
                className="w-full h-[350px] rounded-lg object-cover mb-3"
              />
              <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
function MovieVideo() {
  const { movieID } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieID, "videos"), fetcher);
  const { results } = data || [];

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results?.length > 0 &&
          results.slice(0, 1).map((item) => (
            <div key={item.id}>
              <h3 className="inline-block p-3 mb-5 text-xl font-medium bg-secondary">
                {item.name}
              </h3>
              <div className="w-full aspect-video">
                <iframe
                  width="1280"
                  height="720"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title="NONSTOP Vinahouse 2023 - Xin Một Lần Ngoại Lệ Remix - Tại Vì Sao Người Lặng Im Chẳng Nói Một Câu"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="object-fill w-full h-full"
                ></iframe>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
function MovieSimilar() {
  const { movieID } = useParams();
  const { data, errors } = useSWR(
    tmdbAPI.getMovieMeta(movieID, "similar"),
    fetcher
  );
  const { results } = data || [];
  return (
    <div className="py-10">
      <h2 className="mb-10 text-3xl font-medium">Similar Movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {results?.length > 0 &&
            results.map((result) => (
              <SwiperSlide key={result.id}>
                <MovieCard movie={result}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailsPage;
