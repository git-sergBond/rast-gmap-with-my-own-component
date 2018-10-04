import TradePoint from '@/clases/TradePoint';
import Map from '@/clases/Map';
import Cluster from '@/clases/Cluster';
import Service from '@/clases/Service';
export default class collectionServices {
    //работа с метками
    public srcData : any[] = [];//источник данных, из сервера в виде спарсенного json
    public objData : Service[] = [];// объекты точек, для работы с картой
    public outData : Service[] = [];// данные с сортироввками и фильтрами
    //работа с ГУИ
    private map? : Map;//ссылка на карту к которой привязан маркер
    private events : any[] = [];//события для точек
    private cluster? : Cluster;// объект кластера
    //
    constructor(map : Map, events : any[]){
        this.map = map;
        this.events = events;
    }

    //запросить данные
    async getData(){
        this.srcData = [
            {
                "service": {
                    "serviceid":39,
                    "subjectid":6,
                    "description":
                    "блаблабла\r\r\n\rВидео: ",
                    "pricemin":321,
                    "pricemax":12312,
                    "deleted":false,
                    "subjecttype":0,
                    "deletedcascade":false,
                    "datepublication":
                    "2018-08-09T21:07:55+00:00",
                    "regionid":1,
                    "name":"бла-бла",
                    "numberofdisplay":0,
                    "rating":5
                },
                "points":[
                    {
                        "pointid":16,
                        "name":"назовите метку",
                        "longitude":"36.587223",
                        "latitude":"50.59566",
                        "fax":null,
                        "time":null,
                        "email":null,
                        "usermanager":null,
                        "website":null,
                        "address":"Белгород, Соборная площадь"
                    }
                ],
                "userinfo":{
                    "userid":6,
                    "firstname":"Алексей",
                    "lastname":"Арраков",
                    "patronymic":"",
                    "birthday":"1994-01-23",
                    "male":1,
                    "address":"улица Волоколамская и еще некоторые",
                    "about":"Ну о себе можно много чего рассказать, поэтому я не стану этого делать. Ну наверно, не буду... Я ещё подумаю.","status":null,"ratingexecutor":"5","ratingclient":"5","pathtophoto":"images\/users\/6_2.jpg"
                },
                "categories":[
                    {"categoryid":17,"categoryname":"Грузчик","parentid":null,"description":"Ну  так все ясно","img":null},
                    {"categoryid":14,"categoryname":"Мобильная разработка","parentid":20,"description":"Создание мобильных приложений","img":null},
                    {"categoryid":11,"categoryname":"Ремонт и строительство","parentid":null,"description":"Ремонт всякой всячины и строительство другой всячины","img":null},
                    {"categoryid":18,"categoryname":"Организация мероприятий","parentid":15,"description":"Удивительно, но \"ехха\" эта крайне неблагодарная отрасль связана с развлечениями.","img":null}
                ],
                "images":[
                    {"imageid":null,"serviceid":39,"imagepath":"\/images\/no_image.jpg"}
                ],
                "ratingcount":0}, 
            ]
    }
    //выыести на экран
    drawData(){
        this.objData = []
        for(let srcObj of this.srcData){
            let servObj = new Service(srcObj,this.map!,this.events);
            this.objData.push(servObj);
        }

        //this.cluster = new Cluster(this.objData,this.map as Map);
    }
    /* удаление точек 
    //удалить точки с карты
    deletMarkersFromMap(){
        this.objData.forEach((e : UserPoint) => {
            e.setMap(null);
        });
    }
    //удалить точки из кластера
    deleteMarkersFromClusterer(){
        this.cluster!.clearMarkers();
    }
    //удалить точки и почистить данные
    deleteMarkers(){
        this.deletMarkersFromMap();
        this.deleteMarkersFromClusterer();
        this.outData = [];
    }*/
    /* отобразить (обновить даные) */
    async display(){
        await this.getData();
        this.drawData();
       // this.filterClear();
    }
}