import 'leaflet/dist/leaflet.css'
import $L from 'leaflet'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
let DefaultIcon = $L.icon({
    iconAnchor: [13, 41],
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
const createMakerByLatlng = (latlng, options) => {
    return $L.marker(latlng, options);
};

//创建线
const createPolyline = (map,linePath,lineOptions) => {
    let polyline = $L.polyline(linePath,lineOptions)
    polyline.addTo(map)
    return polyline
}
//创建面
const createPolygon = (map,areaPath,areaOptions) => {
    let polygon = $L.polyline(areaPath,areaOptions)
    polygon.addTo(map)
    return polygon
}

//构造popup  不依附于图层
const createPopup = (map,options) =>{
    let popup =$L.popup(options)
    //popup.addTo(map)
    return popup
}
const createLatlonByArray = (coordinate) => {
    let latLng = $L.latLng(coordinate[0],coordinate[1]);
    return latLng;
};

//存储鼠标样式
let CursorStyle = ''
//添加鼠标样式
const addCursorStyle = (map,cursorStyle) => {
    CursorStyle = cursorStyle
    $L.DomUtil.addClass(map._container,cursorStyle)
}
//移除鼠标样式
const removeCursorStyle = map => {
    $L.DomUtil.removeClass(map._container,CursorStyle)
}




export default { createMap ,createTitleLayer ,createIcon,
    createMakerByXY,createPolyline,createPolygon,createLatlonByArray,createPopup,createMakerByLatlng,
    addCursorStyle,removeCursorStyle
}