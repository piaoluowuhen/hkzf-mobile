import React from 'react';
import { Route } from 'react-router-dom';
import HomeIndex from './HomeIndex'
import News from '../News'
import List from '../List'
import   Profile  from '../Profile'
import { TabBar } from 'antd-mobile';
import './index.scss'

const arr = [{
  title:'首页',
  key:'/home',
  icon:'icon-ind'
},{
  title:'找房',
  key:'/home/list',
  icon:'icon-findHouse'
},{
  title:'资源',
  key:'/home/news',
  icon:'icon-infom'
},{
  title:'我的',
  key:'/home/profile',
  icon:'icon-my'
},]
class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: window.location.pathname,//url的变化就会触发componentDidUpdate钩子
        };
      }  
     componentDidUpdate(){
      //  console.log(this.state.selectedTab);
      this.setState({
        selectedTab:window.location.pathname
      })
     }
     renderTabbarItem(){
      return arr.map(item=>              
          <TabBar.Item
          title={item.title}
          key={item.key}
          icon={<i className={`iconfont ${item.icon}`}></i>
          }
          selectedIcon={<i className ={`iconfont ${item.icon}`}></i>
          }
          selected={this.state.selectedTab === item.key}              
          onPress={() => {
           this.props.history.push(item.key)
           this.setState({
            selectedTab: item.key,
          });
          }}
        />
)
      }
    render () {
        return (<div className='home'>
        <Route exact path='/home' component={HomeIndex}></Route>
        <Route path='/home/list' component={List}></Route>
        <Route path='/home/news' component={News}></Route>
        <Route path='/home/profile' component={Profile}></Route>

        {/*tabbar*/}
        
          <TabBar
            noRenderContent={true}
            unselectedTintColor="#949494"
            tintColor="#21b97a"
            barTintColor="white"
          >
            {this.renderTabbarItem()} 
          </TabBar>
        

        </div>)     
    }
}
export default Home