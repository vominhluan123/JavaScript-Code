import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const Main = lazy(() => import("./components/layout/Main"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const theme = createTheme({
  palette: {
    primary: {
      main: "#f62682",
    },
  },
});
const router = createBrowserRouter([
  {
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/movies",
        element: <MoviesPage></MoviesPage>,
      },
      {
        path: "/movie/:movieID",
        element: <MovieDetailsPage></MovieDetailsPage>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Suspense>
  </React.StrictMode>
);
//fallback={<LoadingBar></LoadingBar>}
