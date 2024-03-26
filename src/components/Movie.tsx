import { Link } from "react-router-dom"
import { IMovie } from "../interfaces/movie"

function Movie({ _id, name, year, image }: IMovie) {
  return <div className="column is-one-quarter-desktop is-one-third-tablet">
    <Link to={`/movie/${_id}`}>
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">{name}</div>
        </div>
        <div className="card-image">
          <figure className="image image-is-1by1">
            <img src={image} alt={name} />
          </figure>
        </div>
        <div className="card-content">
          <h5>{year}</h5>
        </div>
      </div>
    </Link>
  </div>
}

export default Movie