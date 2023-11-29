import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { baseURL } from "../helpers/helpers"

export default function LanguageSelection () {

  const navigate = useNavigate()
  const [categories, setCategories] = useState(null)

  const getCategories = () => {
    const endpoint = "/categories"

    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log("error loading categories", error))
  }

  useEffect(getCategories, [])

  if (!categories) return "Loading…"

  return (
    <>
      <h2>Select your category</h2>
      <div className="autoColumns">
        {categories.map((category, index) => <label key={index} onClick={() => navigate("/practice/"+category.id+"/")}>{category.title}</label>)}
        <button onClick={() => navigate("/create-category")}>Create new category</button>
      </div>
    </>
  )
}