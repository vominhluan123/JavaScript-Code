import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import LoadingSekeleton from "../../loading/LoadingSekeleton";
import Button from "../button/Button";

const MovieCard = ({ movie }) => {
  const { title, vote_average, release_date, poster_path, id } = movie || {};
  const navigate = useNavigate();
  return (
    <div className="movie-card rounded-lg p-3 bg-slate-800 text-white h-full flex flex-col select-none">
      <img
        src={tmdbAPI.img500(poster_path)}
        className="w-full h-[250px] object-cover rounded-lg mb-3"
      />
      <div className="flex flex-col flex-1">
        <h3 className=" text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button bgColor="pink" onClick={() => navigate(`/movie/${id}`)}>
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card rounded-lg p-3 bg-slate-800 text-white h-full flex flex-col select-none">
      <LoadingSekeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSekeleton>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">
          <LoadingSekeleton width="100%" height="20px"></LoadingSekeleton>
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>
            <LoadingSekeleton width="50px" height="10px"></LoadingSekeleton>
          </span>
          <span>
            <LoadingSekeleton width="30px" height="10px"></LoadingSekeleton>
          </span>
        </div>
        <LoadingSekeleton
          width="100%"
          height="40px"
          radius="6px"
        ></LoadingSekeleton>
      </div>
    </div>
  );
};
