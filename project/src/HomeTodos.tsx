import { useEffect, useState } from "react";
import './css/Home.css'
import axios from "axios";
import HomeTaskGroup from "./HomeTaskGroup";

function HomeTodos() {  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tags, setTags] = useState<Filter[]>([]);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const todosResponse = await axios.get('http://localhost:3000/todos');
        const tagsResponse = await axios.get('http://localhost:3000/tags');
        setTodos(todosResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching data', error)
      }
    };

    fetchData();
  },
    []);

  const getIcon = (tagId: number) => {
    const filteredTags = tags.filter(t => t.id === tagId);
    return filteredTags[0].icon;
  }

  return (
      <div className="calendarBody">
        {todos.map((td: Todo) => (
              <div className="task">
                <div className="taskColor-yellow" ></div>
                <div className="taskBody">
                <ul>
                    <li style={{marginBottom: "0.1em"}}>
                    {td.todo === true && td.subtasks.length > 0 ? <input type="checkbox"/> : getIcon(td.tag)} {td.content}
                    </li>

                    {td.subtasks.length > 0
                    ? td.subtasks.map(subt => <li key={subt.id}> <input type="checkbox"/>  {subt.content}</li>)
                    : ""}

                    {td.todo === true
                    ? <li>⏰ 00:00</li>
                    : ""}
                  </ul>
                </div>   
              </div>
        ))}

        <HomeTaskGroup title="Today"/>
        <HomeTaskGroup title="Tomorrow"/>
      </div>
  )
}

export default HomeTodos