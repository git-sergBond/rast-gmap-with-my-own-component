<template>
  <div class="about">
    <div class="flex-collumns">
      <button @click="test">123</button>
      <div class="side-collums">
        <div class="filters">
          <h3>Люди / Фильтры </h3>
          <div>
            <P>Цена</p>
            <button>low</button><button>high</button>
            <p>от</p><input type="text" size="3">
            <p>до</p><input type="text" size=3>
          </div>
          <div><P>Рейтинг</p><button>low</button><button>high</button></div>
          <div><P>Категория</p></div>
        </div>
        <div class="item" v-for="p in cUserPoints" :key='p.userid' >
            <p>{{p.firstname}}</p>
        </div>
      </div>
      <div ref="ssgmap" id='ssgmap-id'></div>
      <div class="side-collums">
        <div class="filters">
          <h3>Услуги / Фильтры </h3>
          <div>
            <input type="checkbox" v-model="filterAgeCheck">
            <span>Возраст</span>
            <input type="number" v-model="filterAgeCheckLow" size="3">
            <span>/</span>
            <input type="number" v-model="filterAgeCheckHigh" size="3">
          </div>
          <div>
            <input type="checkbox" v-model="filterMaleCheck">
            <span>Пол</span>
            <input type="checkbox" v-model="filterMaleCheckMale">
          </div>
          <div>!Округ</div>
          <div>!Онлайн</div>
          <button @click="clickOnAcceptUserFilter">Применить фильтры</button>
          <button @click="clickOnClearUserFilter">Сбросить фильтры</button>
          <button @click="clickOnDeleteUsers">Удалить точки</button>
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
import collectionUsers from '../clases/collectionUsers'

//import * as Logger from '@/clases/myLogger'

export default Vue.extend({
  /*
  components: {
    IncludeSsgmapMap
  },*/
  data() { 
    return {
      collUsr : null,
      filterAgeCheck : false,
      filterAgeCheckLow : 0,
      filterAgeCheckHigh:  200,
      filterMaleCheck : false,
      filterMaleCheckMale : false,
      //test
      filteredData : {UserPoints : []}
  }},
  async mounted(){
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
     
    try{
/*
      this.$data.source.TradePoints = [];
      for(let p of  testTradePoints){
        let e = new TradePoint(p,map);
        e.addEvents([{type:'click',event:this.clickOnTradePoint}])
        this.$data.source.TradePoints.push(e);
      }
      this.$data.markClusters.TradePoints = new Cluster(this.$data.source.TradePoints,map);
    */
      //
      
      this.$data.collUsr = new collectionUsers(map,[{type:'click',event:this.clickOnUserPoint}]);
      await (this.collUsr! as collectionUsers).getData();
      (this.collUsr! as collectionUsers).drawData();
      //
      /*
      this.$data.filteredData.TradePoint = [4,13];
      this.$data.filteredData.UserPoints = [9,142,143,148];*/
    } catch (e) {
      alert('3 ' + e.message)
    }
  },
  methods: {
    clickOnTradePoint(){
      alert(1)
     // Logger.log(1)
    },
    clickOnUserPoint(){
      alert(2)
    //  Logger.log(2)
    },
    clickOnAcceptUserFilter(){
      (this.collUsr! as collectionUsers).filterClear();
      if(this.filterAgeCheck) {
        (this.collUsr! as collectionUsers).filterBy_age(this.filterAgeCheckLow, this.filterAgeCheckHigh);
      }
      if(this.filterMaleCheck) {
        (this.collUsr! as collectionUsers).filterBy_male(this.filterMaleCheckMale);
      }
    },
    clickOnClearUserFilter(){
      this.filterAgeCheck = false;
      this.filterAgeCheckLow = 0;
      this.filterAgeCheckHigh = 200;
      this.filterMaleCheck = false;
      this.filterMaleCheckMale = false;
      this.clickOnAcceptUserFilter();
    },
    clickOnDeleteUsers(){
      (this.collUsr! as collectionUsers).deleteMarkers();
    },
    test(){
      (this.filteredData.UserPoints as number[]) = [1232];
    }
  },
  watch: {
    'filteredData.UserPoints' : function () {
      alert(123)
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
   // width: 200PX;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

}
.filters{
  display: flex;
  flex-direction: column;
  > div{
    display: flex;
    font-size: 15px;
    height: 20px;
  }
}
</style>

