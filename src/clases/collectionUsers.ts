import UserPoint from '@/clases/UserPoint';
import Map from '@/clases/Map';
import Cluster from '@/clases/Cluster';
export default class collectionUsers {
    public _srcData :  any[] = [];
    public _objData : UserPoint[] = [];
    private map? : Map;//ссылка на карту к которой привязан маркер
    private events : any[] = [];
    private cluster? : Cluster;
    constructor(map : Map, events : any[]){
        this.map = map;
        this.events = events;
    }
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
    }
    drawData(){
        this._objData = [];
        for(let p of  this._srcData){
            let e = new UserPoint(p,this.map as Map);
            e.addEvents(this.events)
            this._objData.push(e);
      }
      this.cluster = new Cluster(this._objData,this.map as Map);
    }
    async display(){
        await this.getData();
        this.drawData();
    }
}