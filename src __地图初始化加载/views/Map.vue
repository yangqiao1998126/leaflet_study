<template>
    <div class="map-container" id = 'map-container'>
        
    </div>
</template>

<script>
    export default {
        name: "Map",
        components:{},
        data:()=>{
          return {
              map: null,
              OSMUrl:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        },
        mounted() {
            this.map = this.$utils.map.createMap('map-container')

            //加载图层服务
            this.$utils.map.createTitleLayer(this.map,this.OSMUrl,{})
            //设置地图视图 中心位置
            this.map.setView([51.505,-0.09],13)
        }
    }
</script>

<style>
.map-container{
    position :absolute;
    left:0;
    top: 0;
    width:100%;
    height: 100%;
}
</style>