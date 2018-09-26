import Point from '@/clases/Point';
import Map from '@/clases/Map'
type gMarker = google.maps.Marker;
type gMap = google.maps.Map;
//_gm_ объект связанный с библиотекой google.maps
/*
класс Пользователь оказания услуги, для google.maps
*/
/*

*/
export default class UserPoint extends Point{

    userid?: Number
    email?: string
    phone?: string
    firstname?: string
    lastname?: string
    patronymic?: string
    lasttime?: string // "2019-09-08 16:00:30+00",
    male?: Number
    birthday?: string // "1997-05-25 00:00:00+00",
    pathtophoto?: string // "images/users/d4dd0c47.jpg",
    status?: string

    constructor(sourceUser : any, _gm_mapInst : Map){
        super(Number(sourceUser.latitude),Number(sourceUser.longitude),_gm_mapInst.getInst());
        try{

            //данные принимаемые с сервера
            const {
                userid,
                email,
                phone,
                firstname,
                lastname,
                patronymic,
                lasttime,
                male,
                birthday,
                pathtophoto,
                status
            } = sourceUser;

            this.userid = !!userid ? userid : null;
            this.email = email;
            this.phone = phone;
            this.firstname = firstname;
            this.lastname = lastname;
            this.patronymic = patronymic;
            this.lasttime = lasttime;
            this.male = Number(male);
            this.birthday = birthday;
            this.pathtophoto = pathtophoto;
            this.status = status;

            if(Boolean(male)){
                this.setIconColor(Point.yelow)
            } else {
                this.setIconColor(Point.blue)
            }        

        } catch (e) {
            console.log('class UserPoint.constructor() :',e.message)
        }
    }
    
    preProperties(){
               
    }
}