import { useEffect } from "react";
import tmdb from "./api/tmdb";

export default function App() {
  useEffect(() => {
    tmdb.get("/movie/popular").then(res => console.log(res.data));
  }, []);

  return (
    <div>
      {/* placeholder for now */}
    </div>
  );
}