
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import Navbar from "./components/Navbar"
import MoviesList from "./components/MoviesList"
import Signup from "./components/Signup"
import Login from "./components/Login"
import CreateMovie from "./components/CreateMovie"
import { useEffect, useState } from "react"
import axios from "axios"
import ShowMovie from "./components/ShowMovie"
import { baseUrl } from "./config"


function App() {
  // ! Right now, we don't know if we have a valid token.  
  // I need to fetch the current user from api (with a useEffect).
  // We need to know both when the user has logged in, but also IMMEDIATELY when the user first visits the page.
  // we put the fetch in here so that we can pass the user info down to whoever needs it.
  const [user, setUser] = useState(null)

  async function fetchUser() {
    const token = localStorage.getItem('token')
    const resp = await axios.get(`${baseUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setUser(resp.data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetchUser()
  }, [])

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />
        <Route path="/create" element={<CreateMovie />} />
        <Route path="/movie/:movieId" element={<ShowMovie user={user} />} />
      </Routes>
    </Router>
  )
}

export default App
