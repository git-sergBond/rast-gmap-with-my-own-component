import Point from '@/clases/Point';
type gMarker = google.maps.Marker;
type gMap = google.maps.Map;
//_gm_ объект связанный с библиотекой google.maps
/*
класс Точка оказания услуги, для google.maps
*/
export default class TradePoint extends Point{

    public pointid? : number;//id точки / null - если создана новая точка в клиентском приложении
    public name? : string;// название точки оказания услуг
    public address? : string;//адресс
    public phones? : string[];//массив имеющихся id телеФОНОВ
    public newPhones : number[] = [];//массив id новых созданных телеФОНОВ в клиентском приложении
    public categories : number[] =[];//ид категорий, к которым нужно привязать услугу

    constructor(sourcePoint : any, _gm_mapInst : gMap){
        super(sourcePoint.latitude,sourcePoint.longitude,_gm_mapInst);
        try{

            //данные принимаемые с сервера
            const {
                pointid,
                name,
                address,
                phones
            } = sourcePoint;

            this.pointid = !!pointid ? pointid : null
            this.name = name 
            this.address = address;
            this.phones = phones;

        } catch (e) {
            console.log('class UserPoint.constructor() :',e.message)
        }
    }
    
}