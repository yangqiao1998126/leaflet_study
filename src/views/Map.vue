<template>
    <div class="map-container">
        <div id="map-container"></div>
        <NavigationCtrl @zoomIn="zoomIn" @zoomOut="zoomOut" @resetMap="resetMap" ></NavigationCtrl>
        <MapTools @marker="addMarker" @polyline="addPolyline" @polygon="addPolygon"
        ></MapTools>
    </div>
</template>

<script>
    import NavigationCtrl from "../components/NavigationCtrl";
    import MapTools from "../components/MapTools";
    export default {
        name: "Map",
        components:{
            NavigationCtrl,
            MapTools
        },
        data:()=>{
          return {
              map: null,
              OSMUrl:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        },
        mounted() {
            this.map = this.$utils.map.createMap('map-container',{
                zoomControl:false,//默认缩放控件
            })

            //加载图层服务
            this.$utils.map.createTitleLayer(this.map,this.OSMUrl,{})
            //设置地图视图 中心位置
            this.map.setView([51.505, -0.09],13)
            //this.map.flyTo([116,88],13)
        },
        methods:{
            zoomIn(){
              this.map.zoomIn()
            },
            zoomOut(){
                this.map.zoomOut()
            },
            resetMap(){
                this.map.setView([51.505,-0.09],13)
            },

            addMarker(){
                this.$utils.map.createMakerByXY(this.map,[-0.09,51.505])
                //此时添加得marker方法默认是没有传入参数的 leaflet会加载默认的marker样式
                //此时会在控制台出现路径错误 默认的icon的图片路径不对
                //解决leaflet默认marker无法显示的问题
                    //在map.js中引入icon路径

                //自定义marker样式，先创建不同的icon，
                let pngIcon = this.$utils.map.createIcon({
                    iconUrl:require('../assets/98f9b959-b0a6-4ad8-947e-2489dbebbca5.png')
                    // iconSize:[32,32]
                })
                this.$utils.map.createMakerByXY(this.map, [-0.095, 51.505], {
                    icon: pngIcon
                });
            },
            addPolyline(){

            },
            addPolygon(){

            }
        }
    }
</script>

<style>
    .map-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    #map-container {
        width: 100%;
        height: 100%;
    }
</style>