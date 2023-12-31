import '../css/Home.css';
import todoService from '../services/todoService';
import Todo from './Todo';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function HomeTodos({searchValue, filterValues, tags, todos, refreshTodos, handleTodoInEdit, timezone}: HomeTodoProps) {  
// Update color of the task based on it's type (note, to do, to do list)
  const updateTaskColor = (todo: boolean, subtasksLength: number) => {
    if (todo === true && subtasksLength > 0) {
      return '#86DEDE';
    } else if (todo === false) {
      return '#FABC2A';
    } else if (todo === true && subtasksLength === 0) {
      return '#FF7F53';
    }

    return '#86DEDE';
  };

  // Get icon by id
  const getIcon = (tagId: string) => {
    const filteredTags = tags.filter((t: Filter) => t.id === tagId);

    if (filteredTags[0] !== undefined) {
      return filteredTags[0].icon;
    }

    return '';
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
      await todoService.remove(id)
        .then(() => {
          console.log('Todo deleted: ', id);
          refreshTodos();
        }
        );
    } catch (error) {
      console.error('Error fetching data', error);
    }
    
    refreshTodos();
  };

  return (
    <div className="calendarBody">
      {window.innerWidth > 1400 &&
      <h1 style={{marginBottom: '0'}}>Todos</h1>
      }
      {todos.map((td: Todo) => 
        checkSearchValue(td) && checkFilter(td) && (
          <Todo
            key={td.id}
            td={td}
            updateTaskColor={updateTaskColor}
            getIcon={getIcon}
            getTime={getTime}
            deleteToDo={deleteTodo}
            handleTodoInEdit={handleTodoInEdit}
            refreshTodos={refreshTodos}/>
        )
      )}

      {todos.length === 0 &&
        <div style={{marginTop: '1.5em'}}>
        Nothing to see here, try making a new to do!
        </div>
      }
    </div>
  );
}

export default HomeTodos;