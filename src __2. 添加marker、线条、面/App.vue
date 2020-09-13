<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--&lt;!&ndash;      <router-link to="/about">About</router-link>&ndash;&gt;-->
<!--    </div>-->
<!--    <router-view/>-->
     <Map></Map>
  </div>
</template>
<script>
    import Map from "./views/Map";
    export default {
        components:{
            Map
        }
    }
</script>

<style>

</style>
