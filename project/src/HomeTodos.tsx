import { useEffect, useState } from 'react';
import './css/Home.css';
import axios from 'axios';
import HomeTaskGroup from './HomeTaskGroup';

function HomeTodos() {  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tags, setTags] = useState<Filter[]>([]);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const todosResponse = await axios.get('http://localhost:3000/todos');
        const tagsResponse = await axios.get('http://localhost:3000/tags');
        setTodos(todosResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  },
  []);

  const updateTaskColor = (todo: boolean, subtasksLength: number) => {
    if (todo === true && subtasksLength > 0) {
      return '#86DEDE';
    } else if (todo === false) {
      return '#FABC2A';
    } else if (todo === true && subtasksLength === 0) {
      return '#F05365';
    }
  };

  const getIcon = (tagId: string | number) => {
    const filteredTags = tags.filter(t => t.id === tagId);
    return filteredTags[0].icon;
  };

  return (
    <div className="calendarBody">
      {todos.map((td: Todo) => (
        <div key={td.id} className="task">
                
          <div className="taskColor" style={{backgroundColor: 
                  updateTaskColor(td.todo, td.subtasks.length)}}>
          </div>

          <div className="taskBody" >
            <ul>
              <li style={{marginBottom: '0.1em'}}>
                {td.todo === true && td.subtasks.length === 0 
                  ? <input type="checkbox"/> 
                  : getIcon(td.tag)} {td.content}
              </li>

              {td.subtasks.length > 0
                ? td.subtasks.map(subt => 
                  <li key={subt.id}> <input type="checkbox"/>  {subt.content}</li>)
                : ''}

              {td.todo === true
                ? <li>⏰ 00:00</li>
                : ''}
            </ul>
          </div>
          <div style={{float: 'right', marginTop: '0.5em', width: 'auto'}}> ✏️ 🗑️</div> 
        </div>
      ))}

      <HomeTaskGroup title="Today"/>
      <HomeTaskGroup title="Tomorrow"/>
    </div>
  );
}

export default HomeTodos;