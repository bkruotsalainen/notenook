import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../css/AddNew.css';
import axios from 'axios';

function AddNewTodo(props: AddNewProps) {  
  const [todo, setTodo] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<boolean>(false);

  const [filters, setFilters] = useState<Filter[]>([]);
  const [activeTag, setActiveTag] = useState<string>('1');  
  
  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tags/');
        setFilters(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  },
  []);

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


  const getUnix = (date: string): number => {
    return Math.round((new Date(date)).getTime());
  }; 

  const initialTodoData: Todo = {
    content: '',
    subtasks: [] as Subtask[],
    repeatInterval: 'never',
    todo: todo,
    deadline: deadline,
    done: false,
    tag: activeTag,
    doneBy: getUnix(new Date().toString()),
    createdAt: getUnix(new Date().toString()),
    editedAt: getUnix(new Date().toString()),
    userId: '1',
    id: uuidv4()
  };

  const [todoData, setTodoData] = useState<Todo>(initialTodoData);
  
  // Handle content
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoData({ ...todoData, content: e.target.value });
  };
  
  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDoneBy = e.target.value + ':00.00Z';
    console.log(newDoneBy);
    setTodoData({ ...todoData, doneBy: getUnix(newDoneBy) });
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
    const newSubtask = { id: uuidv4(), content: (e.target as HTMLTextAreaElement).value};
    setTodoData({ ...todoData, subtasks: [...todoData.subtasks, newSubtask] });
    console.log(todoData);
  };

  // Empty all subtasks
  const emptySubtasks = () => {
    const subtaskArray: Subtask[] = [];
    todoData.subtasks = subtaskArray;
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
  const handleRepeatIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setTodoData({...todoData, repeatInterval: selectedValue });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const combinedDateTimeString = `${formattedDate.slice(0 ,10)}T${todoData.time}Z`;

    const newTodo = {
      id: uuidv4(),
      userId: '1',
      createdAt: getUnix(new Date().toString()),
      editedAt: getUnix(new Date().toString()),
      doneBy: todoData.doneBy,
      content: todoData.content,
      subtasks: todoData.subtasks,
      repeatInterval: todoData.repeatInterval,
      todo: todo,
      deadline: deadline,
      done: todoData.done,
      tag: activeTag,
    };

    console.log(todoData.doneBy);

    try {
      const response = await axios.post('http://localhost:3000/todos', newTodo);
      console.log('Todo created:', response.data);

      setTodoData(initialTodoData);
      closePopup();
    } catch (error) {
      console.error('Error creating todo:', error);
    }

  };	

  // Close popup
  const closePopup = () => {
    /* Find a way to reset form when popup is closed */
    emptySubtasks();
    setTodoData(initialTodoData);
    props.handlePopUp();
  };

  const handleTagSelection = (id: string) => {
    setActiveTag(id);
  };

  return (
    <div className={(props.isOpen) ? 'addNewBackground' : 'hidden'}>
      <div className="addNewBase">
        <button type="button" className="closeForm floatRight" 
          onClick={() => closePopup()}>X</button>
        <p className="formTitle">{getTitle()}</p>

        {/* Temporary solution for mockup! */}
        <center>
          {filters.map(f => 
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

          {/* To do repeatInterval */}
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
          <br/>

          <button type="submit" 
            className="submitNew floatRight">Submit</button>
        </form>

      </div>
    </div>  
  );
}

export default AddNewTodo;