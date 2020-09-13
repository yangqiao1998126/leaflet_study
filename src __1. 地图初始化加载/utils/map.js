import 'leaflet/dist/leaflet.css'
import $L from 'leaflet'

//创建地图对象
const createMap = (divID,options) => {
    let map = $L.map(divID,options)
    return map
}
//此时有了地图容器之后不代表可以看到地图
   //需要添加图层或图形才会有内容显示
//添加图层加载得方法   leaflet中创建图层得方法是异步方法
const createTitleLayer = async (map,url,options) => {
    let titleLayer = await $L.tileLayer(url,options)
    titleLayer.addTo(map)
    return titleLayer
}
export default { createMap ,createTitleLayer}