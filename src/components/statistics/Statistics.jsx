import { useEffect, useState } from "react";
import { getMyStatistics } from "../../helpers/functions"

function Entry ({statisticObj}) {
  const date = new Date(statisticObj.date).toLocaleDateString()
  const { correct, incorrect } = statisticObj
  const total = Number(correct) + Number(incorrect)
  if (total <= 0) {
    return (
      <div className="listentry autoColumns fourColumns">
        <p>{date}</p>
      </div>
    )
  }

  return (
    <div className="listentry autoColumns fourColumns">
      <p>{date}</p>
      <span className="circlebutton blue">{total}</span>
      <div className="autoColumns threeColumns">
        <span>{correct}</span>
        <span className="circlebutton green" style={{opacity: total ? correct / total : 0}} />
        <span>{(correct / total * 100).toFixed(0)+"%"}</span>
      </div>
      <div className="autoColumns threeColumns">
        <span>{incorrect}</span>
        <span className="circlebutton red" style={{opacity: total ? incorrect / total : 0}} />
        <span>{(incorrect / total * 100).toFixed(0)+"%"}</span>
      </div>
    </div>
  )
}

export default function Statistics () {
  const [history, setHistory] = useState(null)

  const getData = () => {
    getMyStatistics().then((data) => setHistory(data))
  }

  useEffect(getData, [])

  if (!history) return <div>Loading…</div>

  return (
    <>
      <div className="list autoColumns fourColumns">
        <p>Date</p>
        <p>Total</p>
        <p>Correct</p>
        <p>Incorrect</p>
      </div>
      <div className="list">
        {history.map((entry, index) => <Entry key={index} statisticObj={entry} />)}
      </div>
    </>
  )
}
