import * as React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../screens/Home';
import NoMatch from '../screens/NoMatch';
import Login from '../screens/Login';
import Register from '../screens/Register';
import MyModels from '../screens/Authenticated/MyModels';
import Logout from '../screens/Logout';
import ShowModel from '../screens/Authenticated/ShowModel';
import EditModel from '../screens/Authenticated/EditModel';

class App extends React.Component {

    componentDidMount() {
        console.log('component did mount');
    }

    render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/logout" component={Logout}/>

                <Route path="/models/new" component={EditModel}/>
                <Route path="/models/:id/edit" component={EditModel}/>
                <Route path="/models/:id" component={ShowModel}/>

                <Route path="/models" component={MyModels}/>

                {/*<Redirect from="/accounts" to="/users"/>*/}
                <Route component={NoMatch}/>
            </Switch>

        );
    }
}

export default App;
