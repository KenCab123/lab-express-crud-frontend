import React, { useEffect, useState } from 'react'

export const LogForm = ({ setAllLogs, setToggleForm, setEdit, edit }) => {
    const [log, setLog] = useState({
        captainName: "",
        title: "",
        post: "",
        mistakesWereMadeToday: false,
        daysSinceLastCrisis: 0
    })

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setLog({ ...log, [e.target.id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(edit.show) {
            const options = {
                method: "PUT",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(log)
            };

            fetch(`http://localhost:3003/api/logs/${edit.id}`, options).then(res => res.json()).then(data => setAllLogs(data.logs)).then(() => setToggleForm(false)).then(() => setEdit({ show: false, id: null }))
        } else {

            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(log)
            }
            
            
            fetch('http://localhost:3003/api/logs', options).then(res => res.json()).then(data => setAllLogs(data.logs)).then(() => setToggleForm(false))
        }
    }

    useEffect(() => {
        if(edit.show) {
            fetch(`http://localhost:3003/api/logs/${edit.id}`)
            .then(res => res.json())
            .then(data => setLog(data.log))
        }
    }, [edit.id])



  return (
    <div>
        <h1>Log Form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                Captain Name:
                <input
                 onChange={handleChange}
                 type="text"
                 id='captainName'
                 name='captainName'
                 value={log.captainName} 
                 required/>
            </label>
            <br />
            <label htmlFor="title">
                Title:
                <input
                 onChange={handleChange}
                 type="text"
                 id='title'
                 name='title'
                 value={log.title} 
                 required/>
            </label>
            <br />
            <label htmlFor="post">
                Post:
                <input
                 onChange={handleChange}
                 type="text"
                 id='post'
                 name='post'
                 value={log.post} 
                 required/>
            </label>
            <br />
            <label htmlFor="mistakes">
                Mistakes made today:
                <input
                 onChange={handleChange}
                 type="checkbox"
                 id='mistakesWereMadeToday'
                 name='mistakes'
                 value={log.mistakesWereMadeToday} 
                 />
            </label>
            <br />
            <label htmlFor="crisis">
                Days since last crisis:
                <input
                 onChange={handleChange}
                 type="number"
                 id='daysSinceLastCrisis'
                 name='crisis'
                 value={log.daysSinceLastCrisis} 
                 />
            </label>
            <button>Submit</button>
        </form>
        <button onClick={() => {setToggleForm(false), setEdit({show:false, id:null})}}>Cancel</button>
    </div>
  )
}
