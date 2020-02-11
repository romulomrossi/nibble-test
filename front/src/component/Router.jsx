import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Customers from "./Customers";
import React from "react";
import Box from '@material-ui/core/Box';

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Box m={1}> 
                                <Customers /> 
                            </Box>
                        </Route>
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;