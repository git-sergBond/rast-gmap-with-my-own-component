type gMarker = google.maps.Marker;
type gMap = google.maps.Map;
//_gm_ объект связанный с библиотекой google.maps
/*
класс Точка, для библиотеки google.maps
*/
export default class Point {

    public latitude? : number; //широта
    public longitude? : number;//долгота

    protected _gm_markInst? : gMarker;//ссылка на объект маркера
    protected _gm_mapInst? : gMap;//ссылка на карту к которой привязан маркер

    constructor(lat : number, lng : number, _gm_mapInst : gMap) {
        try {

            this.latitude = lat;//широта
            this.longitude = lng;//долгота

            this._gm_mapInst = _gm_mapInst;//ссылка на карту к которой привязан маркер
            this._gm_markInst = new google.maps.Marker({//создаем маркер
                map: _gm_mapInst,//привязываем карту
                position: {//указываем позицию
                    lat, lng
                }
            });
            
        } catch (e) {
            console.log('class Point.constructor() :',e.message)
        }
    }

    //изменение цвета
    static blue : string = "http://maps.google.com/mapfiles/ms/icons/blue.png";
    static yelow : string = "http://maps.google.com/mapfiles/ms/icons/yellow.png";
    static red : string = "http://maps.google.com/mapfiles/ms/icons/red.png";

    protected setIconColor(color : string){
        (this._gm_markInst as google.maps.Marker).setIcon(color)
    }

    //добавление событий
    public addEvents(events : any[]){
        //click, драг(dragend), двойной клик, наведение
        if(!!events) for(let {type , event} of events) {
            (this._gm_markInst as google.maps.Marker).addListener(type, event);
        }
    }

    //получить instance объекта гугл карты
    public getInst(){
        return this._gm_markInst as google.maps.Marker;
    }

    //удалить или установить карту
    public setMap(mapOrNull : any){
        try{
        (this._gm_markInst  as google.maps.Marker).setMap(mapOrNull);
        }catch(e){
            alert('setMap()')
        }
    }

    //установка видимости метки
    public setVisible(vis : boolean){
        try{
            (this._gm_markInst as google.maps.Marker).setVisible(vis);
        }catch(e){
            console.log('class TradePoint.setVisible() : '+e.message)
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
    
*/
}
