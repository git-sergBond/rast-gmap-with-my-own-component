type gMarker = google.maps.Marker;
type gMap = google.maps.Map;
//_gm_ объект связанный с библиотекой google.maps
/*
класс Точка, для google.maps
*/
export default class Point {

    protected _gm_markInst? : gMarker;//ссылка на объект маркера
    protected _gm_mapInst? : gMap;//ссылка на карту к которой привязан маркер

    constructor(lat : number, lng : number, _gm_mapInst : gMap) {
        try {
            this._gm_mapInst = _gm_mapInst;
            this._gm_markInst = new google.maps.Marker({
                map: _gm_mapInst,
                position: {
                    lat, lng
                }
            });
        } catch (e) {
            console.log('class Point.constructor() :',e.message)
        }
    }

/*
    //измененить название на иконке, которое будет соответствовать точке
    changeCaption(){
    }
    //установить координаты
    setCoords(coords){
        let context = this;
        try{
            this.latitude = coords[0];//широта
            this.longitude = coords[1];//долгота
            this.pointInst.geometry.setCoordinates(coords);//меняем координаты метки
            //вычисляем адрес метки, относительно координат
            let res = ymaps.geocode([this.latitude,this.longitude]);
            res.then(res=>{
                let firstGeoObject = res.geoObjects.get(0);
                let address = firstGeoObject.getAddressLine();
                context.address = address;
            });
        }catch(e){
            console.log('class TradePoint.setCoords() : '+e.message)
        }
    }
    //установить координаты, по адресу метки
    setCoordsForAdress(){
        let context = this
        try{
            let res = ymaps.geocode(this.address);
            res.then(res=>{
                let coord = res.geoObjects.get(0).geometry.getCoordinates()
                context.setCoords(coord)
            });
        }catch(e){
            console.log('class TradePoint.setCoordsForAdress() : '+e.message)
        }
    }
    //метод отрисовки метки на карте
    DrawOnMap(properties={},events=[],draggable=false){
        let context = this
        let p = new ymaps.Placemark([this.latitude,this.longitude], 
        {
            iconCaption: context.name
        }, 
        {
            preset: 'islands#darkblueDotIconWithCaption',
            draggable: draggable
        });
        this.pointInst = p;
        try{

            p.properties.set({
                linkOnStruct: context,//сылка на структуру, для обратной связи
            });
            if(!!properties) p.properties.set({
                ...properties //сохраняем важные данные
            });
        
            this.addEvents(events);
        
            this.mapIsnt.geoObjects.add(p);
        }catch(e){
            console.log('class TradePoint.DrawOnMap() : '+e.message)
        }
        return p;
    }
    //добавление событий
    addEvents(events){
        //click, драг(dragend), двойной клик, наведение
        if(!!events) for(let {name,event} of events) {
            this.pointInst.events.add(name, event);
        }
    }
    //установка видимости метки
    SetVisibleOnMap(vis){
        try{
            this.pointInst.options.set({ "visible": vis});
        }catch(e){
            console.log('class TradePoint.SetVisibleOnMap() : '+e.message)
        }
    }
*/
}
