import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './css/AddNew.css';

const tempTestArray: Todo[] = [];

function AddNew(props: AddNewProps) {  
  const selectRef = useRef(null);

  const [todo, setTodo] = useState<boolean>(false);
  const [subtask, setSubtask] = useState<Subtask[]>([]);
  const [deadline, setDeadline] = useState<boolean>(false);

  const getTitle = () => {
    if (todo === false) {
      return 'Add new note';
    } else if (todo === true && subtask.length > 0) {
      return 'Add new to do list';
    } else {
      return 'Add new to do';
    }
  };

  const addSubtask = () => {
    const newId = uuidv4();
    console.log(newId);
    const newSubtask = {id: newId, content: ''};
    setSubtask([...subtask, newSubtask]);
    console.log('Created subtask ' + newSubtask);
  };

  const emptySubtasks = () => {
    const subtaskArray: Subtask[] = [];
    setSubtask(subtaskArray);
  };
  
  const removeSubtask = (id: string) => {
    const newSubtask = subtask.filter(st => st.id !== id);
    setSubtask(newSubtask);    
  };
  
  const clickTodoHandler = () => {
    if (todo) {
      emptySubtasks();
    }

    setTodo(!todo);
  };

  const closePopup = () => {
    /* Find a way to reset form when popup is closed */
    emptySubtasks();
    props.handlePopUp();
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const currentDate = new Date();

    const newTodo: Todo = {
      id: uuidv4(),
      userId: '1',

      createdAt: currentDate,
      editedAt: currentDate,
      doneBy: currentDate,

      content: 'Lorem ipsum',
      subtasks: subtask,

      repeatInterval: 'never',

      todo: false,
      done: false,

      tag: '1'
    };

    tempTestArray.push(newTodo);
    console.log(tempTestArray);
  };

  return (
    <div className={(props.isOpen) ? 'addNewBackground' : 'hidden'}>
      <div className="addNewBase">
        <button type="button" className="closeForm floatRight" onClick={() => closePopup()}>X</button>
        <p className="formTitle">{getTitle()}</p>

        {/* Temporary solution for mockup! */}
        <center>
          <button className="filterToggleButton">⭐</button>
          <button className="filterToggleButton">🧼</button>
          <button className="filterToggleButton">🎉</button>
          <button className="filterToggleButton">👽</button>
          <button className="filterToggleButton">🍕</button>
          <button className="filterToggleButton">🌴</button>
          <button className="filterToggleButton">🎵</button>
        </center>

        <br />

        {/* To do checkbox */}
        <form onSubmit={handleSubmit}>
          <label>
            <input type="checkbox" className="addNewInput" 
              onClick={() => clickTodoHandler()}/> 
                To do
          </label>

          {/* To do content */}
          <input className="addNewInput fullWidth" placeholder="What you need to do?" />

          {/* To do list subtasks */}
          {(todo)
            ? subtask.map((st) => 
            // eslint-disable-next-line react/jsx-key
            {return <div style={{textAlign: 'right'}}>

              <input style={{width: '85%', border: '1px solid black'}} 
                className="addNewInput" placeholder="Add a thing to do!"  /> 

              <span className="deleteSubtask" onClick={() => removeSubtask(st.id)}>
            🗑️</span>

            </div>;})
            : ''
          }
        
          {(todo) ? <button type="button" className="addSubtask fullLength" onClick={addSubtask}>
            {subtask.length > 0 ? 'Add another subtask!' : 'Add subtask!'}</button> 
            : ''}

          <br />

          {/* To do date */}
          <label>
                    Date
            <input type="date" className="addNewInput fullWidth"></input>
          </label>        

          {/* To do time */}
          {(deadline)
            ? <label>
                    Time
              <input type="time" className="addNewInput fullWidth"></input>
            </label>
            : ''
          }

          
          {/* To do deadline checkbox */}
          <label>
            <input type="checkbox" className="addNewInput" 
              onClick={() => setDeadline(!deadline)}/> 
            Add deadline
          </label>

          <br/>

          {/* To do repeatInterval */}
          <label>
            Repeat this...
            <select ref={selectRef} className="addNewInput fullWidth">
              <option value="never" selected>Never</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
          <br/>

          <button type="submit" className="submitNew floatRight">Submit</button>
        </form>

      </div>
    </div>  
  );
}

export default AddNew;