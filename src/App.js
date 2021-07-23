import {BrowserRouter as Router, Route,Link, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
function App() {
  return (
    <Router>
    <div className="App">
      <Route path='/' render={()=><Redirect to='/home'/>} ></Route>
      <Route path='/home' component={Home}></Route>
      <Route path='/city' component={CityList}></Route>
    </div>
    </Router>
  );

  
}

export default App;
