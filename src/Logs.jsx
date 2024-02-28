import React, { useEffect, useState } from 'react'

export const Logs = ({allLogs, setAllLogs, setToggleDetails, setEdit}) => {
    
  function handleDelete(id) {
    const options = {
      method: "DELETE",
    };

    fetch(`http://localhost:3003/api/logs/${id}`, options)
    .then((res) => res.json())
    .then((data) => {setAllLogs(data.logs); setToggleDetails(false)})
  }

   

  return (
    <div>
        <h1>Logs</h1>
        {allLogs.length > 0 && allLogs.map(({captainName, title, post, id, mistakesWereMadeToday, daysSinceLastCrisis}) => 
            <div key={id}>
                <h3>Title: {title}</h3>
                <p>Name: {captainName}</p>
                <button onClick={() => setEdit({show: true, id})}>Edit</button>
                <button onClick={() => handleDelete(id)}>Delete</button>
                <button onClick={() => setToggleDetails({show: true, id})}>Details</button>
            </div>)}
    </div>
  )
}
