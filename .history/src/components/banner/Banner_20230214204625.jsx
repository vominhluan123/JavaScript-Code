import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
const Banner = () => {
  const [movies, setMovies] = useState(null);
  const { data, errors } = useSWR(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=1297fc1f6e6d865cdb8ff8d6f8833e68",
    fetcher
  );
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]);
  const loading = !data && !errors;
  return (
    <section className="banner h-screen page-container mb-20 overflow-hidden">
      <Swiper grabCursor={true} slidesPerView={"auto"}>
        {movies?.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <BannerItem movie={movie}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ movie }) {
  const { title, poster_path, id } = movie || [];
  const navigate = useNavigate();

  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overplay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        className="w-full h-full object-cover rounded-lg object-center"
      />
      <div className="content absolute left-5 bottom-5 mb-3 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex flex-wrap items-center gap-x-3 mb-8 max-md:gap-y-3">
          <span className="p-4 border border-white rounded-md py-2 px-4">
            Adentute
          </span>
          <span className="p-4 border border-white rounded-md py-2 px-4">
            Adentute
          </span>
          <span className="p-4 border border-white rounded-md py-2 px-4">
            Adentute
          </span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}> Watch Now</Button>
      </div>
    </div>
  );
}
export default Banner;
