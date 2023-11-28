import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../css/AddNew.css';
import todoService from '../services/todoService';

function AddNewTodo({isOpen, handlePopUp, tags, refreshTodos, timezone}: AddNewTodoProps) {  
  const [todo, setTodo] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<boolean>(false);

  const [activeTag, setActiveTag] = useState<string>('1');

  const filterStyle = {
    fontSize: '1.8em',
    margin: '0.2em',
    padding: '0.2em',
    display: 'inline',
    backgroundColor: '#F5F1EB'
  };

  const activeFilterStyle = {
    fontSize: '1.8em',
    margin: '0.2em',
    padding: '0.2em',
    display: 'inline',
    backgroundColor: '#FABC2A',
    borderRadius: '25px'
  };

  const [todoData, setTodoData] = useState<Todo>({
    content: '',
    subtasks: [] as Subtask[],
    repeatInterval: 'never',
    todo: todo,
    deadline: deadline,
    done: false,
    tag: activeTag,
    doneBy: new Date().getTime() - timezone,
    createdAt: new Date().getTime() - timezone,
    editedAt: new Date().getTime() - timezone,
    userId: '1',
    id: uuidv4()
  });
  
  // Handle content
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoData({ ...todoData, content: e.target.value });
  };
  
  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDoneBy = new Date(e.target.value).getTime()-timezone;
    setTodoData({ ...todoData, doneBy: newDoneBy });
  };
  
  // Change title
  const getTitle = () => {
    if (todo === false) {
      return 'Add new note';
    } else if (todo === true && todoData.subtasks.length > 0) {
      return 'Add new to do list';
    } else {
      return 'Add new to do';
    }
  };

  // Change subtask
  const handleSubtaskChange = (subtaskId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSubtasks = todoData.subtasks.map((subtask) =>
      subtask.id === subtaskId ? { ...subtask, content: e.target.value } : subtask
    );
    setTodoData({ ...todoData, subtasks: updatedSubtasks });
  };

  // Add new subtask
  const addSubtask = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newSubtask = { id: uuidv4(), content: (e.target as HTMLTextAreaElement).value, done: false};
    setTodoData({ ...todoData, subtasks: [...todoData.subtasks, newSubtask] });
    console.log(todoData);
  };

  // Empty all subtasks
  const emptySubtasks = () => {
    setTodoData({...todoData, subtasks: []});
  };
  
  // Remove subtask
  const removeSubtask = (subtaskId: string) => {
    const updatedSubtasks = todoData.subtasks.filter((subtask) => subtask.id !== subtaskId);
    setTodoData({ ...todoData, subtasks: updatedSubtasks });
  };
  
  // To do handler
  const clickTodoHandler = () => {
    if (todo) {
      emptySubtasks();
    }

    setTodo(!todo);
  };

  // Repeat interval handler
  // const handleRepeatIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedValue = e.target.value;
  //   setTodoData({...todoData, repeatInterval: selectedValue });
  // };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo = {
      id: uuidv4(),
      userId: '1',
      createdAt: new Date().getTime()- timezone,
      editedAt: new Date().getTime() - timezone,
      doneBy: todoData.doneBy,
      content: todoData.content,
      subtasks: todoData.subtasks,
      repeatInterval: todoData.repeatInterval,
      todo: todo,
      deadline: deadline,
      done: todoData.done,
      tag: activeTag,
    };

    try {
      const response = await todoService.create(newTodo);
      console.log('Todo created:', response.data);
      emptyForm();

      closePopup();
      refreshTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }

  };	

  // Close popup
  const closePopup = () => {
    /* Find a way to reset form when popup is closed */
    emptyForm();
    handlePopUp();
  };

  const emptyForm = () => {
    setTodoData((prevTodoData) => ({
      ...prevTodoData,
      content: '',
      subtasks: [],
      repeatInterval: 'never',
      todo: false,
      deadline: false,
      done: false,
      tag: '1', // Set to the initial tag value
    }));
    setActiveTag('1');
  };  

  const handleTagSelection = (id: string) => {
    setActiveTag(id);
  };

  return (
    <div className={(isOpen) ? 'addNewBackground' : 'hidden'}>
      <div className="addNewBase">
        <button type="button" className="closeForm floatRight" 
          onClick={() => closePopup()}>X</button>
        <p className="formTitle">{getTitle()}</p>

        <center>
          {tags.map((f: Filter) => 
          {
            return <div key={f.id} style={f.id !== activeTag ? filterStyle : activeFilterStyle}
              onClick={() => handleTagSelection(f.id)}>{f.icon}</div>;
          }
          )}
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
            onChange={handleContentChange} 
            value={todoData.content}
            placeholder="What you need to do?" />

          {/* To do list subtasks */}
          {(todo)
            ? todoData.subtasks.map((st) => 
            {return <div key={st.id} style={{textAlign: 'right'}}>

              <input style={{width: '85%', border: '1px solid black'}} 
                className="addNewInput" 
                placeholder="Add a thing to do!"  
                value={st.content} 
                onChange={(e) => handleSubtaskChange(st.id, e)}/> 

              <span className="deleteSubtask" 
                onClick={() => removeSubtask(st.id)}>
            🗑️</span>

            </div>;})
            : ''
          }
        
          {(todo) 
            ? <button type="button" 
              className="addSubtask fullLength" 
              onClick={(e) => addSubtask(e)}>
              {todoData.subtasks.length > 0 
                ? 'Add another subtask!' 
                : 'Add subtask!'}</button> 
            : ''}

          {(todo) ? <div className="marginTop" /> : ''}

          {/* To do date */}
          <label>
          Date
            <input
              type="datetime-local"
              className="addNewInput fullWidth"
              onChange={handleDateChange}
            />
          </label>

          {/* To do deadline checkbox */}
          <label>
            <input type="checkbox" className="addNewInput" 
              onClick={() => setDeadline(!deadline)}/> 
            Add deadline
          </label>

          <div className="marginTop" />

          {/* To do repeatInterval 
          <label>
            Repeat this...
            <select className="addNewInput fullWidth" 
              value={todoData.repeatInterval} 
              onChange={handleRepeatIntervalChange}>
              <option value="never">Never</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
          */}
          <br/>

          <button type="submit" 
            className="submitNew floatRight">Submit</button>
        </form>

      </div>
    </div>  
  );
}

export default AddNewTodo;