import React from 'react';
import './index.scss'
class FilterMore extends React.Component{

    state={
        isarr:this.props.defmore
    }
    sure=()=>{
        this.props.moresure(this.state.isarr)
        this.props.onclickmask()
    }
    tagis=(item)=>{
        console.log(item);
        let arr = [...this.state.isarr]
        if(arr.indexOf(item.value)!==-1){
            const index = arr.indexOf(item.value)
            arr.splice(index,1)
            this.setState({
                isarr:arr
            })
        } else {
            arr.push(item.value)
            this.setState({
                isarr:arr
            })
        }
    }
    rendercontent=()=>{
        console.log(this.props.data);
        return <div className='condition'>
        <div className='h'>
            <div className='title'>户型</div>
            {this.props.data.roomType.map((item,index)=>
                <span key={item.value} className={this.state.isarr.indexOf(item.value)!==-1?'tag is':'tag'} onClick={()=>{this.tagis(item)}}>{item.label}</span>
                )}
        </div>
        <div className='h'>
            <div className='title'>朝向</div>
            {this.props.data.oriented.map((item,index)=>
                <span key={item.value} className={this.state.isarr.indexOf(item.value)!==-1?'tag is':'tag'} onClick={()=>{this.tagis(item)}}>{item.label}</span>
                )}
        </div>
        <div className='h'>
            <div className='title'>楼层</div>
            {this.props.data.floor.map((item,index)=>
                <span key={item.value} className={this.state.isarr.indexOf(item.value)!==-1?'tag is':'tag'} onClick={()=>{this.tagis(item)}}>{item.label}</span>
                )}
        </div>
        <div className='h'>
            <div className='title'>房屋亮点</div>
            {this.props.data.characteristic.map((item,index)=>
                <span key={item.value} className={this.state.isarr.indexOf(item.value)!==-1?'tag is':'tag'} onClick={()=>{this.tagis(item)}}>{item.label}</span>
                )}
        </div>

       </div>

    }
    render(){
       return  ( <div className='more'>
       {/* 遮罩层 */}
       <div className='mask' onClick={this.props.onclickmask}></div>

       {/* 条件内容 */}
       
           {this.rendercontent()}

       {/* 底部按钮 */}
       <div className='buttom'>
           <button className='cancel' onClick={()=>{this.setState({isarr:[]})}}>清除</button>
           <button className='confirm' onClick={this.sure}>确定</button>
       </div>

       </div>)
    }
 }
 export default FilterMore