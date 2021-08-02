import {BrowserRouter as Router, Route,Link, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import   Search  from './pages/Search'
import   Map  from './pages/Map'
// 房源详情组件
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Registe from './pages/Registe'
function App() {
  return (
    <Router>
    <div className="App">
      <Route path='/' render={()=><Redirect to='/home'/>} ></Route>
      <Route path='/home' component={Home}></Route>
      <Route path='/citylist' component={CityList}></Route>
      <Route path='/search' component={Search}></Route>
      <Route path='/map' component={Map}></Route>
      {/* 房源详情的路由规则： */}
      <Route path="/detail/:id" component={HouseDetail} />
      <Route path="/login" component={Login} />
      <Route path="/registe" component={Registe} />
    </div>
    </Router>
  );

  
}

export default App;
