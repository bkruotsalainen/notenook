function Todo(props: TodoProps) { 
  return (
    <>
      <i style={{fontSize: '0.7em'}}>Posted {props.getTime(props.td.createdAt)}</i>
      <div key={props.td.id} className="task">
        <div className="taskColor" style={{backgroundColor: 
        props.updateTaskColor(props.td.todo, props.td.subtasks.length)}}>
        </div>

        <div className="taskBody">
          <ul>
            <li style={{marginBottom: '0.1em'}}>
              {props.td.todo === true && props.td.subtasks.length === 0 
                ? <input type="checkbox"/> 
                : props.getIcon(props.td.tag)} 
              <span style={{fontWeight: '500'}}> {props.td.content}</span>
            </li>

            {props.td.subtasks.length > 0
              ? props.td.subtasks.map((subt: Subtask) => 
                <li key={subt.id} className="subtask"> <input type="checkbox"/>  {subt.content}</li>)
              : ''}


            {props.td.deadline === true
              ? <li>⏰ {(props.td.doneBy) ? props.getTime(props.td.doneBy) : <i>error!</i>}</li>
              : ''}

          </ul>
        </div>
        <div style={{float: 'right', marginTop: '0.5em', width: 'auto'}}>
       ✏️ 
          <span onClick={() => props.deleteToDo(props.td.id)}>🗑️</span>

          <br />
        </div> 
      </div>
    </>
  );
}

export default Todo;