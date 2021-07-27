import React from 'react';
import { Flex } from 'antd-mobile';
import './index.scss'
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types'

 function HomeSearch({history,city}){
  HomeSearch.propTypes={
    city:PropTypes.string.isRequired,
 }
    return (<div className='a'><Flex  justify='between'>
      <Flex.Item className='l'>
        <Flex>
        <Flex.Item className='l2' onClick={()=>history.push('/citylist')}>
        <Flex>
        <div className='address'>{city}</div><i className='iconfont icon-arrow'></i>  |
        </Flex>
        </Flex.Item>
        <Flex.Item className='r2' onClick={()=>history.push('/search')}>
        <div>点击搜索</div>
        </Flex.Item>
        </Flex>
      </Flex.Item>
      <Flex.Item className='r' onClick={()=>history.push('/map')}><i className='iconfont icon-map'></i></Flex.Item>
    </Flex></div>)

  }
  export default withRouter(HomeSearch)