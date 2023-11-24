function Todo({td, updateTaskColor, getIcon, getTime, deleteToDo, handleTodoInEdit}: TodoProps) { 
  return (
    <>
      <i style={{fontSize: '0.7em'}}>Posted {getTime(td.createdAt)}</i>
      <div key={td.id} className="task">
        <div className="taskColor" style={{backgroundColor: 
        updateTaskColor(td.todo, td.subtasks.length)}}>
        </div>

        <div className="taskBody">
          <ul>
            <li style={{marginBottom: '0.1em'}}>
              {td.todo === true && td.subtasks.length === 0 
                ? <input type="checkbox"/> 
                :  getIcon(td.tag)} 
              <span style={{fontWeight: '500'}}> {td.content}</span>
            </li>

            {td.subtasks.length > 0
              ? td.subtasks.map((subt: Subtask) => 
                <li key={subt.id} className="subtask"> <input type="checkbox"/>  {subt.content}</li>)
              : ''}

            {td.deadline === true
              ? <li>⏰ {(td.doneBy) ? getTime(td.doneBy) : <i>error!</i>}</li>
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