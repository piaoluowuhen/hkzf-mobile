import React from 'react';
import './index.scss'
import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import axios from '../../../../utils/axios'
class Filter extends React.Component{
  state={
    title:{a:false,b:false,c:false,d:false,},
    dis:'',
    picdata:{},
    city : JSON.parse(localStorage.getItem('hkzf_city')),
    def:{a:["area", "null"],b:["null"],c:["null"]},
    defmore:[],
  }
  //more组件确定 操作params请求参数
  moresure=(arr)=>{
    console.log(arr);
    console.log(this.params);
    if(arr.length!==0){
    this.params = {...this.params,more:arr.join(',')}
    }
    this.setState({
      defmore:arr
    })
    //调用父组件函数请求条件数据
    this.props.select(this.params)
  }
  //picker组件确定
  picsure=()=>{
    console.log(this.params);
    console.log(this.state.def);
    let str = 'null'
    if(this.state.def.a.length===2){
      str = 'null'
    }else if(this.state.def.a.length===3&&this.state.def.a[2]!=='null'){
      str = this.state.def.a[2]
    }else {
      str = this.state.def.a[1]
    }
    this.params={
      cityId:this.state.city.value,
      [this.state.def.a[0]]:str,
      mode:this.state.def.b[0],
      price:this.state.def.c[0],
      more:'null',
      start:1,
      end:20
    }
    console.log(this.params);
     this.setState({
      dis:'',
    })
  }
   getdata= async()=>{
  const {data:{body}} =await axios.get('/houses/condition',{params:{id:this.state.city.value}})
    this.setState({
      picdata:body
    })
  }
  //picker组件 选项改变就改变初始值
  sureselect=(key,value)=>{
    console.log(key+'--'+value);
    this.setState((prevstate)=>{
      return{
      def:{...prevstate.def,[key]:value},
    }})
  }
  //点击4个筛选项
  onclickFilter=(type)=>{
    console.log(type);
    if(type==='d'){
    this.setState((prevstate)=>{
      return {
        title:{...prevstate.title,[type]:true},
        dis:'d'
      }
    })
    }else {
      this.setState((prevstate)=>{
        return {
          title:{a:false,b:false,c:false,d:false,[type]:true},
          dis:type
        }
      })
    }
  }
  //点击筛选项组件遮罩层取消按钮关闭组件 初始化默认值
  onclickmask=(item)=>{
    this.setState({
      def:{a:["area", "null"],b:["null"],c:["null"]},
      dis:'',
      title:{a:false,b:false,c:false,d:false,}
    })
  }
  onclickpicitem=()=>{
    this.setState({})
  }
  componentDidMount(){
    this.params={
     cityId:this.state.city.value, area: "null", mode: "null", price: "null", more: "null",start:1,end:20
    }
    this.getdata()
  }
  renderpic=()=>{
    if(this.state.dis==='a'||this.state.dis==='b'||this.state.dis==='c'){ 
        const {area,subway,rentType,price} = this.state.picdata
        let arr = []
        switch (this.state.dis) {
          case 'a':
            arr=[area,subway]
            break;
          case 'b':
            arr=rentType
            break;
          case 'c':
            arr=price
            break;             
          default:
            break;
        }
        return <FilterPicker 
        dis={this.state.dis} 
        onclickpicitem={this.onclickpicitem} 
        onclickmask={this.onclickmask}
        data={arr}
        def={this.state.def}
        sureselect={this.sureselect}
        picsure={this.picsure}>          
        </FilterPicker>
    }
  }
  rendermore=()=>{
    if(this.state.dis==='d'){
      const {floor,oriented,roomType,characteristic} = this.state.picdata
      let obj = {floor,oriented,roomType,characteristic}
        return <FilterMore moresure={this.moresure} defmore={this.state.defmore} data={obj} onclickmask={this.onclickmask}></FilterMore>
    }
  }
   render(){
     return  ( <div className='filter'>
      {/*   FilterTitle */}
      <FilterTitle title={this.state.title} onclickFilter={this.onclickFilter}></FilterTitle>
      
      {/* 遮罩层 */}
      {this.state.dis==='a'||this.state.dis==='b'||this.state.dis==='c'?<div className='t' onClick={this.onclickmask}></div>:null}
      {this.state.dis==='a'||this.state.dis==='b'||this.state.dis==='c'?<div className='b' onClick={this.onclickmask}></div>:null}
      {/*   FilterPicker 前三个选项的组件*/}
      {this.renderpic()}

      {/*   FilterMore  第四个选项组件*/}
      {this.rendermore()}
      </div>)
   }
}
export default Filter