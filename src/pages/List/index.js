import React from 'react';
import HomeSearch from '../../components/HomeSearch'
import { NavBar, Icon } from 'antd-mobile';
import './index.scss'
class List extends React.Component {
     goback=(props)=>{
       this.props.history.push('/home')
      }
    render(){
    return <div className='list'>
        <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={this.goback}
      >
    <div className='top'><HomeSearch city='上海'></HomeSearch></div></NavBar>
        
    </div>
    }     
}

export default List