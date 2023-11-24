import { useEffect, useState } from 'react';
import '../css/Home.css';
import Api from '../ApiHandler';
import axios from 'axios';
import Todo from './Todo';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
  
const timezone = 7200000;

function HomeTodos({searchValue, filterValues}: HomeTodoProps) {  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tags, setTags] = useState<Filter[]>([]);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const todosResponse = await Api.get('http://localhost:3000/todos');
        const tagsResponse = await Api.get('http://localhost:3000/tags');
        const sortedData = todosResponse.data.sort((a: Todo, b: Todo) => 
          new Date(a.doneBy) < new Date(b.doneBy) ? 1 : -1);
        setTodos(sortedData);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  },
  []);
  
  // Update color of the task based on it's type (note, to do, to do list)
  const updateTaskColor = (todo: boolean, subtasksLength: number) => {
    if (todo === true && subtasksLength > 0) {
      return '#86DEDE';
    } else if (todo === false) {
      return '#FABC2A';
    } else if (todo === true && subtasksLength === 0) {
      return '#F05365';
    }

    return '#86DEDE';
  };

  // Get icon by id
  const getIcon = (tagId: string) => {
    const filteredTags = tags.filter(t => t.id === tagId);
    return filteredTags[0].icon;
  };

  // Get string time from unix
  const getTime = (unix: number): string => {
    const dateTime = new Date(unix + timezone);

    const date = dateTime.getDate() + ' ' + months[dateTime.getMonth()] 
    + ' ' + dateTime.getFullYear();

    const time = (dateTime.getHours() < 10 ? '0' : '') + (dateTime.getHours()) + ':' + 
    (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();

    return date + ' ' + time;
  };

  // Check if search matches with content
  const checkSearchValue = (td: Todo) => {
    if (td.content.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }

    const matchingSubtasks = td.subtasks.filter(sb => 
      (sb.content.toLowerCase().includes(searchValue.toLowerCase())));

    if (matchingSubtasks.length > 0) {
      return true;
    }

    if (searchValue === '') {
      return true;
    }

    return false;
  };

  // Check if tag matches with filter
  const checkFilter = (td: Todo) => {
    if (filterValues.length === 0) {
      return true;
    }

    const findTag = filterValues.filter(filter => filter === td.tag);
    if (findTag.length > 0) {
      return true;
    }

    return false;
  };

  // Delete to do
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      const newTodos = todos.filter(td => td.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div className="calendarBody">
      {todos.map((td: Todo) => 
        checkSearchValue(td) && checkFilter(td) && (
          <Todo key={td.id} td={td} updateTaskColor={updateTaskColor}
            getIcon={getIcon} getTime={getTime} deleteToDo={deleteTodo}/>
        )
      )}
    </div>
  );
}

export default HomeTodos;