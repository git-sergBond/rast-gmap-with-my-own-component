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
    //вычисляеме свойства
    public minPrice : number = 0;
    public maxPrice : number = 0;
    constructor(map : Map, events : any[]){
        this.map = map;
        this.events = events;
    }

    //запросить данные
    async getData(){
        this.srcData = [
            {
                "service": {
                    "serviceid":40,
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
                    },
                    {
                        "pointid":17,
                        "name":"назовите метку",
                        "longitude":"37.587223",
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
                            "pointid":18,
                            "name":"назовите метку",
                            "longitude":"36.587223",
                            "latitude":"49.59566",
                            "fax":null,
                            "time":null,
                            "email":null,
                            "usermanager":null,
                            "website":null,
                            "address":"Белгород, Соборная площадь"
                        },
                        {
                            "pointid":19,
                            "name":"назовите метку",
                            "longitude":"37.587223",
                            "latitude":"51.59566",
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
        this.objData = [];
        this.cluster = new Cluster([],this.map as Map);
        for(let srcObj of this.srcData){
            let servObj = new Service(srcObj,this.map!,this.events);
            for(let p of servObj.points){
                this.cluster.addMark(p);
            }
            this.objData.push(servObj);
        }
    }
    /* удаление точек */
    //удалить точки с карты
    deletMarkersFromMap(){
        this.objData.forEach((e : Service) => {
            e.deletePoints();
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
    }
    /* отобразить (обновить даные) */
    async display(){
        await this.getData();
        this.drawData();
        this.getMaxAndMinPrice();
        this.filterClear();
    }
    /* ФИЛЬТРАЦИЯ и СОРТИРОВКА*/
    /*
    <<<параметры>>>
    */
    //сортировка 
    public sort_by : string = "rating";//not
    public sort_dir : boolean = false;
    //фильтр по категории
    public filter_category_active : boolean = false;
    public filter_category_enum : number[] = [];
    //фильтр по цене
    public filter_price_active : boolean = false;
    public filter_price_from : number = 0;
    public filter_price_to : number = 0;
    /*
    <<<Функции>>>
    */
    //очистить фильтрацию
    filterClear(){
        try {
            this.outData = this.objData;
            //сортировка 
            this.sort_by = "rating"
            this.sort_dir = false;
            //фильтр по категории
            this.filter_category_active = false;
            this.filter_category_enum = [];
            //фильтр по цене
            this.filter_price_active = false;
            this.filter_price_from = this.minPrice;
            this.filter_price_to = this.maxPrice;
            this.objData.forEach((e : Service) => e.setVisiblePoints(true));
            this.cluster!.repaint();
        } catch ( e ) {
            alert('collectionUsers.filterClear() '+e.message)
        }
    }
    getMaxAndMinPrice(){
        let max : number = this.objData[0].pricemax;
        let min : number = this.objData[0].pricemax;
        for(let serv of this.objData){
            if(serv.pricemax > max) max = serv.pricemax;
            if(serv.pricemin > max) max = serv.pricemin;
            if(serv.pricemax < min) min = serv.pricemax;
            if(serv.pricemin < min) min = serv.pricemin;
        }
        this.maxPrice = max;
        this.minPrice = min;
    }
    //фильтрация и сортировка
    filterAndSort_commit(){
       
        let context = this;

        try{
 /*
        this.outData = [];
        
        //фильтрация
        this.objData.forEach((e : UserPoint) => {
            
            let calcVisible = true;
            if(context.filter_age_active) if(context.filter_age_from > e.age || e.age > context.filter_age_to) calcVisible = false;
            if(context.filter_male_active) if(Boolean(e.male) != context.filter_male_value) calcVisible = false;
            if(calcVisible) {
                e.setVisible(false);
                context.outData.push(e)
            }else{
                e.setVisible(true);
            }
        });*/
    
        //сортировка
        this.outData = this.outData.sort((A : Service, B : Service) => {
            let res = -1;
            if(this.sort_dir){
                if(A.rating > B.rating) res = 1;
            }else{
                if(A.rating < B.rating) res = 1;
            }
            return res;
        });

        this.cluster!.repaint();
        
    }catch(e){
            console.log("collectionUsers.filterAndSort_commit()",e);
    }
    }
}