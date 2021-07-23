import {BrowserRouter as Router, Route,Link, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import   Search  from './pages/Search'
import   Map  from './pages/Map'
function App() {
  return (
    <Router>
    <div className="App">
      <Route path='/' render={()=><Redirect to='/home'/>} ></Route>
      <Route path='/home' component={Home}></Route>
      <Route path='/city' component={CityList}></Route>
      <Route path='/search' component={Search}></Route>
      <Route path='/map' component={Map}></Route>
    </div>
    </Router>
  );

  
}

export default App;
