import React, { SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IMovie } from "../interfaces/movie"
import Movie from "./Movie"
import { IUser } from "../interfaces/user"
import axios from "axios"
import { baseUrl } from "../config"

function ShowMovie({ user }: { user: null | IUser }) {
  const [movie, updateMovies] = React.useState<IMovie | null>(null)
  const { movieId } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    console.log("The Movie Page has mounted")
  }, [])

  React.useEffect(() => {
    async function fetchMovies() {
      const resp = await fetch(`${baseUrl}/movies/${movieId}`)
      const MoviesData = await resp.json()
      updateMovies(MoviesData)
    }
    fetchMovies()
  }, [])

  async function deleteMovie(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem('token')
      await axios.delete('/api/movies/' + movieId, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/movies')
    } catch (e: any) {
      console.log(e.response.data)
    }
  }

  // ! Pseudocode and thought process!
  // need the token?
  // we need the user. Do we have this?
  // ? a) we need the currentUser. b) we need the movie user!
  // (we have to compare them!)
  console.log(user)
  console.log(movie)

  return <section className="section">
    <div className="container">
      <div className="columns is-multiline">
        {movie && <Movie
          key={movie._id}
          {...movie}
        />}
      </div>
      {movie && (user?._id === movie.user) && <button onClick={deleteMovie} className="button is-danger">Delete</button>}
    </div>
  </section>
}

export default ShowMovie
