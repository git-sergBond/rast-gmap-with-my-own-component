import Point from '@/clases/Point';
import Map from '@/clases/Map';
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

    constructor(sourceTrade : any, _gm_mapInst : Map){
        super(Number(sourceTrade.latitude), Number(sourceTrade.longitude), _gm_mapInst.getInst());
        try{

            //данные принимаемые с сервера
            const {
                pointid,
                name,
                address,
                phones
            } = sourceTrade;

            this.pointid = !!pointid ? pointid : null
            this.name = name 
            this.address = address;
            this.phones = phones;

            this.setIconColor(Point.red);

        } catch (e) {
            console.log('class UserPoint.constructor() :',e.message)
        }
    }
    
}