<template>
  <div class="about">
    <!--include-ssgmap-map></include-ssgmap-map-->
    <div ref="ssgmap" id='ssgmap-id'></div>
  </div>
</template>

<script lang='ts'>
//// <reference path="@types/index.d.ts" />
//import IncludeSsgmapMap from '@/comments/IncludeSsgmapMap.vue'
import Vue from 'vue'
import Point from '../clases/Point'
export default Vue.extend({
  /*
  components: {
    IncludeSsgmapMap
  },*/
  mounted(){
    console.log('mounted',_global_initMap)
    let map : any = new google.maps.Map(this.$refs.ssgmap as Element, {
      center: {
        lat: 55.452376,
        lng: 37.372236
      },
      zoom: 8
    })
    new Point(56.452376,37.372236,map);
    new Point(55.452376,37.372236,map);
    new Point(54.452376,37.372236,map);
    new Point(56.452376,38.372236,map);
    new Point(55.452376,38.372236,map);
    new Point(54.452376,38.372236,map);
    new Point(56.452376,39.372236,map);
    new Point(55.452376,39.372236,map);
    new Point(54.452376,39.372236,map);
  }
})
</script>
<style lang="scss" scoped>
#ssgmap-id {
height: 500px;
width: 500px;
}
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

</style>

