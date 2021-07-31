import React from 'react';
import './index.scss'
import PropTypes from 'prop-types'
class Sticky extends React.Component{

    constructor(props){
        super(props)
        Sticky.propTypes={ 
            heigth:PropTypes.number.isRequired
        }
    }

    // 创建2个ref对象
    placeholder = React.createRef()
    content = React.createRef()
    componentDidMount(){
        // console.log(this.props.children);//react虚拟dom对象
        window.addEventListener('scroll',this.eventscroll)//监听滚动事件
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.eventscroll)//移除滚动事件
    }
    eventscroll=()=>{
        const {heigth} = this.props
        // 获取页面中dom对象的位置domObject.getBoundingClientRect()
        if(this.content.current.getBoundingClientRect().top<0){
            this.content.current.classList.add('fiexd')
            this.placeholder.current.style.height=`${heigth}'px'` 
        }else if(this.placeholder.current.getBoundingClientRect().top>=0) {
            this.content.current.classList.remove('fiexd')
            this.placeholder.current.style.height= 0
        }
    }
    render(){
        return <div className='fa'>
            {/* 占位元素 */}
            <div ref={this.placeholder}></div>
            {/* 内容元素 */}
            <div ref={this.content}>{this.props.children}</div>
        </div>
    }
        
}
export default Sticky