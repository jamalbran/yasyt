import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { findAllUser } from './services/user-service';
// import { User } from './entities/user.entity';

function App() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await findAllUser();
        console.log(users);
      } catch (error) {
        console.error('error fetching', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> 
      </header>
    </div>
  );
}

export default App;
