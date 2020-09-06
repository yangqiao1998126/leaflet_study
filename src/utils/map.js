import 'leaflet/dist/leaflet.css'
import $L from 'leaflet'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
let DefaultIcon = $L.icon({
    iconUrl:icon,
    shadowUrl:iconShadow
})
$L.Marker.prototype.options.icon = DefaultIcon
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

//添加icon
const createIcon = (options) => {
    return $L.icon(options)
}

//添加maker  通过坐标添加
const createMakerByXY = (map,coordinate,options = {}) =>{
    let marker = $L.marker($L.latLng(coordinate[1],coordinate[0]),options)
    marker.addTo(map)
    return marker
}


export default { createMap ,createTitleLayer ,createIcon,
    createMakerByXY,
}