import { useEffect, useState } from 'react';
import userService from '../services/userService';
import axios from 'axios';

function Settings({isOpen, handleSettingsPopUp, timezone}: SettingsProps) {
  const [userTimezone, setUserTimezone] = useState<number>(timezone);
  const [timezones, setTimezones] = useState<Timezone[]>([]);

  useEffect( () => {
    const fetchData = async () => {
      await axios.get('http://localhost:3000/timezones').then((result) => {
        const timezoneArray: Timezone[]  = [];

        result.data.map((tz: Timezone) => {
          timezoneArray.push({id: tz.id, offset: tz.offset, text: tz.text});
        });

        setTimezones(timezoneArray);
      });
    };

    fetchData();
  }, 
  []);

  const closePopup = () => {
    handleSettingsPopUp();
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUser: User = {
      id: '1',
      email: 'user@sahkoposti.fi',
      password: 'salasana123',
      createdAt: 1701166315723 - timezone,
      timezone: userTimezone * 3600000
    };

    try {
      await userService.update('1', updatedUser).then(() => {
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