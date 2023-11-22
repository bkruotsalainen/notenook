function HomeTaskGroup(props: HomeTaskGroupProps) {
  return (
    <>
      <h2>{props.title}</h2>
    
      <div className="task">
        <div className="taskColor-yellow" ></div>
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

      <div className="task">
        <div className="taskColor-red" ></div>
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

      <div className="task">
        <div className="taskColor-green" ></div>
        <div className="taskBody">
          <ul>
            <li>
           👽 Play music
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
  );
}

export default HomeTaskGroup;