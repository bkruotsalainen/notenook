import todoService from '../services/todoService';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function EditTodo({ isOpen, handleTodoInEdit, todoInEdit, refreshTodos, tags, timezone }: EditTodoProps) {
  const [content, setContent] = useState<string>(todoInEdit?.content || '');

  const [doneBy, setDoneBy] = useState<number>(todoInEdit?.doneBy || Date.now());

  const [deadlineChecked, setDeadlineChecked] = useState<boolean>(todoInEdit?.deadline || false);
  const [todoChecked, setTodoChecked] = useState<boolean>(todoInEdit?.todo || false);

  const [subtasks, setSubtasks] = useState<Subtask[]>(todoInEdit?.subtasks || []);
  
  const [activeTag, setActiveTag] = useState<string>(todoInEdit?.tag || '1');

  useEffect(() => {
    if (todoInEdit === undefined) return;
    setDeadlineChecked(todoInEdit.deadline);
    setContent(todoInEdit.content);
    setActiveTag(todoInEdit.tag);
    setTodoChecked(todoInEdit.todo);
    setSubtasks(todoInEdit.subtasks);
    setDoneBy(todoInEdit.doneBy);
  }, [todoInEdit]);

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
  const closePopup = () => {
    handleTodoInEdit(todoInEdit);
  };

  const handleTagSelection = (id: string) => {
    setActiveTag(id);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTodo = { 
      id: todoInEdit.id,
      userId: todoInEdit.userId,
      createdAt: todoInEdit.createdAt - timezone,
      editedAt: new Date().getTime() - timezone,
      doneBy: doneBy - timezone,
      content: content,
      subtasks: subtasks,
      repeatInterval: todoInEdit.repeatInterval,
      todo: todoChecked,
      deadline: deadlineChecked,
      done: todoInEdit.done,
      tag: activeTag
    };

    try {
      const response = await todoService.update(updatedTodo.id, updatedTodo);
      console.log('Todo updated:', response.data);
      closePopup();
      refreshTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  function removeSubtask(id: string): void {
    const newSubtasks = subtasks.filter((st: Subtask) => st.id !== id);
    setSubtasks(newSubtasks);
  }
  
  function addSubtask(e: React.MouseEvent): void {
    e.preventDefault();
    const newSubtask: Subtask = {
      id: uuidv4(),
      content: '',
      done: false
    };
    setSubtasks([...subtasks, newSubtask]);
  }

  return (
    <div className={(isOpen) ? 'addNewBackground' : 'hidden'}>
      <div className="addNewBase">
        <div className="addNewHeader">
          <p className="formTitle">Edit todo</p> 
          
          <center>
            {tags.map((f: Filter) => 
            {
              return <div key={f.id} style={f.id !== activeTag ? filterStyle : activeFilterStyle}
                onClick={() => handleTagSelection(f.id)}>{f.icon}</div>;
            }
            )}
          </center>

          <button type="button" className="closeForm floatRight" onClick={() => closePopup()}>X</button>
        </div>

        <div className="addNewBody">
          <div className="addNewForm">

            <br />

            {/* To do checkbox */}
            <form onSubmit={handleFormSubmit}>
              <label>
                <input type="checkbox" className="addNewInput" 
                  checked={todoChecked}
                  onChange={() => setTodoChecked(!todoChecked)}/> 
                To do
              </label>
          
              <div className="marginTop" />

              {/* To do content */}
              <input className="addNewInput fullWidth"
                placeholder="What you need to do?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
                                
              {(todoChecked) ? <div className="marginTop" /> : ''}

              {/* Subtasks */}
              {todoChecked && subtasks.map((st, index) => (
                <div key={st.id} style={{textAlign: 'right'}}>
                  <input style={{width: '85%', border: '1px solid black'}} 
                    key={index}
                    className="addNewInput fullWidth"
                    value={subtasks[index].content}
                    onChange={(e) => {
                      const newSubtasks = [...subtasks];
                      newSubtasks[index].content = e.target.value;
                      setSubtasks(newSubtasks);
                    }}/>

                  <span className="deleteSubtask" 
                    onClick={() => removeSubtask(st.id)}>
            🗑️</span>
                </div>
              ))}

              {(todoChecked) 
                ? <button type="button" 
                  className="addSubtask fullLength" 
                  onClick={(e) => addSubtask(e)}>
                  {subtasks.length > 0 
                    ? 'Add another subtask!' 
                    : 'Add subtask!'}</button> 
                : ''}

              <div className="marginTop" />

              {/* To do date */}
              <label>
          Date
                <input
                  type="datetime-local"
                  className="addNewInput fullWidth" 
                  onChange={(e) => setDoneBy(Date.parse(e.target.value))}
                />
              </label>

              {/* To do deadline checkbox */}
              <label>
                <input type="checkbox" className="addNewInput"  checked={deadlineChecked} 
                  onChange={() => setDeadlineChecked(!deadlineChecked)}/> 
            Add deadline
              </label>

              <div className="marginTop" />

              <button type="submit" 
                className="submitNew floatRight">Submit</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;