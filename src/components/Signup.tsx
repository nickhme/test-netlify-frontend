import { SyntheticEvent, useState } from "react"
import axios from 'axios'
// ! This will navigate the page when the user successfully signs up
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../config"

export default function Signup() {

  // ! navigate is a function to call to take the user to another page.
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: ""
  })

  // ! Here are errors that could come back from the API 
  const [errorData, setErrorData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: ""
  })

  function handleChange(e: any) {
    const fieldName = e.target.name
    const newFormData = structuredClone(formData)
    newFormData[fieldName as keyof typeof formData] = e.target.value
    setFormData(newFormData)
  }

  async function handleSubmit(e: SyntheticEvent) {
    // ! Adding a try/catch
    try {
      e.preventDefault()
      const resp = await axios.post(`${baseUrl}/signup`, formData)
      console.log(resp.data)
      // ! take them to the login page
      navigate('/login')
    } catch (e: any) {
      // ! Set errors in the catch
      setErrorData(e.response.data.errors)
    }
  }

  // console.log(formData)
  console.log(errorData)

  return <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={'username'}
              onChange={handleChange}
              value={formData.username}
            />
            {/* // ! Add this small tag only if there was an issue with this field */}
            {errorData.username && <small className="has-text-danger">{errorData.username}</small>}
          </div>
        </div>
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
            {/* // ! Add this small tag only if there was an issue with this field */}
            {errorData.email && <small className="has-text-danger">{errorData.email}</small>}
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
            {/* // ! Add this small tag only if there was an issue with this field */}
            {errorData.password && <small className="has-text-danger">{errorData.password}</small>}
          </div>
        </div>
        <div className="field">
          <label className="label">Confirm password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name={'passwordConfirmation'}
              onChange={handleChange}
              value={formData.passwordConfirmation}
            />
            {/* // ! Add this small tag only if there was an issue with this field */}
            {errorData.passwordConfirmation && <small className="has-text-danger">{errorData.passwordConfirmation}</small>}
          </div>
        </div>
        <button className="button">Submit</button>
      </form>
    </div>
  </div>
}