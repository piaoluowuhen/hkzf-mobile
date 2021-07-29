import React from 'react';
import HomeSearch from '../../components/HomeSearch'
import { NavBar, Icon } from 'antd-mobile';
import Filter from './components/Filter'
import './index.scss'
class List extends React.Component {
  state={
   city : JSON.parse(localStorage.getItem('hkzf_city'))
  }
     goback=(props)=>{
       this.props.history.push('/home')
      }
    render(){
    return <div className='list'>
      {/* 头部导航栏 */}
        <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={this.goback}
      ><div className='top'><HomeSearch city={this.state.city.label}></HomeSearch></div></NavBar>
      {/* 筛选栏 */}
      <Filter></Filter>
        
    </div>
    }  
 
}

export default List