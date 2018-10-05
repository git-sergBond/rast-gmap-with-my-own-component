<template>
  <div class="about">
    <div class="flex-collumns">
      <div class="side-collums">
        <div class="filters">
          <h3>Услуги / Фильтры </h3>
          <div>
            <input type="checkbox" v-model="filter_price_active">
            <P>Цена(ф)</p>
            <p>от</p><input type="text" size="3" v-model="filter_price_from">
            <p>до</p><input type="text" size=3 v-model="filter_price_to">
          </div>
          <div><P>Рейтинг(с)</p><button @click="sort_dir = !sort_dir"> {{ sort_dir ? 'low' : 'high'}}</button></div>
          <div><input type="checkbox" v-model="filter_category_active"><P>Категория(ф)</p></div>
          <button @click="clickOnAcceptServicesFilter">Применить фильтры</button>
          <button @click="clickOnClearServicesFilter">Сбросить фильтры</button>
          <button @click="clickOnDeleteServices">Удалить точки</button>
        </div>
        <div class="item" v-for="p in outServices" :key='p.serviceid'>
          <p>{{p.serviceid}}, {{p.name}}, {{p.description}}, {{p.pricemin}}, {{p.pricemax}}</p>
        </div>
      </div>
      <div ref="ssgmap" id='ssgmap-id'></div>
      <div class="side-collums">
        <div class="filters">
          <h3>Люди / Фильтры </h3>
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
          <div>!Округ(ф)</div>
          <div>!Онлайн(с)</div>
          <button @click="clickOnAcceptUserFilter">Применить фильтры</button>
          <button @click="clickOnClearUserFilter">Сбросить фильтры</button>
          <button @click="clickOnDeleteUsers">Удалить точки</button>
        </div>
        <div class="item" v-for="p in outUsers" :key='p.userid'>
          <p>{{p.userid}}, {{p.firstname}}, {{p.lastname}}</p>
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
import Service from '../clases/Service'
import Map from '../clases/Map'
import Cluster from '../clases/Cluster'
import collectionUsers from '../clases/collectionUsers'
import collectionServices from '../clases/collectionServices'

import { constants } from 'fs';
import { setTimeout } from 'timers';

export default Vue.extend({
  /*
  components: {
    IncludeSsgmapMap
  },*/
  data() { 
    return {
      //ПОЛЬЗОВАТЕЛИ
      collUsr : null,
      outUsers: [],
      //фильтры пользаков
      filterAgeCheck : false,
      filterAgeCheckLow : 0,
      filterAgeCheckHigh:  200,
      filterMaleCheck : false,
      filterMaleCheckMale : false,
      //УСЛУГИ
      collServ : null,
      outServices : [],
      //фильтры услуг
      sort_by : "rating",//rating
      sort_dir : false,
      //фильтр по категории
      filter_category_active : false,
      filter_category_enum : [],
      //фильтр по цене
      filter_price_active : false,
      filter_price_from : 0,
      filter_price_to : 0,
      
  }},
  async mounted(){
    let context = this;
    console.log('mounted',_global_initMap)
    let map = new Map(this.$refs.ssgmap as Element, 55.452376, 37.372236, 8);
    //
    try{
      this.$data.collServ = new collectionServices(map,[{type:'click',event:this.clickOnUserPoint}]);
      
      (this.collServ! as collectionUsers).display();
      setTimeout(()=>{
        context.updateServices();
        context.filter_price_from = (context.collServ! as collectionServices).minPrice;
        context.filter_price_to = (context.collServ! as collectionServices).maxPrice;
        },0);

      this.$data.collUsr = new collectionUsers(map,[{type:'click',event:this.clickOnUserPoint}]);
      (this.collUsr! as collectionUsers).display();
      setTimeout(this.updateUsers,0);
    } catch (e) {
      alert('3 ' + e.message)
    }
  },
  methods: {
    //клик на точку на карте
    clickOnTradePoint(){//услуга
      console.log(1)
    },
    clickOnUserPoint(){//люди
      console.log(2)
    },
    //обновление списков точек
    updateUsers(){//люди
      (this.outUsers as UserPoint[]) = (this.collUsr! as collectionUsers).outData;
    },
    updateServices(){//услуга
      (this.outServices as Service[]) = (this.collServ! as collectionServices).outData;
      
    },
    //применить фильтры
    clickOnAcceptUserFilter(){//к людям
      (this.collUsr! as collectionUsers).filter_male_active = this.filterMaleCheck;
      (this.collUsr! as collectionUsers).filter_male_value = this.filterMaleCheckMale;
    
      (this.collUsr! as collectionUsers).filter_age_active = this.filterAgeCheck;
      (this.collUsr! as collectionUsers).filter_age_from = this.filterAgeCheckLow;
      (this.collUsr! as collectionUsers).filter_age_to = this.filterAgeCheckHigh;
      (this.collUsr! as collectionUsers).filterAndSort_commit();
      this.updateUsers();
    },
    clickOnAcceptServicesFilter(){//к услуге
      (this.collServ! as collectionServices).sort_by = this.sort_by;
      (this.collServ! as collectionServices).sort_dir = this.sort_dir;

      (this.collServ! as collectionServices).filter_category_active = this.filter_category_active;
      //for (id of rec) filter_category_enum push id
      (this.collServ! as collectionServices).filter_category_enum = this.filter_category_enum;

      (this.collServ! as collectionServices).filter_price_active = this.filter_price_active;
      (this.collServ! as collectionServices).filter_price_from = this.filter_price_from;
      (this.collServ! as collectionServices).filter_price_to = this.filter_price_to;
      (this.collServ! as collectionServices).filterAndSort_commit();
      this.updateServices();
    },
    //Очистить фильтры
    clickOnClearUserFilter(){//людей
      this.filterAgeCheck = false;
      this.filterAgeCheckLow = 0;
      this.filterAgeCheckHigh = 200;
      this.filterMaleCheck = false;
      this.filterMaleCheckMale = false;
      (this.collServ! as collectionUsers).filterClear();
      this.updateUsers();
    },
    clickOnClearServicesFilter(){//услуг
      this.sort_by = "not"//rating
      //фильтр по категории
      this.filter_category_active = false;
      this.filter_category_enum = [];
      //фильтр по цене
      this.filter_price_active = false;
      this.filter_price_from = (this.collServ! as collectionServices).maxPrice;
      this.filter_price_to = (this.collServ! as collectionServices).minPrice;
      (this.collServ! as collectionServices).filterClear();
      this.updateServices();
    },
    //Удалить точки
    clickOnDeleteUsers(){//Людей
      (this.collUsr! as collectionUsers).deleteMarkers();
      this.updateUsers();
    },
    clickOnDeleteServices(){//Услуг
      (this.collServ! as collectionServices).deleteMarkers();
      this.updateServices();
    },

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

