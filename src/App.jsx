import {useState, useEffect} from "react";
import { Logs } from "./Logs";
import { Log } from "./Log";
import { LogForm } from "./LogForm";

const App = () => {
  const [allLogs, setAllLogs] = useState([])
  const [toggleDetails, setToggleDetails] = useState({show:false, id: null})
  const [toggleForm, setToggleForm] = useState(false)
  const [edit, setEdit] = useState({show:false, id: null})

  useEffect(() => {
    fetch('http://localhost:3003/api/logs').then(res => res.json()).then(data => setAllLogs(data.logs))
}, [])


  return (
    <div>
      <h1>Logs CRUD</h1>
      <button onClick={() => setToggleForm(true)}>Create Log</button>
      <Logs allLogs={allLogs} setAllLogs={setAllLogs} setToggleDetails={setToggleDetails} setEdit={setEdit} edit={edit}/>
      {toggleDetails.show && <Log setToggleDetails={setToggleDetails} toggleDetails={toggleDetails} setEdit={setEdit}/>}
      {(edit.show || toggleForm) && <LogForm setToggleForm={setToggleForm} setAllLogs={setAllLogs} edit={edit} setEdit={setEdit}/>}

    </div>
  );
};

export default App;
