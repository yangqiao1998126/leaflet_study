<template>
    <div class="map-container">
        <div id="map-container"></div>
        <NavigationCtrl @zoomIn="zoomIn" @zoomOut="zoomOut" @resetMap="resetMap" ></NavigationCtrl>
        <MapTools @marker="addMarker" @polyline="addPolyline" @polygon="addPolygon" @tooltips = "addTooltips" @popup = "addPopup"
                  @Bindpopup="addBindpopup"
        ></MapTools>

        <MapDraw @point="drawPoint" @polyline="drawPolyline" @polygon="drawPolygon" @end="drawOff"></MapDraw>
    </div>
</template>

<script>
    import NavigationCtrl from "../components/NavigationCtrl";
    import MapTools from "../components/MapTools";
    import MapDraw from "../components/MapDraw";
    import '../assets/leaflet.less'
    export default {
        name: "Map",
        components:{
            NavigationCtrl,
            MapTools,
            MapDraw
        },
        data:()=>{
          return {
              map: null,
              OSMUrl:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              //存放创建线条的坐标数组
              singleLine: [
                  [51.517288954651875, -0.16685485839843753],
                  [51.51194758264939, -0.1474571228027344],
                  [51.51878442657495, -0.13320922851562503],
                  [51.530426064343594, -0.1419639587402344],
                  [51.53640593191922, -0.11209487915039064]
              ],
              miltipleLine: [
                  [
                      [51.49282033577651, -0.11432647705078126],
                      [51.48010001366223, -0.10265350341796876],
                      [51.48084836613703, -0.08222579956054689],
                      [51.49591970845512, -0.08239746093750001]
                  ],
                  [
                      [51.47614423230301, -0.08909225463867188],
                      [51.47571655971428, -0.05973815917968751],
                      [51.4829864484029, -0.03398895263671876],
                      [51.49025517833079, -0.008239746093750002],
                      [51.477641054786694, 0.008583068847656252],
                      [51.487796767005534, 0.021800994873046875]
                  ]
              ],
              //存放创建面的坐标数组
              singlePolygon: [
                  [51.50203767899114, -0.13977527618408206],
                  [51.505777518488806, -0.13072013854980472],
                  [51.505109712517786, -0.1296043395996094],
                  [51.50388092395907, -0.12921810150146487],
                  [51.50345351147583, -0.12921810150146487],
                  [51.50302609498369, -0.12947559356689456],
                  [51.502545246638114, -0.12973308563232425],
                  [51.50219796412198, -0.12990474700927737],
                  [51.50177053585362, -0.12990474700927737],
                  [51.5014232474337, -0.12999057769775393],
                  [51.50043479667606, -0.13891696929931643],
                  [51.50134310357634, -0.1399040222167969],
                  [51.50195753621433, -0.13973236083984378],
                  [51.50195753621433, -0.13973236083984378]
              ],
              miltiplePolygon: [
                  [
                      [51.481703611072156, -0.09407043457031251],
                      [51.480313829908056, -0.09080886840820312],
                      [51.481703611072156, -0.08531570434570314],
                      [51.482131227525315, -0.07415771484375001],
                      [51.48394855271953, -0.07415771484375001],
                      [51.48426924964768, -0.07638931274414064],
                      [51.486941636341456, -0.07604598999023438],
                      [51.485552014806856, -0.07947921752929689],
                      [51.48426924964768, -0.0830841064453125],
                      [51.48320025111633, -0.08754730224609376],
                      [51.4826657424533, -0.08943557739257814],
                      [51.481489801341986, -0.09441375732421875],
                      [51.481489801341986, -0.09441375732421875]
                  ],
                  [
                      [51.49869827721546, -0.05613327026367188],
                      [51.498377681772325, -0.05922317504882813],
                      [51.49506473014368, -0.05802154541015626],
                      [51.49132401147376, -0.05407333374023438],
                      [51.49143089340988, -0.05184173583984376],
                      [51.492072179764314, -0.05046844482421876],
                      [51.49292721420453, -0.04978179931640626],
                      [51.49388910878061, -0.04840850830078125],
                      [51.49506473014368, -0.05149841308593751],
                      [51.49602657961649, -0.05270004272460938],
                      [51.49709527744871, -0.05373001098632813],
                      [51.498484547170605, -0.05647659301757813],
                      [51.49869827721546, -0.05699157714843751],
                      [51.49762961696847, -0.06025314331054688],
                      [51.49762961696847, -0.06025314331054688]
                  ]
              ],

              overLayer:{
                  polylines:[]     //存放最终完成后产生的线对象
              },
              tempGp:{
                  lineNode:[],//绘制中生成线图形的坐标串
                  lineNodeLen:0, //已添加的节点的数量
                  tempLine:null, //绘制完成前地图上的线对象
                  tempNode:[]  //每次单击产生的节点对象
              }
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
                let singlestyle = {
                    stroke:true,
                    color:'#de0000',
                    weight:3,
                    opacity:1
                }
                this.$utils.map.createPolyline(this.map,this.singleLine,singlestyle)
            },
            addPolygon(){
                let singlestyle = {
                    stroke:true,
                    color:'#de0000',
                    weight:3,
                    opacity:1
                }
                this.$utils.map.createPolygon(this.map,this.singlePolygon,singlestyle)
                this.$utils.map.createPolygon(this.map,this.miltiplePolygon,singlestyle)
            },

            //信息提示Tooltip
            addTooltips(){
                let pngIcon = this.$utils.map.createIcon({
                    iconUrl:require('../assets/98f9b959-b0a6-4ad8-947e-2489dbebbca5.png')
                    // iconSize:[32,32]
                })
                let marker = this.$utils.map.createMakerByXY(this.map, [-0.095, 51.505], {
                    icon: pngIcon
                });
                let tooltips = '<h1>我是Tooltips提示</h1><p class="tooptips_p">我是Tooltips提示的P标签信息</p>'
                marker.bindTooltip(tooltips,{
                    className:'tooptips_p'
                })
            },
            //直接在地图上添加popup
            addPopup(){
                console.log(this.$utils.map.createLatlonByArray([51.505,-0.095]))
                let popup = this.$utils.map.createPopup(this.map,{
                    maxWidth:200,
                    minWidth:100,
                    className: "popup"
                })
                popup.setLatLng(this.$utils.map.createLatlonByArray([51.505,-0.095]))
                popup.setContent(
                         '<h1>popup 信息</h1><p class="popup">popup 的P信息</p>'
                     )
                popup.openOn(this.map)
            },
            addBindpopup(){
                let popup = this.$utils.map.createPopup(this.map,{
                    maxWidth:200,
                    minWidth:100,
                    className: "popup"
                })
                popup.setContent(
                    '<h1>popup 信息</h1><p class="popup">popup 的P信息</p>'
                )
                //创建marker
                let pngIcon = this.$utils.map.createIcon({
                    iconUrl:require('../assets/98f9b959-b0a6-4ad8-947e-2489dbebbca5.png')
                    // iconSize:[32,32]
                })
                let marker = this.$utils.map.createMakerByXY(this.map, [-0.095, 51.505], {
                    icon: pngIcon
                });
                //绑定marker
                marker.bindPopup(popup)
            },



            //监听地图事件
            drawOn(fn){
                this.map.off('click')
                this.map.on('click',evt => fn(evt))
            },
            //移除监听地图事件
            drawOff(){
                this.map.off('click')
                this.$utils.map.removeCursorStyle(this.map); //复原鼠标平移样式
            },
            //监听鼠标点击事件图标的添加
            drawPoint(){
                // this.map.on('click',function (e) {
                //     this.$utils.map.createMakerByLatlng(e.latlng).addTo(this.map)
                // })
                this.$utils.map.addCursorStyle(this.map,"pointer-cursor") //鼠标样式
                this.drawOn( evt => {
                    this.$utils.map.createMakerByLatlng(evt.latlng).addTo(this.map)

                })
            },
            drawPolyline() {
                this.$utils.map.addCursorStyle(this.map,"pointer-cursor") //鼠标样式
                let tempPolygonOpts = {    //绘制过程中线条样式
                    color:"rgba(255,0,0,0.85)",
                    weight:3,
                    opacity:0.8
                }
                let finalPolygonOpts = {  //完成绘制时线条的样式
                    color:"rgba(0,255,0,0.85)",
                    weight:3,
                    opacity:0.8
                }
                this.map.on('click',e => {
                    this.tempGp.lineNode.push([e.latlng.lat,e.latlng.lng]) //绘制中生成线图形的坐标串
                    this.tempGp.tempNode.push(this.addNode(e.latlng,this.map))
                    //更新已添加的节点数量
                    this.tempGp.lineNodeLen = this.tempGp.lineNode.length;
                })
                this.map.on("mousemove",e => {
                    if(this.tempGp.lineNodeLen >= 1 ) {
                        if(this.tempGp.tempLine) this.tempGp.tempLine.remove()
                        this.tempGp.lineNode[this.tempGp.lineNodeLen] = [
                            e.latlng.lat,
                            e.latlng.lng
                        ];
                        // 绘制新的临时图形
                        this.tempGp.tempLine = this.$utils.map.createPolyline(
                            this.map,
                            this.tempGp.lineNode,
                            tempPolygonOpts
                        );
                    }
                })
                // 双击地图结束绘制
                this.map.on("dblclick", () => {
                    this.overLayer.polylines.push(
                        this.$utils.map.createPolyline(
                            this.map,
                            this.tempGp.lineNode,
                            finalPolygonOpts
                        )
                    );

                    // 重置临时数据
                    this.tempGp.lineNode = [];
                    this.tempGp.lineNodeLen = 0;
                    this.tempGp.tempLine.remove();
                    this.tempGp.tempNode.map(el => el.remove());
                });
            },
            addNode(latlng,map){
                let node = this.$utils.map.createIcon({
                    iconUrl:require('../assets/98f9b959-b0a6-4ad8-947e-2489dbebbca5.png')
                    // iconSize:[32,32]
                })
                node = this.$utils.map.createMakerByXY(this.map, [latlng.lat, latlng.lng], {
                    icon: node
                });
                node.addTo(map)
                return node
            },
            drawPolygon() {}


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
    .tooptips_p,popup{
        color: red;
    }
</style>