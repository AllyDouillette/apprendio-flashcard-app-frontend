import { maxLevel } from "../../helpers/constants"
import { deleteEntry, makeHeaders } from "../../helpers/functions"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Searchbar from "./Searchbar"

function ListPair ({card, getCards}) {
  const {prompt, answer, level} = card

  const handleDelete = () => {
    deleteEntry(card.id)
    getCards()
  }

  return (
    <div className="listentry reviewEntry">
      <p>{prompt}</p>
      <p>{answer}</p>
      <div className="buttoncontainer">
        <p className={level >= maxLevel ? "circlebutton green" : "circlebutton"}>{level}</p>
        <p className="circlebutton delete red" onClick={handleDelete}>🗑️</p>
      </div>
    </div>
  )
}

function CategorySection ({name, cards, getCards}) {
  const navigate = useNavigate()

  if (!cards.length) return (
    <section>
      <h2>{name}</h2>
      <div className="list">
        <div className="listentry reviewEntry">
          <p>No entries yet</p>
          <p>… do you want to create one?</p>
          <button onClick={() => navigate("/new-entry")}>➕ Add</button>
        </div>
      </div>
    </section>
  )

  const donePercent = Number((cards.filter(card => card.level >= maxLevel).length) / cards.length * 100).toFixed(0)

  return (
    <section>
      <h2>{name} – {cards.length} {cards.length === 1 ? "card" : "cards"} – {donePercent}% done</h2>
      <div className="list">
        {cards && cards.map((card, index) => <ListPair key={index} card={card} getCards={getCards}/>)}
      </div>
    </section>
  )
}

export default function Lookup() {

  const [data, setData] = useState(null)
  const [filteredCards, setFilteredCards] = useState(null)
  const [searchText, setSearchText] = useState("")

  const getCards = () => {
    const get = async () => {
      try {
        const options = {
          headers: makeHeaders()
        }
        const response = await fetch("/api/users/me/categories/details", options)
        // this is not a mistake, the cards are included in their category-element: categories: [ ... cards: [] ]
        if (response.status === 200) {
          const data = await response.json()
          setData(data.categories)
        }
      } catch (error) {
        console.log(error, "error fetching cards")
      }
    }
    get()
  }
  useEffect(getCards, [])

  const filterCards = () => {
    if (!data) return
    if (!searchText.length) {
      setFilteredCards(data)
      return
    }
    const filteredForText = data.filter(category => {
      category.Card = category.Card.filter(card => !!card.prompt.match(searchText) || !!card.answer.match(searchText))
      return category
    })
    setFilteredCards(filteredForText)
  }

  const handleInput = (event) => setSearchText(event.target.value)

  useEffect(filterCards, [searchText])

  if (!data) return <div className="center">Loading cards…</div>
  if (!filteredCards && searchText.length > 0) return <div className="center">Filtering cards…</div>

  return (
    <>
    <section>
      <Searchbar handleInput={handleInput}/>
    </section>
    {data.map((category, index) => <CategorySection key={index}
        name={category.name}
        cards={category.Card}
        getCards={getCards}
      />)}
    </>
  )
}
