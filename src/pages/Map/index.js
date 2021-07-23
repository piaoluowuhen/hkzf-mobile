import React from 'react';
import './index.scss'
import { NavBar, Icon } from 'antd-mobile';
import axios from 'axios'

class Map extends React.Component {
    render(){
        return <div className='map'>
            {/* navbar */}
         <div>
           <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
            >百度地图</NavBar>
        </div>
        {/* 百度地图容器 */}
                 <div id="container"></div>
               </div>
    }

    componentDidMount(){

        // var map = new window.BMapGL.Map("container")
        // var point = new window.BMapGL.Point(116.404, 39.915)
        // map.centerAndZoom(point, 15)
    }
}

export default Map