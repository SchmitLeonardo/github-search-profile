import React, { useState, useEffect } from 'react';
import './App.scss';
import api from './services/api';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { SearchInput } from './components/SearchInput';
import { Error } from './components/Error';
import { User } from './components/User';
import { Loader } from './components/Loader';
import axios from 'axios';

export default function App() {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('DARK_MODE')));
  const [user, setUser] = useState('');
  const [error, setError] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('DARK_MODE', true);
  }, [])

  /**
* Search user info
* 
* @param {*} userName 
*/
  function handleGetUser(userName) {
    setSpinner(true);
    api
      .get("/users/" + userName, {
        'headers': {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token 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`
        }
      })
      .then((response) => {
        setUser(response.data);
        setSpinner(false);
      })
      .catch(() => {
        setError(true);
        setSpinner(false);
      });
  }

  /**
   * Change system theme
   * 
   */
  function handleModeChange() {
    if (theme) {
      document.getElementById('App').classList.add('light-mode');
    } else {
      document.getElementById('App').classList.remove('light-mode');
    }

    setTheme(!theme);
    localStorage.setItem('DARK_MODE', !theme);
  }

  return (
    <div id="App">
      <Navbar onClick={handleModeChange} theme={theme} />
      <section className="content">
        <SearchInput
          userInfo={event => setSearch(event.target.value)}
          getUser={event => {
            if (event.key === 'Enter') {
              handleGetUser(event.target.value);
            }
          }}
          search={() => { handleGetUser(search) }}
        />
        {
          spinner ? <Loader /> : error ? <Error /> : (
            <div>
              {
                user && (
                  <User user={user} />
                )
              }
            </div>
          )
        }
      </section>
      <Footer />
    </div>
  );
}
