import { useEffect, useState } from 'react';
import '../css/Home.css';
import Api from '../ApiHandler';
import axios from 'axios';

function HomeTodos(props: HomeTodoProps) {  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tags, setTags] = useState<Filter[]>([]);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const todosResponse = await Api.get('http://localhost:3000/todos');
        const tagsResponse = await Api.get('http://localhost:3000/tags');
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

  const getTime = (unix: number): string => {
    const dateTime = new Date(unix);

    const date = dateTime.getDate() + '.' + dateTime.getMonth() + '.' + dateTime.getFullYear();
    const time = (dateTime.getHours() < 10 ? '0' : '') + dateTime.getHours() + ':' + 
    (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();

    return date + ' ' + time;
  };

  const checkSearchValue = (td: Todo) => {
    if (td.content.toLowerCase().includes(props.searchValue.toLowerCase())) {
      return true;
    }

    if (props.searchValue === '') {
      return true;
    }

    return false;
  };

  const deleteTodo = (id: string) => {
    const fetchData = async () => {
      try {
        const response = await axios.delete(`http://localhost:3000/todos/${id}`);
        console.log('Deleted' + response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  };
  
  return (
    <div className="calendarBody">
      {todos.map((td: Todo) => (
        
        checkSearchValue(td) && (
          <div key={td.id} className="task">
            <div className="taskColor" style={{backgroundColor: 
                  updateTaskColor(td.todo, td.subtasks.length)}}>
            </div>

            <div className="taskBody" >
              <ul>
                <li style={{marginBottom: '0.1em'}}>
                  {td.todo === true && td.subtasks.length === 0 
                    ? <input type="checkbox"/> 
                    : getIcon(td.tag)} <span style={{fontWeight: '500'}}>{td.content}</span>
                </li>

                {td.subtasks.length > 0
                  ? td.subtasks.map(subt => 
                    <li key={subt.id} className="subtask"> <input type="checkbox"/>  {subt.content}</li>)
                  : ''}

                {td.deadline === true
                  ? <li>⏰ {(td.doneBy) ? getTime(td.doneBy) : <i>error!</i>}</li>
                  : ''}
              </ul>
            </div>
            <div style={{float: 'right', marginTop: '0.5em', width: 'auto'}}> ✏️ <span onClick={() => deleteTodo(td.id)}>🗑️</span></div> 
          </div>
        )
      )
      )}
    </div>
  );
}

export default HomeTodos;