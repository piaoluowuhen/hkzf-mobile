import { Flex } from 'antd-mobile';
import React from 'react';
import './index.scss'
import { PickerView } from 'antd-mobile';
import {Spring} from 'react-spring'

let arr = []

class FilterPicker extends React.Component{
    state={
    }
    onChange = (value) => {
        // console.log(value);
        // console.log(this.props.dis);
        arr= value
        this.props.sureselect(this.props.dis,arr)
      }
    onScrollChange = (value) => {
        console.log(value);

      }
    sure=()=>{
        this.props.picsure()
      }
    renderpicker=()=>{
        if(this.props.dis==='a'){
            console.log(this.props.data);
            return <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {(props)=>{
                         return <PickerView
                         style={props}
                          data={this.props.data}
                          onChange={this.onChange}
                          onScrollChange={this.onScrollChange}
                          value={this.props.def.a}
                        />
              }}
            </Spring>
            

        } else if (this.props.dis==='b'){
           return <PickerView
           onChange={this.onChange}
           onScrollChange={this.onScrollChange}
           value={this.props.def.b}
          data={this.props.data}
          cols='1'
        />
        } else if(this.props.dis==='c'){
            return <PickerView
            onChange={this.onChange}
            onScrollChange={this.onScrollChange}
            value={this.props.def.c}
            data={this.props.data}
            cols='1'
          />
        }
    }

    onclickpic=(item)=>{
        console.log(item);
        this.setState({key:item.value})
    }
    render(){
       return  (  <div className='picker'>

        {/* 选择器 */}
        {this.renderpicker()}

        {/* 底部按钮 */}
        <div className='buttom'>
           <button className='cancel' onClick={this.props.onclickmask}>取消</button>
           <button className='confirm' onClick={this.sure}>确定</button>
       </div>
       </div>



      )
    }
 }
 export default FilterPicker