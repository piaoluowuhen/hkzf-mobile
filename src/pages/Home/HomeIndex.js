import React from 'react';
import { Carousel,Flex,WingBlank } from 'antd-mobile';
import axios from '../../utils/axios'
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
import './homeindex.scss'
import {getCity} from '../../utils'

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
        news:[],
        city:'上海',
        cityId:''
      }
  
     async getSwiperData(){
        const {data:{body}} = await axios.get('/home/swiper')   
        this.setState({
            swipers:body,
            isSwiperLoad:true,
        })
        // console.log(this.state.swipers);
      }
      async getGroups(){
        const {data:{body}} = await axios.get('/home/groups',{params:{area:'AREA%7C88cff55c-aaa4-e2e0'}})   
        this.setState({
            groups:body,
        })
        // console.log(this.state.groups);
      }
    async getNews(){
      const {data:{body}} = await axios.get('/home/news',{params:'area=AREA%7C88cff55c-aaa4-e2e0'})   
      this.setState({
          news:body,
      })
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
      renderNews(){
        return this.state.news.map(item=>
          <Flex className='newsitem'  key={item.id}>
            <Flex.Item className='img'><img src={`http://localhost:8080${item.imgSrc}`}></img></Flex.Item>
            <Flex.Item className='text'>
            <div>
              <div className='title'>{item.title}</div>
            </div>
            <span className='left'>{item.date}</span>
            <span className='right'>{item.from}</span>
          </Flex.Item>
          </Flex>
          )
      }
      renderSearch(){
        return (<div className='a'><Flex  justify='between'>
          <Flex.Item className='l'>
            <Flex>
            <Flex.Item className='l2' onClick={()=>this.props.history.push('/citylist')}>
            <Flex>
            <div className='address'>{this.state.city}</div><i className='iconfont icon-arrow'></i>  |
            </Flex>
            </Flex.Item>
            <Flex.Item className='r2' onClick={()=>this.props.history.push('/search')}>
            <div>点击搜索</div>
            </Flex.Item>
            </Flex>
          </Flex.Item>
          <Flex.Item className='r' onClick={()=>this.props.history.push('/map')}><i className='iconfont icon-map'></i></Flex.Item>
        </Flex></div>)

      }
     async componentDidMount(){
        this.getSwiperData()
        this.getGroups()
        this.getNews()
        let city =await getCity()
          this.setState({
              city:city.label,
              cityId:city.value
          })
          
    }  
    render(){
       return <div className='homeindex'>
        <div className='swiper' style={{height:212}}>
          {/* 搜索 */}
          <div className='search'>{this.renderSearch()}</div>
          {this.state.isSwiperLoad?<Carousel autoplay infinite>{this.renderSwipersFn()}</Carousel>:''}</div>
            {/* nav */}
        <Flex className='nav'>{this.renderNavData()}</Flex>
            {/* groups */}
        <div className='groups'> 
        <Flex justify='between'> 
        <span className='lefttext'>租房小组</span><span className='righttext'>更多</span>
        </Flex>
        <div className='group'>{this.renderGroups()}</div>       
        </div>
        {/* news */}
        <div className='news'>
          <h3>推荐选择</h3>
          <div>{this.renderNews()}</div>

        </div>
    </div>
}
}

export default HomeIndex