import axios from 'axios'

export const getCity = ()=>{
    // 返回定位城市，如果本地没有城市数据，那么根据百度地图IP定位拿到城市，发送请求拿到城市数据返回
     let city = JSON.parse(localStorage.getItem('hkzf_city'))
     if (!city){
         return new Promise((resolve,reject)=>{
                 // 百度地图IP定位api
            var myCity = new window.BMapGL.LocalCity();
            myCity.get(async (result)=>{
            var cityName = result.name;
            // alert("当前定位城市:" + cityName);
            try {
                const {data:{body}} = await axios.get('http://localhost:8080/area/info',{prams:`name=${cityName}`})
                localStorage.setItem('hkzf_city',JSON.stringify(body))
                resolve(body)
            } catch (error) {
                reject(error)           
        }     
     })
         })
     }
     return  Promise.resolve(city)
     try {
         
     } catch (error) {
         
     } finally{
         
     }

}

console.log(new Promise((resolve,reject)=>{resolve()}));