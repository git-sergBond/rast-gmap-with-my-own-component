<template>
  <div class="about">
    <div class="flex-collumns">
      <div class="side-collums">
        <h3>Люди</h3>
        <div>
          <h3> Фильтры </h3>
        </div>
        <div class="item" v-for="p in cUserPoints" :key='p.userid' >
            <p>{{p.firstname}}</p>
        </div>
      </div>
      <div ref="ssgmap" id='ssgmap-id'></div>
      <div class="side-collums">
        <h3>Услуги</h3>
        <div>
          <h3> Фильтры </h3>
        </div>
        <div class="item" v-for="p in cTradePoints" :key='p.pointid'>
          <p>{{p.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
//// <reference path="@types/index.d.ts" />
//import IncludeSsgmapMap from '@/comments/IncludeSsgmapMap.vue'
import Vue from 'vue'

import Point from '../clases/Point'
import TradePoint from '../clases/TradePoint'
import UserPoint from '../clases/UserPoint'
import Map from '../clases/Map'
import Cluster from '../clases/Cluster'

export default Vue.extend({
  /*
  components: {
    IncludeSsgmapMap
  },*/
  data() { 
    return {
      markClusters : {
        TradePoints : [],
        UserPoints : [],
      },
      source : {
        TradePoints : [],
        UserPoints : [],
      },
      filteredData : {
        TradePoints :  [],
        UserPoints : [9,142,143,148],
      }
  }},
  mounted(){
    console.log('mounted',_global_initMap)
    let map = new Map(this.$refs.ssgmap as Element, 55.452376, 37.372236, 8);
    //
    let testTradePoints : any[] = [
      {
                    "pointid": 4,
                    "name": "Лига Белошвеек",
                    "longitude": 36.58035063374,
                    "latitude": 50.568459640885,
                    "fax": null,
                    "subjectid": 6,
                    "time": null,
                    "email": "beloshi@mail.ru",
                    "usermanager": null,
                    "website": "http://beloshi",
                    "address": null,
                    "deleted": false,
                    "deletedcascade": false,
                    "subjecttype": 0,
                    "phones": []
                },
                {
                    "pointid": 13,
                    "name": "Большая точка",
                    "longitude": 36.646965560625,
                    "latitude": 50.551173779243,
                    "fax": null,
                    "subjectid": 6,
                    "time": null,
                    "email": null,
                    "usermanager": null,
                    "website": null,
                    "address": "Белгород, лесопарк Сосновка",
                    "deleted": false,
                    "deletedcascade": null,
                    "subjecttype": 0,
                    "phones": [
                        "+7 948 843-34-43",
                        "+7 948 345-34-34"
                    ]
                }
    ]
     let testUserPoints : any[] = [
          {
              "userid": 9,
              "email": "sumkin@mail.ru",
              "phone": "+7 954 352-65-75",
              "firstname": "Федор",
              "lastname": "Сумкин",
              "patronymic": "Васильевич",
              "longitude": "37.766709010827",
              "latitude": "55.7828040004861",
              "lasttime": "2019-09-08 16:00:30+00",
              "male": 1,
              "birthday": "1997-05-25 00:00:00+00",
              "pathtophoto": "images/users/d4dd0c47.jpg",
              "status": null
          },
          {
              "userid": 142,
              "email": "stronghunger@mail.com",
              "phone": null,
              "firstname": "Василиса",
              "lastname": "Маринова",
              "patronymic": null,
              "longitude": "38.429777623455",
              "latitude": "55.310895612457",
              "lasttime": "2019-09-08 16:00:30+00",
              "male": 0,
              "birthday": null,
              "pathtophoto": null,
              "status": null
          },
          {
              "userid": 143,
              "email": "stella@mail.ru",
              "phone": null,
              "firstname": "Василиса",
              "lastname": "Стебль",
              "patronymic": null,
              "longitude": "37.795951634686",
              "latitude": "56.189565758749",
              "lasttime": "2019-09-08 16:00:30+00",
              "male": 1,
              "birthday": null,
              "pathtophoto": null,
              "status": null
          },
          {
              "userid": 148,
              "email": "stella@mail.ru",
              "phone": null,
              "firstname": "Василиса",
              "lastname": "Ладан",
              "patronymic": null,
              "longitude": "37.809275304119",
              "latitude": "56.108756746459",
              "lasttime": "2019-09-08 16:00:30+00",
              "male": 0,
              "birthday": null,
              "pathtophoto": null,
              "status": null
          },
          {
              "userid": 149,
              "email": "stella@mail.com",
              "phone": null,
              "firstname": "Василиса",
              "lastname": "Стебль",
              "patronymic": null,
              "longitude": "37.211613560955",
              "latitude": "55.330330691362",
              "lasttime": "2019-09-08 16:00:30+00",
              "male": 1,
              "birthday": null,
              "pathtophoto": null,
              "status": null
          }
      ]
    try{

      this.$data.source.TradePoints = [];
      for(let p of  testTradePoints){
        let e = new TradePoint(p,map);
        e.addEvents([{type:'click',event:this.clickOnTradePoint}])
        this.$data.source.TradePoints.push(e);
      }
      this.$data.markClusters.TradePoints = new Cluster(this.$data.source.TradePoints,map);
    
      //
      this.$data.source.UserPoints  = [];
      for(let p of  testUserPoints){
        let e = new UserPoint(p,map);
        e.addEvents([{type:'click',event:this.clickOnUserPoint}])
        this.$data.source.UserPoints.push(e);
      }
      this.$data.markClusters.UserPoints = new Cluster(this.$data.source.UserPoints,map);
      //
      this.$data.filteredData.TradePoint = [4,13];
      this.$data.filteredData.UserPoints = [9,142,143,148];
    } catch (e) {
      alert(e.message)
    }
  },
  methods: {
    clickOnTradePoint(){
      alert(1)
    },
    clickOnUserPoint(){
      alert(2)
    }
  },
  computed: {
    cTradePoints() {
      let res = <any> [];
      try{
        for(const id of this.filteredData.TradePoints){
          for(const p of this.$data.source.TradePoints){
            if(p.pointid == id){
              res.push(p);
              break;
            }
          }
        }
      } catch (e) {
        alert(e.message)
      }
      return res;
    },
    cUserPoints() {
      let res = <any> [];
      try{
        for(const id of this.filteredData.UserPoints){
          for(const p of this.$data.source.UserPoints){
            if(p.pointid == id){
              res.push(p);
              break;
            }
          }
        }
      } catch (e) {
        alert(e.message)
      }
      return res;
    }
  }
})
</script>
<style lang="scss" scoped>
.about{
  display: flex;
  justify-content: space-between
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.flex-collumns{
  display: flex;
  width: 100%;
  justify-content: space-between;

  #ssgmap-id {
height: 500px;
width: 500px;
}

  .side-collums{
    width: 200PX;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

}
</style>

