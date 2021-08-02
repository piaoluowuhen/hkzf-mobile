import React from 'react';
import './index.scss'
import NavBarComponent from '../../components/headNavBar'
import axios from '../../utils/axios'
import { Flex,Toast } from 'antd-mobile';

class Map extends React.Component {
     state={
         city:JSON.parse(localStorage.getItem('hkzf_city')),
         haoseData:[],
         msg:false,
         msgData:[]
     }
    render(){
        return <div className='map'>
            {/* navbar */}       
         <NavBarComponent>百度地图</NavBarComponent>        
        {/* 百度地图容器 */}
        <div id="container"></div>
        {/* 房源具体信息 */}
        {this.state.msg===true?(<div className='houseMsg'>{this.renderMsg()}</div>): ''}
        </div>
        
    }
    renderMsg(){                
        return  <div >
            <div className='top'>
            <Flex justify='between'>
                <span className='l'>房屋列表</span>
                <span className='r'>更多房源</span>
            </Flex>
            </div>
            { this.state.msgData.map(item=>
            <Flex className='item' align='start' key={item.houseCode} onClick={()=>{this.props.history.push(`/detail/${item.houseCode}`)}}>
              <Flex.Item className='img'><img src={`http://localhost:8080${item.houseImg}`}></img></Flex.Item>
              <Flex.Item className='text'>             
              <div className='title'>{item.title}</div>            
              <div className='desc'>{item.desc}</div>
              <span className='tags'>{item.tags}</span>
              <div className='price'>{item.price}元/月</div>
              </Flex.Item>
            </Flex>
            )}</div>
    }
   async getHouse(id){
        const {data:{body}}=await axios.get('/area/map',{params:{id}})
        console.log(body);
        return body
    }
    async getHouseMsg(id){
        const {data:{body:{list}}}=await axios.get(`/houses?cityId=${id}`)
        console.log(list);
        return list
    }
    mapInit=()=>{
        let that = this
        const{label,value}=JSON.parse(localStorage.getItem('hkzf_city'))
        // 创建地图实例
        // 位于BMapGL命名空间下的Map类表示地图，通过new操作符可以创建一个地图实例。其参数可以是元素id也可以是元素对象。
        var map = new window.BMapGL.Map("container")
        // 正/逆地址解析
        //创建地址解析器实例
        var myGeo = new window.BMapGL.Geocoder();
        var opts = {
            offset: new window.BMapGL.Size(80,16)
        }
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(label, function(point){
            if(point){
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                var scaleCtrl = new window.BMapGL.ScaleControl(opts);  // 添加比例尺控件
                map.addControl(scaleCtrl);
                var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
                map.addControl(zoomCtrl);
                var cityCtrl = new window.BMapGL.CityListControl();  // 添加城市列表控件
                that.renderMapText(map,that.state.haoseData,11)//渲染文本覆盖物
                map.addControl(cityCtrl);
                map.addEventListener('movestart',()=>{
                    that.setState({
                        msg:false
                    })
                })
            }else{
                alert('您选择的地址没有解析到结果！');
            }
        }, label)
        // 设置中心点坐标
        // 这里我们使用BMapGL命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
        // var point = new window.BMapGL.Point(116.404, 39.915)
        // 地图初始化，同时设置地图展示级别
        // 在创建地图实例后，我们需要对其进行初始化，BMapGL.Map.centerAndZoom()方法要求设置中心点坐标和地图级别。 地图必须经过初始化才可以执行其他操作
        // map.centerAndZoom(point, 15)
    }
    renderMapText(map,arr,number){       
        let that = this
        arr.forEach(item => {        
        let point = new window.BMapGL.Point(item.coord.longitude, item.coord.latitude)
        map.centerAndZoom(point, number);//地图缩放级别
        let labelmap = new window.BMapGL.Label('', {       // 创建文本标注
            position: point,
            offset: new window.BMapGL.Size(10, 20)
        })  
        if(number===15){
            labelmap.setContent(`<div class='maptext'>
        ${item.label}
        ${item.count}套
        </div>`)
        map.addOverlay(labelmap);                        // 将标注添加到地图中
        labelmap.setStyle({                              // 设置label的样式
            backgroundColor: '#009E67',
            color: '#fff',
            // width: '120px',
            height: '30px',
            border: 'none'
        })
        }else{
        labelmap.setContent(`<div class='maptext'>
        <p>${item.label}<p>
        <p>${item.count}套<p>
        </div>`)
        map.addOverlay(labelmap);                        // 将标注添加到地图中
        labelmap.setStyle({                              // 设置label的样式
            backgroundColor: '#009E67',
            border: '2px solid #fff',
            color: '#fff',
            width: '60px',
            height: '60px',
            borderRadius: '30px'
        })
    }
        labelmap.addEventListener("click",async function(){  
            // console.log("您点击了"+item.label); 
            Toast.loading('Loading...', 0)
               if(number===11){
                let twoHouse =await that.getHouse(item.value)
                map.clearOverlays()//清除地图上所有覆盖物
                that.renderMapText(map,twoHouse,13) 
               }else if (number===13){
                let twoHouse =await that.getHouse(item.value)
                map.clearOverlays()//清除地图上所有覆盖物
                that.renderMapText(map,twoHouse,15) 
               }else {
                // console.log(item);
                let point = new window.BMapGL.Point(item.coord.longitude, item.coord.latitude)
                map.panTo(point)
                map.panBy(0,-240)
                let msgData  =await that.getHouseMsg(item.value)
                that.setState({
                    msg:true,
                    msgData:msgData
                })
               }
               Toast.hide()
        });
    });
    }
   async componentDidMount(){
       console.log(this.state.city.value);
       let data=await this.getHouse(this.state.city.value)
        this.setState({
            haoseData:data
        })
        this.mapInit()
    }
}

export default Map