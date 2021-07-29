import React from 'react';
import { Flex } from 'antd-mobile';
import './index.scss'
const arr = [{value:'区域',type:'a'},{value:'方式',type:'b'},{value:'租金',type:'c'},{value:'筛选',type:'d'}]
 class FilterTitle extends React.Component {
    componentDidMount(){

    }
    render(){
        return <Flex className='select'>
                {arr.map(item=> <Flex.Item key={item.value} onClick={()=>{this.props.onclickFilter(item.type)}}>
            <span className={this.props.title[item.type]? 'is':''}>{item.value}</span><i className='iconfont icon-arrow'></i>
            </Flex.Item>)}
      </Flex>
    }
    
 }
export default FilterTitle