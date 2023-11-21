import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import './css/AddNew.css';

function AddNew(props: AddNewProps) {  
  const [todo, setTodo] = useState<boolean>(false);
  const [subtask, setSubtask] = useState<Subtask[]>([]);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<boolean>(false);

  const getTitle = () => {
    if (todo === false) {
      return "Add new note"
  } else if (todo === true && subtask.length > 0) {
      return "Add new to do list"
    } else {
      return "Add new to do"
    }
  }

  const addSubtask = () => {
    const newId = uuidv4();
    console.log(newId);
    const newSubtask = {id: newId, content: ""};
    setSubtask([...subtask, newSubtask])
    console.log("Created subtask " + newSubtask);
  }

  const emptySubtasks = () => {
    const subtaskArray: Subtask[] = [];
    setSubtask(subtaskArray);
  }
  
  const removeSubtask = (id: string) => {
    const newSubtask = subtask.filter(st => st.id !== id);
    setSubtask(newSubtask);    
  }
  
  const clickTodoHandler = () => {
    if (todo) {
      emptySubtasks();
    }

    setTodo(!todo);
  }
  
  return (
  <div className={(props.isOpen) ? "addNewBackground" : "hidden"}>
    <div className="addNewBase">
    <button type="button" className="closeForm floatRight" onClick={() => props.handlePopUp()}>X</button>
      <p className="formTitle">{getTitle()}</p>

      {/* Temporary solution for mockup! */}
      {(!todo || subtask.length > 0)
      ? <center>
        <button className="filterToggleButton">⭐</button>
        <button className="filterToggleButton">🧼</button>
        <button className="filterToggleButton">🎉</button>
        <button className="filterToggleButton">👽</button>
        <button className="filterToggleButton">🍕</button>
        <button className="filterToggleButton">🌴</button>
        <button className="filterToggleButton">🎵</button>
      </center>
      : ""
      }
      <br />

      {(todo) ? <button type="button" className="addSubtask floatRight" onClick={addSubtask}>Add subtask</button> : ""}

      <form>
        <input className="addNewInput fullWidth" placeholder="What you need to do?"></input>
        
        {(todo)
        ? subtask.map((st) => 
          {return <div style={{textAlign: "right"}}>
            <input style={{width: "85%", border: "1px solid black"}} className="addNewInput" placeholder="Add a thing to do!"  /> 
            <span className="deleteSubtask" onClick={() => removeSubtask(st.id)}>🗑️</span>
            </div>})
        : ""
        }

        <label>
          Date
        <input type="date" className="addNewInput fullWidth"></input>
        </label>        
        
        {(deadline)
        ? <label>
          Time
          <input type="time" className="addNewInput fullWidth"></input>
        </label>
        : ""
        }

        {(repeat)
        ?  <label>
            Repeat this...
            <select className="addNewInput fullWidth">
              <option value="daily">Daily</option>
              <option value="weekly" selected>Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
          : ""
        }

            <br/>

          <label>
          <input type="checkbox" className="addNewInput" onClick={() => clickTodoHandler()}/> 
            To do
          </label>

          <label>
          <input type="checkbox" className="addNewInput" onClick={() => setRepeat(!repeat)}/> 
            Repeat 
          </label>

          <label>
          <input type="checkbox" className="addNewInput" onClick={() => setDeadline(!deadline)}/> 
            Deadline
          </label>

            <br/>

        <button type="submit" className="submitNew floatRight">Submit</button>
      </form>

     </div>
  </div>  
  )
}

export default AddNew