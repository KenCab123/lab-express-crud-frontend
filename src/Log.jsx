import { useState, useEffect } from 'react'

export const Log = ({setToggleDetails, toggleDetails, setAllLogs}) => {
    const [logDetail, setLogDetail] = useState()

  
    useEffect(() => {
        fetch(`http://localhost:3003/api/logs/${toggleDetails.id}`).then(res => res.json()).then(data => setLogDetail(data.log))
    }, [toggleDetails.id])

    if(!logDetail) return null

  return (
    <div>
        <h2>Log Details</h2>
        <p>Title: {logDetail.title}</p>
        <p>Name: {logDetail.captainName}</p>
        <p>Post: {logDetail.post}</p>
        <p>Mistakes were made today: {String(logDetail.mistakesWereMadeToday)}</p>
        <p>Days since the last crisis: {logDetail.daysSinceLastCrisis}</p>
        <button onClick={() => setToggleDetails({show: false, id: null})}>Close</button>
    </div>
  )
}
