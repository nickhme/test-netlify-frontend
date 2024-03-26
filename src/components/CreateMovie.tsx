import { SyntheticEvent, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function CreateMovie() {

  const navigate = useNavigate()
  // ! Our state should look like a movie now.
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    image: ""
  })

  function handleChange(e: any) {
    const fieldName = e.target.name
    const newFormData = structuredClone(formData)
    newFormData[fieldName as keyof typeof formData] = e.target.value
    setFormData(newFormData)
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    // ! We now need to provide a TOKEN in the request. We get this from localStorage
    const token = localStorage.getItem('token')
    // ? If you do need to send the year back as a number, this is how you would do it.
    // const newFormData = structuredClone(formData)
    // newFormData.year = Number(newFormData.year)

    // ! Here we attach the token to the request to the API.
    const resp = await axios.post('/api/movies', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(resp.data)
    // ! We're now going to movies
    navigate('/movies')
  }

  console.log(formData)

  return <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Movie Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={'name'} // ! Updating name field to the right name
              onChange={handleChange}
              value={formData.name} // ! Updating the value to the right bit of formData
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Year</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={'year'} // ! Updating name field to the right name
              onChange={handleChange}
              value={formData.year} // ! Updating the value to the right bit of formData
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Image URL</label>
          <div className="control">
            <input
              className="input"
              type="text" // ! No longer a password field
              name={'image'} // ! Updating name field to the right name
              onChange={handleChange}
              value={formData.image} // !  Updating the value to the right bit of formData
            />
          </div>
        </div>
        <button className="button">Submit</button>
      </form>
    </div>
  </div>
}