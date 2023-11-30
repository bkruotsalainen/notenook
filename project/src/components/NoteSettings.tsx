function TodoSettings({handleNoteInEdit, note, handleDeleteClick}: NoteSettingsProps)  {
  return (
    <>    
      <div className="iconWrapper">
        <div className="icon" onClick={() => handleNoteInEdit(note)}>✏️</div>
        <div className="icon" onClick={() => handleDeleteClick(note.id)}>🗑️</div>
      </div> 
    </>
  );
}

export default TodoSettings;