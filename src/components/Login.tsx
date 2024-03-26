import { SyntheticEvent, useState } from "react"
import axios from 'axios'
// ! This will navigate the page when the user logs in
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../config"

export default function Login({ fetchUser }: { fetchUser: Function }) {

  // ! navigate is a function to call to take the user to another page.
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [errorMessage, setErrorMessage] = useState("")

  function handleChange(e: any) {
    const fieldName = e.target.name
    const newFormData = structuredClone(formData)
    newFormData[fieldName as keyof typeof formData] = e.target.value
    setFormData(newFormData)
    setErrorMessage("")
  }

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault()
      const resp = await axios.post(`${baseUrl}/login`, formData)
      localStorage.setItem('token', resp.data.token)
      console.log(resp.data)
      // we need to fetch the user!
      fetchUser()
      // ! Navigate to the home page
      navigate('/')
    } catch (e: any) {
      setErrorMessage(e.response.data.message)
    }
  }

  console.log(formData)

  return <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={'email'}
              onChange={handleChange}
              value={formData.email}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name={'password'}
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          {errorMessage && <small className="has-text-danger">{errorMessage}</small>}
        </div>
        <button className="button">Submit</button>
      </form>
    </div>
  </div>
}