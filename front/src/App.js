import React from 'react';
import './App.css';
import AppRouter from "./component/Router";
import NavBar from "./component/Navbar";

function App() {
    return (
        <div>
            <NavBar/>
                <AppRouter/>
        </div>
    );
}

export default App;