import React from 'react';
import { Toast } from 'antd-mobile';
import './index.scss'
import axios from '../../utils/axios'
import {getCity} from '../../utils'
import {AutoSizer,List} from 'react-virtualized';
import NavBarComponent from '../../components/headNavBar'

function switchFn(str){
    switch (str) {
        case '#':
            return '当前定位'
            break;  
            case 'hot':
                return '热门城市'
                break;  
        default:
              return str
            break;
    }
}
let hasCity = ['北京','上海','深圳','广州']
class CityList extends React.Component {
    constructor(props){
        super(props)
        this.state={
            citylist:{},
            citykey:[],
            key:0,
        }
        // 创建ref对象
        this.cityListComponent=React.createRef()
}
   async getCityList(){
         const {data:{body}} = await axios.get('/area/city?level=1')
         let obj = {}
         let arr = Object.keys(obj)
         body.forEach(item => {
             if(arr.indexOf(item.short.substring(0,1))!== -1){
                 obj[item.short.substring(0,1)].push(item)
             } else {
                 arr.push(item.short.substring(0,1))
                 obj[item.short.substring(0,1)]=[]
                 obj[item.short.substring(0,1)].push(item)
             }
         });
         arr = arr.sort()
         arr= arr.map(item=>{
          return item = item.toUpperCase()
         })
         arr. unshift('#','hot')
         console.log(arr);
         const{data,city}= await this.getHotCity()
         obj['hot']=data
         obj['#']=[city]
         this.setState({
            citykey:arr,
            citylist:obj
         })
    }
    async getHotCity (){
        const {data:{body}}=await axios.get('/area/hot')
        //当前定位城市
        let city =await getCity()
        return {
            data:body,city
        }
    }  
   async componentDidMount(){
       await this.getCityList()
       this.cityListComponent.current.measureAllRows()
    }
    // componentWillUnmount() {
    //     this.setState = ()=>false;
    // }
    //动态计算每一行的高度函数
    getHight=({index})=>{
        let number =  this.state.citylist[this.state.citykey[index].toLowerCase()].length
        return  (number*51 + 40)      
    }
    onRowsRendered=({startIndex})=>{
        if(this.state.key!==startIndex){
        this.setState({
            key:startIndex
        })}
    }
    //点击切换当前城市
    mapCity=(item)=>{
        console.log(item.label);
       if(hasCity.indexOf(item.label)!==-1){
           localStorage.setItem('hkzf_city', JSON.stringify(item))
           this.props.history.push('/home')
       }else {
       this.props.history.push('/home')
       Toast.info('只有北，上，广，深的房源', 2)
       }
    }   
    //渲染每一行数据的渲染函数
    rowRenderer=({
        key, // Unique key within array of rows
        index, // 索引号
        isScrolling, // 当前项是否正在滚动
        isVisible, // 当前项在list中可见
        style, // 一定要给每一行添加 作用 每一行的位置
      })=> {
        return (
          <div className='list' key={key} style={style}>
             <div className='index'>{switchFn(this.state.citykey[index])}</div>
             {
                 this.state.citylist[this.state.citykey[index].toLowerCase()].map(item=>{
                    return <div key={item.value} className='value' onClick={()=>{this.mapCity(item)}}>
                    {item.label}
                     </div>
                 })
                 }
          </div>
        );
      }
    renderRight(){
          return <ul className='right'>
              {this.state.citykey.map((item,index)=>
               ( <li key={item} onClick={()=>{this.cityListComponent.current.scrollToRow(index)}}>
                   <span className={this.state.key===index?'key-active':''}>{item==='hot'? '热' : item}</span>
                </li>)
                )}
          </ul>
    }
render(){
    return <div className='citylist'>
        {/* navbar */}
        <NavBarComponent>城市选择</NavBarComponent>
        {/* react-virtualized  list组件 */}
        <AutoSizer >
            {({height, width})=>{
                return <List
                ref={this.cityListComponent}               
                width={width}
                height={height}
                rowCount={this.state.citykey.length}
                rowHeight={this.getHight}
                rowRenderer={this.rowRenderer}
                onRowsRendered={this.onRowsRendered}
                scrollToAlignment='start'
                />
            }}
            </AutoSizer>
            {/* 右侧栏 */}
            {this.renderRight()}
    </div>
}
}

export default CityList