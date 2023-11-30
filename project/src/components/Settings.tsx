import { useEffect, useState } from 'react';
import userService from '../services/userService';
import timezoneService from '../services/timezoneService';

function Settings({user, isOpen, handleSettingsPopUp, timezone, refreshMemos, refreshTodos}: SettingsProps) {
  const [userTimezone, setUserTimezone] = useState<number>(timezone);
  const [timezones, setTimezones] = useState<Timezone[]>([]);

  useEffect( () => {
    const fetchData = async () => {
      const response = await timezoneService.getAll();
      setTimezones(response);
    };

    fetchData();
  }, 
  []);

  const closePopup = () => {
    handleSettingsPopUp();
    refreshMemos();
    refreshTodos();
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Find way to do this without having to pass whole user from Home?
    const updatedUser: User = { ...user,
      timezone: userTimezone * 3600000
    };

    try {
      await userService.update(user.id, updatedUser).then(() => {
        setUserTimezone(userTimezone);
        closePopup();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={(isOpen) ? 'addNewBackground' : 'hidden'}>
      <div className="addNewBase">
        <div className="addNewHeader">
          <p className="formTitle">Settings</p> 
        
          <button type="button" className="closeForm floatRight" onClick={() => closePopup()}>X</button>
        </div>
        <div className="addNewBody">
          <div className="addNewForm">
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <label>Timezone
                <select className="addNewInput fullWidth" onChange={(e) => setUserTimezone(parseFloat(e.currentTarget.value))}>
                  {timezones.map((tz, index) => {
                    return <option key={index} value={tz.offset}>{tz.text}</option>;
                  })}
                </select>
              </label>

              <button type="submit" 
                className="submitNew floatRight">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;