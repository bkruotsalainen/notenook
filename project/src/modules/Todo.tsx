import axios from 'axios';
import { useEffect, useState } from 'react';

function Todo({td, updateTaskColor, getIcon, getTime, deleteToDo, handleTodoInEdit, refreshTodos}: TodoProps) { 
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false); 
  const [subtaskStates, setSubtaskStates] = useState<boolean[]>(td.subtasks.map(() => false));


  useEffect(() => {
    setIsTaskDone(td.done);
    setSubtaskStates(td.subtasks.map((subt) => subt.done));
  }, [td]);

  const saveUpdatedTodo = async () => {
    const updatedTodo = { ...td, done: !td.done };
    try {
      const response = await axios.put(`http://localhost:3000/todos/${updatedTodo.id}`, updatedTodo);
      console.log('Todo updated:', response.data);
      refreshTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const saveUpdatedSubtask = async (subtaskId: string) => {
    const updatedTodo = {
      ...td,
      subtasks: td.subtasks.map((sb: Subtask, index: number) =>
        sb.id === subtaskId ? { ...sb, done: !subtaskStates[index] } : sb
      ),
    };

    try {
      const response = await axios.put(`http://localhost:3000/todos/${updatedTodo.id}`, updatedTodo);
      console.log('Subtask updated:', response.data);
      refreshTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const checkIfSubtasksDone = () => {
    const doneSubtasks = td.subtasks.filter(st => st.done);

    if (td.subtasks.length > 0 && doneSubtasks.length === td.subtasks.length) {
      console.log('All subtasks are done!');
      return true;
    }

    return false;
  };

  return (
    <>
      <i style={{fontSize: '0.7em'}}>
        {
          (td.createdAt !== td.editedAt) 
            ? 'Created ' + getTime(td.createdAt) + ', edited ' + getTime(td.editedAt)
            : 'Created at ' + getTime(td.createdAt)
        }
      </i>

      <div key={td.id} className="task">
        <div className="taskColor" style={{backgroundColor: 
        updateTaskColor(td.todo, td.subtasks.length)}}>
        </div>

        <div className="taskBody">
          <ul>
            <li style={{marginBottom: '0.1em'}}>
              {td.todo === true && td.subtasks.length === 0 
                ? <input type="checkbox" checked={isTaskDone} onChange={() => saveUpdatedTodo()} /> 
                :  getIcon(td.tag)} 
              <span style={{fontWeight: '500'}}> {td.content}</span>
            </li>

            {td.subtasks.length > 0
              ? td.subtasks.map((subt: Subtask, index: number) => (
                <li key={subt.id} className="subtask">
                  <input
                    type="checkbox"
                    checked={subtaskStates[index]}
                    onChange={() => saveUpdatedSubtask(subt.id)}
                  />
                  {subt.content}
                </li>
              ))
              : ''}

            {td.deadline === true
              ? ((td.done || checkIfSubtasksDone()) ? <li>😊 {getTime(td.doneBy)}</li> : <li>⏰ {getTime(td.doneBy)}</li>)
              : ''}

          </ul>
        </div>

        <div className="iconWrapper">
          <div className="icon" onClick={() => handleTodoInEdit(td)}>✏️</div>
          <div className="icon" onClick={() => deleteToDo(td.id)}>🗑️</div>
        </div> 

        <br />
      </div>
    </>
  );
}

export default Todo;