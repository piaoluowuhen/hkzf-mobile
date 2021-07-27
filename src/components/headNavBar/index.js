import { NavBar, Icon } from 'antd-mobile';
import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types'
export default function NavBarComponent (props){
    NavBarComponent.propTypes={
        children:PropTypes.string.isRequired,
        pushTo:PropTypes.func
     }
    const history = useHistory()
    const goback=()=>{
      return  history.go(-1)
    }
    return  <NavBar
            className='navbar'
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={props.pushTo || goback}
            >{props.children}</NavBar>
}