<template>
    <div>
        <div class="map-comp reset-margin"
            @mouseup='mouseup_event_DrawPolygonByFinger'
            @mousedown='mousedown_event_DrawPolygonByFinger'>
            <div ref="ssgmap"  class="ymap"></div>
        </div>
        <search-line ref="searchln" class="search-line common-margin" 
        @drawServices=drawServices 
        @deletePoints=deletePoints
        @startDrawLine=startDrawLine
        ><!-- :getDiagonalMap=getDiagonalMap 
        :getCenterMap=getCenterMap--></search-line>

        <!--(1)-->
    </div>
</template>

<script lang='ts'>
/*

<!--(1)-->

<search-line ref="searchln" class="search-line common-margin" 
        @drawServices=drawServices 
        @deletePoints=deletePoints
        @startDrawLine=startDrawLine
        :getDiagonalMap=getDiagonalMap 
        :getCenterMap=getCenterMap
        ></search-line>
        <div class="map-menu-wrap">
            
        <div class="map-menu">
            <div class="logo">
                <img src="images/icons/лого.png">
            </div>
           
            <!-- v-if="isAuthorise == 'error'" -->
            <div     class="authorise"> 
                <div class="angle-hex-item item1"
                    @click="signIn"><img src="images/icons/open64.png"></div>
                <div class="angle-hex-item item2"
                    @click="signUp"><img src="images/icons/save64.png"></div>
            </div>
            
            <!-- v-if="isAuthorise == 'success'" -->
            <div  class="menu-items">
                <div>ЛК</div>
                <div>Уведомления</div>

                <div>профиль</div>
                <div>сообщения</div>
                <div>Авторизация</div>
            </div >
        </div>
        </div>
        <form-autorize ref="authForm"
        ></form-autorize>



*/
/*
import formAutorize from '../components/formAutorize.vue';


import TradePoint from '../clases/TradePoint.js';
import categoryVue from '../components/category.vue';


import Polygon from '../clases/Polygon.js';
import Polyline from '../clases/Polyline.js';
*/
import Vue from 'vue'
import Map from "../clases/Map"
import searchLine from './newSearchMap/searchLine.vue';
export default  Vue.extend({
    name: "newSearchMap",
    data(){
        return {
            /*
            //карта
            coords: [55.452376,37.372236],
            mapIsnt: null,
            authFormisactive: false,
            //
            drawPolyline: null,
            drawPolygon: null,
            //
            lineStringGeometry: null,
            lineString: null,
            line: null,
            stateDrawing: -1
            */
        }
    },
    components: {
        
        searchLine,/*
        formAutorize*/
    },
    computed: {
        isAuthorise(){
            return /*this.$store.state.status;*/ true
        }
    },
    methods: {
        async startDrawLine(){
            //активация режима рисованиz
            /*
            this.mapIsnt.behaviors.disable('drag');
            this.stateDrawing = 0
            */
        },
        mousedown_event_DrawPolygonByFinger(){
            //this.drawPolyline.startDraw();
            /*
            if (this.stateDrawing == 0) this.stateDrawing = 1;
            */
        },
        mouseup_event_DrawPolygonByFinger(){
            /*
            try{
                //this.drawPolyline.endDraw();
                if (this.stateDrawing == 1 && this.lineStringGeometry.getLength()>2) {
                    this.stateDrawing = -1;
                    this.getResult();
                    this.mapIsnt.behaviors.enable('drag');
                }
            } catch(e) {
                console.log('newSearchMap.mouseup_event_DrawPolygonByFinger() : ',e.message)
            }
            */
        },
        mousemoveDraw(){
            /*
            if (this.stateDrawing !== 1) return;
            const point = event.get('coords');
            const length = this.lineStringGeometry.getLength();
            this.lineStringGeometry.insert(length, point);
            */
        },
        async getResult() {
            /*
            try{
            //ищем среди объектов полигон и отправляем его на сервер
            let coordinates = this.lineStringGeometry.getCoordinates();
            //!добавляем точку в конец, чтобы не делать преобразований с полигоном
            this.lineStringGeometry.insert(this.lineStringGeometry.getLength(),this.lineStringGeometry.getCoordinates()[0]);
            //упрощаем геометрию линии, что бы можно было построить полигон
            let simple_line = this.alg_simplifi_line(coordinates);
            this.poly_line = simple_line;
            // передача информауии на сервер
            this.mapIsnt.geoObjects.removeAll();
            
            this.drawPolygon = new Polygon(simple_line,this.mapIsnt);
            this.lineStringGeometry = new ymaps.geometry.LineString([]);
            //
            const polygonBounds = this.drawPolygon.objInstanse.geometry.getBounds()
            const diagonalPoints = polygonBounds[0];
            const diagonal = {
                longitude: diagonalPoints[1],
                latitude: diagonalPoints[0]
            }
            //
            const centerPoint = ymaps.util.bounds.getCenter(polygonBounds)
            console.log(polygonBounds)
            console.log(centerPoint)
            const center = { 
                longitude: centerPoint[1], 
                latitude: centerPoint[0] 
            }

            await this.$refs.searchln.getServices({
                typeQuery:4,
                center,
                diagonal});

            this.newPolyline();
            this.drawPolygon = new Polygon(simple_line,this.mapIsnt);
            
            }catch(e){
                console.log('error newSearchMap.getResult : ',e.message)
            }*/
        },
        alg_simplifi_line(){
            /*
                let lenSimplifi = 5;
                //уменьшение колличества точек на линии
                let simle_arr = [];
                simle_arr.push(arr_in[0]);
                for (let index = 0; index < arr_in.length; index++) {
                    const el = arr_in[index]
                    if(index % lenSimplifi <= 0) simle_arr.push(el);
                }
                simle_arr.push(arr_in[arr_in.length-1]);
                return simle_arr;
                */
            },
        signIn(){
            /*this.$refs.authForm.isactive = true;
            this.$refs.authForm.numtab = 0;*/
        },
        signUp(){
            /*
            this.$refs.authForm.isactive = true;
            this.$refs.authForm.numtab = 1;
            */
        },
        newPolyline(){
            /*
            //this.mapInstanse = mapInstanse;
            this.lineStringGeometry = new ymaps.geometry.LineString([]);
            this.line = new ymaps.GeoObject({
                geometry: this.lineStringGeometry,
            }, {
                // Описываем опции геообъекта.
                fillColor: '#00FF00',// Цвет заливки.
                strokeColor: '#0000FF',// Цвет обводки.
                opacity: 0.5,// Общая прозрачность (как для заливки, так и для обводки).
                strokeWidth: 5,// Ширина обводки.
                strokeStyle: 'shortdash'// Стиль обводки.
            });
            this.mapIsnt.geoObjects.add(this.line); // Создаем инстанцию геообъекта и передаем нашу геометрию
            this.mapIsnt.events.add("mousemove", this.mousemoveDraw);
            this.stateDrawing = -1;//состояние рисования линии
            */
        },
        
        initHandler(){
            /*
            try{
                this.mapIsnt = myMap
                //this.drawPolyline = new Polyline([],this.mapIsnt);
                this.newPolyline();
            }catch(e){
                console.log("newSearchMap.initHandler() : "+ e.message)
            }*/
        },
        //получить координаты центра
        getCenterMap(){
            /*
            let context = this;
            const centerPoint = context.mapIsnt.getCenter();
            return centerPoint;
            */
        },
        //получить координаты двух точек диагонали
        getDiagonalMap(){
            /*
            let context = this;
            const diagonalPoints = context.mapIsnt.getBounds();
            return diagonalPoints;
            */
        },
        //Отрисовка точек предоставляющих услуги
        drawServices(){
            /*
            try{
                
                for(let service of services){
                    service.drawPoints(this.mapIsnt)
                    service.addEvents([
                        { name: 'click', event: this.eventClickOnPoint },
                    ])
                }
                
            }catch(e){
                console.log(e.message, 'background: #222; color: #bada55')
            }
            */
        },
        //удаление точек
        deletePoints(){
            /*
            try{
                this.mapIsnt.geoObjects.removeAll();
            }catch(e){
                console.log(e.message, 'background: #222; color: #bada55')
            }
            */
        },
        //событие клика на точку
        eventClickOnPoint(){
            /*
            let context = this
            let mapPoint = event.get('target');
            let objPoint = mapPoint.properties.get('linkOnStruct');
            context.$refs.searchln.showFullInfo(objPoint.services[0])
            */
        },
    },
    async mounted(){
        let map = new Map(this.$refs.ssgmap as Element, 55.452376, 37.372236, 8);
    }
})
</script>

