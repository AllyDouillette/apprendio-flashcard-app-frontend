import { baseURL, headers, maxStage } from "../../helpers/constants"
import { deleteEntry } from "../../helpers/functions"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

function ListPair ({card}) {
  const {prompt, answer, stage} = card
  return (
    <div className="listentry threeColumns">
      <p>{prompt}</p>
      <p>{answer}</p>
      <div className="buttoncontainer">
        <p className={stage >= maxStage ? "circlebutton green" : "circlebutton"}>{stage}</p>
        <p className="circlebutton delete red" onClick={() => deleteEntry(card.id)}>🗑️</p>
      </div>
    </div>
  )
}

function CategorySection ({title, entries}) {
  const navigate = useNavigate()

  if (!entries.length) return (
    <section>
      <h2>{title}</h2>
      <div className="list">
        <div className="listentry">
          <p>No entries yet</p>
          <p>… do you want to create one?</p>
          <button onClick={() => navigate("/new-entry")}>➕ Add</button>
        </div>
      </div>
    </section>
  )
  
  const donePercent = Number((entries.filter(entry => entry.stage >= maxStage).length) / entries.length * 100).toFixed(0)

  return (
    <section>
      <h2>{title} – {entries.length} {entries.length === 1 ? "entry" : "entries"} – {donePercent}% done</h2>
      <div className="list">
        {entries && entries.map((entry, index) => <ListPair key={index} card={entry}/>)}
      </div>
    </section>
  )
}

export default function Lookup() {
  const [categories, setCategories] = useState(null)
  const getCategories = () => {
    const endpoint = "/categories"

    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log("error getting categories", error))
  }
  useEffect(getCategories, [])

  const [entries, setEntries] = useState(null)
  const getEntries = () => {
    const endpoint = "/entries"

    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setEntries(data))
      .catch(error => console.log("error getting entries", error))
  }
  useEffect(getEntries, [])

  const entriesFromCategory = (categoryId) => entries.filter(entry => entry.categoryId === categoryId)

  if (!categories) return <div className="center">Loading categories</div>
  if (!entries) return <div className="center">Loading entries</div>

  return (
    <>
    {categories.map((category, index) => <CategorySection key={index} title={category.title} entries={entriesFromCategory(category.id)} />)}
    </>
  )
}