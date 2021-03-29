import { useEffect, useState } from 'react';
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Login from './Components/Login'
import Register from './Components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import DashboardScreen from './Screens/DashboardScreen';

function App(props) {
  const [state, setState] = useState({
    loggedIn: false,
    user: {}
  })
  
  const url_api = `https://dev.farizdotid.com/api/daerahindonesia`
  const URL_API = `http://localhost:8000`
  const [loading, setLoading] = useState(false)
  const Swal = withReactContent(MySwal)



  return (
    <>
    <Router>
      <Switch>
          <Route 
              exact 
              path='/'
              render={props=> (
                <Login {...props} data={state} setData={setState} />
                )}
                />

                 {/* Route Dashboard*/}
                  <Route path="/dashboard">
                    <DashboardScreen/>
                  </Route>

                   {/* Route Dashboard*/}
                   <Route path="/register">
                    <Register/>
                  </Route>
      </Switch>
</Router>
</>
  );
}

export default App;
