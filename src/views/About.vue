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
import {} from 'googlemaps'
export default Vue.extend({
  /*
  components: {
    IncludeSsgmapMap
  },*/
  mounted(){
    /*
    const _refMapHtml : any = this.$refs['ssgmap-load-script-from-google'];
    _refMapHtml.add.createElement('script',
    {
        type: 'text/javascript',
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCtsOk0uU5L9qaB7usCiLVHgWGuyAqWOCA&callback=initMap',
        onload: () => {
          console.log('doMapInitLogic()')
        }
    });*/
console.log('mounted')
    console.log('mounted',_global_initMap)
    new google.maps.Map(this.$refs.ssgmap as Element, {
      center: {
        lat: -34.397,
        lng: 150
      },
      zoom: 8
    })
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

