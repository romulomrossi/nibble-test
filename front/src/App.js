import React from 'react';
import './App.css';
import AppRouter from "./component/Router";
import NavBar from "./component/Navbar";
import Container from '@material-ui/core/Container';

function App() {
    return (
        <div>
            <NavBar/>
            <Container>
                <AppRouter/>
            </Container>
        </div>
    );
}

export default App;