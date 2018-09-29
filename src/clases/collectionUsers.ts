import UserPoint from '@/clases/UserPoint';
import Map from '@/clases/Map';
import Cluster from '@/clases/Cluster';
export default class collectionUsers {
    //
    public _srcData :  any[] = [];//источник данных
    public _objData : UserPoint[] = [];// объекты точек
    //
    private map? : Map;//ссылка на карту к которой привязан маркер
    private events : any[] = [];
    private cluster? : Cluster;
    //
    constructor(map : Map, events : any[]){
        this.map = map;
        this.events = events;
    }
    //запросить данные
    async getData(){
        this._srcData = [
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
                "lasttime": "2002-09-08 16:00:30+00",
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
                "lasttime": "1990-09-08 16:00:30+00",
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
                "lasttime": "1998-09-08 16:00:30+00",
                "male": 1,
                "birthday": null,
                "pathtophoto": null,
                "status": null
            }
        ]
    }
    //выыести на экран
    drawData(){
        this._objData = [];
        for(let p of  this._srcData){
            let e = new UserPoint(p,this.map as Map);
            e.addEvents(this.events)
            this._objData.push(e);
        }
        this.cluster = new Cluster(this._objData,this.map as Map);
    }
    deletData(){
        this._objData.forEach((e : UserPoint) => {
            e.setMap(null);
        });
    }
    async display(){
        await this.getData();
        this.drawData();
    }
    //очистить фильтрацию
    filterClear(){
        this._objData.forEach((e : UserPoint) => {
            e.setVisible(true);
        });
    }
    //фильтр по полу
    filterBy_male(male : boolean){
        this._objData.forEach((e : UserPoint) => {
            if(Boolean(e.male) != male){
                e.setVisible(false);
            }
        });
    }
    //фильтр по возрастц
    filterBy_age(ageLow : number, ageHigh : number = 200){
        const date_now : number = new Date(Date.now()).getFullYear();
        this._objData.forEach((e : UserPoint) => {
            const  birthDay = new Date(Date.parse(e.birthday as string)).getFullYear();
            const curAge = date_now - birthDay;
            if(ageLow > curAge || curAge > ageHigh ){
                e.setVisible(false);
            }
        });
    }
    //Фильтр по округу
    filterBy_district(district : number){
        throw new Error("Метод collectionUsers.filterBy_district не реализован");
    }
    //Фильтр по наличию в online
    filterBy_online(online : number){
        throw new Error("Метод collectionUsers.filterBy_online не реализован");
    }
    //Сортировка по определенным полям
    sortBy_male(male : boolean){
        //сортировака
    }

}