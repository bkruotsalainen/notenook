// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TaskGroup(props: any) {

  return (
    <>
    <h2>{props.title}</h2>

    <div className="task taskColor-yellow">
      <div className="taskBody">
      <ul>
          <li>
            🧼 Wash dishes
          </li>
          <li>
            ⏰ 00:00
          </li>
        </ul>
      </div>   
    </div>

    <br></br>

    <div className="task taskColor-red">
      <div className="taskBody">
      <ul>
          <li>
            <input type="checkbox"/>
             Have a party!
          </li>
        </ul>
      </div>   
    </div> 

    
    <br></br>

    <div className="task taskColor-green">
      <div className="taskBody">
      <ul>
          <li>
            🎵 Play music
          </li>
          <li>
            <input type="checkbox"/>
            Pick a good artist
          </li>
          <li>
            <input type="checkbox"/>
            Pick a good song
          </li>
        </ul>
      </div>   
    </div> 
    </>
  )
}

export default TaskGroup