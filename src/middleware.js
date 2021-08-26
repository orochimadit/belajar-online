import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import ListVideoAdmin from './components/ListVideoAdmin';
const Middleware = ()=>{
    return(
        <Router>
            <Switch>
                <Route exact path="/" render={()=> <App/>}/>
                <Route exact path="/login-admin" render={()=> <Login/>}/>
                <Route exact path="/list-video-admin" render={()=> <ListVideoAdmin/>}/>
            </Switch>
        </Router>
    )
}

export default Middleware;