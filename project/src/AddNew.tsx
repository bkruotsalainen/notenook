import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './css/AddNew.css';

function AddNew(props: AddNewProps) {  
  const [todo, setTodo] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<boolean>(false);

  const [todoData, setTodoData] = useState({
    content: '',
    subtasks: [] as Subtask[],
    repeatInterval: 'never',
    todo: false,
    done: false,
    tag: '',
    deadline: false,
    date: '',
    time: '',
  });
  
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoData({ ...todoData, content: e.target.value });
  };
  
  const addSubtask = () => {
    const newSubtask = { id: uuidv4(), content: '' };
    setTodoData({ ...todoData, subtasks: [...todoData.subtasks, newSubtask] });
    console.log(todoData);
  };
  
  const getTitle = () => {
    if (todo === false) {
      return 'Add new note';
    } else if (todo === true && todoData.subtasks.length > 0) {
      return 'Add new to do list';
    } else {
      return 'Add new to do';
    }
  };

  const emptySubtasks = () => {
    const subtaskArray: Subtask[] = [];
    todoData.subtasks = subtaskArray;
  };
  
  const removeSubtask = (subtaskId: string) => {
    const updatedSubtasks = todoData.subtasks.filter((subtask) => subtask.id !== subtaskId);
    setTodoData({ ...todoData, subtasks: updatedSubtasks });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Now you can create your Todo object with the data from the form
    const newTodo = {
      id: uuidv4(),
      userId: 1,
      createdAt: new Date(),
      editedAt: new Date(),
      doneBy: new Date(),
      content: todoData.content,
      subtasks: todoData.subtasks,
      repeatInterval: todoData.repeatInterval,
      todo: todoData.todo,
      done: todoData.done,
      tag: todoData.tag,
    };

    console.log(newTodo);
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
          
          <div className="marginTop" />

          {/* To do content */}
          <input className="addNewInput fullWidth" 
            onChange={handleContentChange} placeholder="What you need to do?" />

          {/* To do list subtasks */}
          {(todo)
            ? todoData.subtasks.map((st) => 
            {return <div key={st.id} style={{textAlign: 'right'}}>

              <input style={{width: '85%', border: '1px solid black'}} 
                className="addNewInput" placeholder="Add a thing to do!"  /> 

              <span className="deleteSubtask" onClick={() => removeSubtask(st.id)}>
            🗑️</span>

            </div>;})
            : ''
          }
        
          {(todo) ? <button type="button" className="addSubtask fullLength" onClick={addSubtask}>
            {todoData.subtasks.length > 0 ? 'Add another subtask!' : 'Add subtask!'}</button> 
            : ''}

          {(todo) ? <div className="marginTop" /> : ''}

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

          <div className="marginTop" />

          {/* To do repeatInterval */}
          <label>
            Repeat this...
            <select className="addNewInput fullWidth">
              <option value="never">Never</option>
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