import React from "react"
import Movie from "./Movie"
import { IMovie } from "../interfaces/movie"
import { baseUrl } from "../config"

type Movies = null | Array<IMovie> 

function MoviesList() {

  const [movies, setMovies] = React.useState<Movies>(null)

  React.useEffect(() => {
    async function fetchMovies() {
      const resp = await fetch(`${baseUrl}/movies`)
      const data = await resp.json()
      setMovies(data)
    }
    fetchMovies()
  }, [])

  console.log(movies)

  return <section className="section">
    <div className="container">
      <div className="columns is-multiline">
        {movies?.map(movie => {
          return <Movie 
            key={movie._id}
            // ! Pass all properties, don't have to declar them individually.
            {...movie}
          />
        })}
      </div>
    </div>
  </section>
}


export default MoviesList
