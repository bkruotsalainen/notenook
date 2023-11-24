function AddNewMemo(props: AddNewMemoProps) {  
  // Close popup
  const closePopup = () => {
    /* Find a way to reset form when popup is closed */
    props.handlePopUp();
  };
    
  return (
    <>
      <div className={(props.isOpen) ? 'addNewBackground' : 'hidden'}>
        <div className="addNewBase">
          <button type="button" className="closeForm floatRight" 
            onClick={() => closePopup()}>X</button>
          <p className="formTitle">Add new memo</p>

         
          {/* To do checkbox */}
          <form>
          
            <div className="marginTop" />

            <input className="addNewInput fullWidth" 
              placeholder="Title" />
            {/* To do content */}
            <textarea className="addNewInput fullWidth" 
              style={{height: '300px'}}
              placeholder="Write whatever you want!" />
            
            <div className="marginTop" />

            <button type="submit" 
              className="submitNew floatRight">Submit</button>
          </form>

        </div>
      </div>  
    </>
  );
}

export default AddNewMemo;