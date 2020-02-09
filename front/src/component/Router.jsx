import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListCustomersComponent from "./customers/List";
import AddCustomerComponenet from "./customers/Add";
import EditCustomerComponent from "./customers/Edit";
import React from "react";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact component={ListCustomersComponent} />
                        <Route path="/users" component={ListCustomersComponent} />
                        <Route path="/add-user" component={AddCustomerComponenet} />
                        <Route path="/edit-user" component={EditCustomerComponent} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;