import React from 'react';
import HomeSearch from '../../components/HomeSearch'
import { NavBar, Icon,Flex } from 'antd-mobile';
import Filter from './components/Filter'
import './index.scss'
import axios from '../../utils/axios'
import {AutoSizer,List,WindowScroller,InfiniteLoader} from 'react-virtualized';

let def = {cityId: JSON.parse(localStorage.getItem('hkzf_city')).value, area: "null", mode: "null", price: "null", more: "null",start:1,end:20}
class ListSelect extends React.Component {
  state={
   city : JSON.parse(localStorage.getItem('hkzf_city')),
   list:[],
   count:null
  }
    goback=(props)=>{
       this.props.history.push('/home')
    }
    async getHouse(params){
      console.log(params);
      const {data:{body}}=await axios.get('/houses',{params})
      console.log(body);
      this.setState({
           list:body.list,
           count:body.count
      })
    }
    //选择条件重新发送请求 给子组件调用函数
    select=(params)=>{
      this.params=params
      console.log(params);
      this.getHouse(params)
    }
    componentDidMount(){
      console.log(def);
      this.getHouse()
    }
    //渲染每一行数据的渲染函数
    rowRenderer=({
      key, // Unique key within array of rows
      index, // 索引号
      isScrolling, // 当前项是否正在滚动
      isVisible, // 当前项在list中可见
      style, // 一定要给每一行添加 作用 每一行的位置
    })=> {
     const {list}= this.state
     if(!list[index]){
       return <div className='loading' key={key} style={style}>loading</div>
     }
      return  <Flex className='item' align='start' key={key} style={style}>
          <Flex.Item className='img'><img src={`http://localhost:8080${list[index].houseImg}`}></img></Flex.Item>
          <Flex.Item className='text'>             
          <div className='title'>{list[index].title}</div>            
          <div className='desc'>{list[index].desc}</div>
          <span className='tags'>{list[index].tags}</span>
          <div className='price'>{list[index].price}元/月</div>
          </Flex.Item>
        </Flex>
      
    }
    //判断列表中每一行1是否加载完成
    isRowLoaded= ({ index })=> {
      return !!this.state.list[index];
    }
    //获取更多房屋数据  注意该方法需要返回promise对象，数据加载完成时调用resolve()让promise状态变成完成
     loadMoreRows= ({ startIndex, stopIndex })=> {
      // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
      //   .then(response => {
      //     // Store response data in list...
      //   })
      console.log(startIndex+'---'+stopIndex);
      return new Promise(async (resolve)=>{
        this.params={...this.params,start:startIndex,end:stopIndex}
        const {data:{body}}=await axios.get('/houses',{params:this.params})
         console.log(body);
         this.setState((prevstate)=>{
           return {
             list:[...prevstate.list,...body.list]
           }
         })
        resolve()
      })
    }
    

    render(){
    return (<div className='list'>
      {/* 头部导航栏 */}
      <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={this.goback}
      ><div className='top'><HomeSearch city={this.state.city.label}></HomeSearch></div></NavBar>

      {/* 筛选栏 */}
      <Filter select={this.select}></Filter>

      {/* react-virtualized  list组件 */}
      <InfiniteLoader
    isRowLoaded={this.isRowLoaded}
    loadMoreRows={this.loadMoreRows}
    rowCount={this.state.count}
  >
    {({ onRowsRendered, registerChild }) => (
      <WindowScroller>
    {({ height, isScrolling, onChildScroll, scrollTop }) => (
      <AutoSizer >
            {({ width})=>{
                return <List
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                autoHeight
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                width={width}
                height={height}
                rowCount={this.state.count}
                rowHeight={120}
                rowRenderer={this.rowRenderer}
                />
            }}
      </AutoSizer>
      )}
      </WindowScroller>
      )}
      </InfiniteLoader>
    </div>)
    }  
 
}

export default ListSelect