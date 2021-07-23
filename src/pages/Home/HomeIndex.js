import React from 'react';
import { Carousel,Flex } from 'antd-mobile';
import axios from 'axios'
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
import './homeindex.scss'
let navData = [{
    id:1,
    img:nav1,
    text:'整租',
    path:'/home/list'
},{
    id:2,
    img:nav2,
    text:'合租',
    path:'/home/list'
},{
    id:3,
    img:nav3,
    text:'地图找房',
    path:'/map'
},{
    id:4,
    img:nav4,
    text:'去出租',
    path:'/rent'
},]
class HomeIndex extends React.Component {
    state = {
        swipers:[],
        isSwiperLoad:false,
        groups:[],
      }
     async getSwiperData(){
        const {data:{body}} = await axios.get('http://localhost:8080/home/swiper')   
        this.setState({
            swipers:body,
            isSwiperLoad:true,
        })
        // console.log(this.state.swipers);
      }
      async getGroups(){
        const {data:{body}} = await axios.get('http://localhost:8080/home/groups',{params:'area=AREA%7C88cff55c-aaa4-e2e0'})   
        this.setState({
            groups:body,
        })
        console.log(this.state.groups);
      }
      renderSwipersFn(){
          return this.state.swipers.map(val => (
            <a
              key={val.id}
              href="http://www.aitcast.cn"
              style={{ display: 'inline-block', width: '100%', height: 212 }}
            >
              <img
                src={`http://localhost:8080${val.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top',height: '100%' }}
              />
            </a>
          ))
      }
      renderNavData(){
          return navData.map(item=>(
            <Flex.Item key={item.id} onClick={()=>{this.props.history.push(item.path)}}>
            <Flex direction='column' >
                <img src={item.img}></img>
                <span>{item.text}</span>
            </Flex>
            </Flex.Item>
           ) )
      }
      renderGroups(){
          return this.state.groups.map(item=>
            <span  key={item.id} className='groupsitem' >
                <Flex justify='between'>
                <span><div className='goupsl' >{item.title}</div><div className='goupsr'>{item.desc}</div></span>
                <img style={{width:48}} src={`http://localhost:8080${item.imgSrc}`}></img>
                </Flex>
            </span>       
        )
      }
    componentDidMount(){
        this.getSwiperData()
        this.getGroups()
    }  
    render(){
       return <div className='homeindex'>
           {/* 轮播 */}
        <div style={{height:212}}>{this.state.isSwiperLoad?<Carousel autoplay infinite>{this.renderSwipersFn()}</Carousel>:''}</div>
            {/* nav */}
        <Flex className='nav'>{this.renderNavData()}</Flex>
            {/* groups */}
        <div className='groups'> 
        <Flex justify='between'> 
        <span className='lefttext'>租房小组</span><span className='righttext'>更多</span>
        </Flex>
        <div className='group'>{this.renderGroups()}</div>
        
        </div>
    </div>
}
}

export default HomeIndex