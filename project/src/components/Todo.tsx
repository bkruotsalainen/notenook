import { useEffect, useState } from 'react';
import todoService from '../services/todoService';
import NoteSettings from './NoteSettings';

function Todo({td, updateTaskColor, getIcon, getTime, deleteToDo, handleTodoInEdit, refreshTodos}: TodoProps) { 
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false); 
  const [subtaskStates, setSubtaskStates] = useState<boolean[]>(td.subtasks.map(() => false));
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setIsTaskDone(td.done);
    setSubtaskStates(td.subtasks.map((subt) => subt.done));
  }, [td]);

  const saveUpdatedTodo = async () => {
    const updatedTodo = { ...td, done: !td.done };
    try {
      await todoService.update(td.id, updatedTodo).then(() => {
        refreshTodos();
      });
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
      await todoService.update(td.id, updatedTodo).then(() => {
        refreshTodos();
      });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const checkIfSubtasksDone = () => {
    const doneSubtasks = td.subtasks.filter(st => st.done);

    if (td.subtasks.length > 0 && doneSubtasks.length === td.subtasks.length) {
      return true;
    }

    return false;
  };  
  
  const handleDeleteClick = (id: string) => {
    deleteToDo(id);
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

      <div key={td.id} className="task" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}> 
        <div className="taskColor" style={{backgroundColor: 
          updateTaskColor(td.todo, td.subtasks.length)}}>
        </div>

        <div className="taskBody">
          <div className="taskContent">
            <div className="taskIcon">
              {td.todo === true && td.subtasks.length === 0 
                ? <input type="checkbox" checked={isTaskDone} onChange={() => saveUpdatedTodo()} /> 
                :  getIcon(td.tag)} 
            </div>
            <span style={{color: '#3F665A', fontWeight: '600'}}> {td.content}</span>
          </div>
              

          {td.subtasks.length > 0
            ? td.subtasks.map((subt: Subtask, index: number) => (
              
              <div key={subt.id} className="taskContent">
                <div className="taskIcon"> 
                  <input
                    type="checkbox"
                    checked={subtaskStates[index]}
                    onChange={() => saveUpdatedSubtask(subt.id)}
                  />
                </div>
                {subt.content}
              </div>
            ))
            : ''}

          {td.deadline === true
            ? ((td.done || checkIfSubtasksDone()) 
              ? <div className="taskContent"><div className="taskIcon">😊</div> {getTime(td.doneBy)}</div>
              : <div className="taskContent"><div className="taskIcon">⏰</div> {getTime(td.doneBy)}</div>)
            : ''}

        </div>

        { (hover || window.innerWidth < 1000) &&
        <NoteSettings handleNoteInEdit={handleTodoInEdit} 
          handleDeleteClick={handleDeleteClick} note={td} />
        }
        <br />
      </div>
    </>
  );
}

export default Todo;