<style scoped>


#ssgmap-id {
height: 500px;
width: 500px;
}


/*********************************************************/
/********-------------******ВЕРСТКА ЯНДЕКС КАРТ***********/
/*********************************************************/






/*отступы*/
.reset-margin{
    margin: 0;
}
.common-margin{
    margin: 5px;
}




/*позиционирование блоков*/
.search-line {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 100px;
}

/*яндекс карта*/
.ymap {
    width: 100%;
    height: 100vh ;
}
/* теги */
body{
    margin: 0;
}



/**/
.map-menu-wrap{
    width: 100%;
    height: 0px;
    display: flex;
    justify-content: center;
}
.map-menu{
    position: relative;
}
.map-menu .logo{
    position: absolute;
    top:-50px;
}
.map-menu .logo img{
    width: 40px;
    height: 40px;
}
.map-menu .authorise{
    position: absolute;
    top: -100px;
}
.angle-hex-item{
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    --proporions: 40px;
    width: var(--proporions);
    box-shadow: 0px 0px 30px -2px;
    height: var(--proporions);
}
.angle-hex-item:after{
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: -10px;
    border-right: 10px solid white;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
}
.angle-hex-item:before{
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    right: -10px;
    border-left: 10px solid white;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
}
.angle-hex-item img{
    width: 37px;
    height: 37px;
}
.angle-hex-item.item1{
    left: -35px;
}
.angle-hex-item.item2{
    right: -75px
}
</style>