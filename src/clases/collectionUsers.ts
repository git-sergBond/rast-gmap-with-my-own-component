import UserPoint from '@/clases/UserPoint';
import Map from '@/clases/Map';
import Cluster from '@/clases/Cluster';
export default class collectionUsers {
    //работа с метками
    public srcData : any[] = [];//источник данных, из сервера в виде спарсенного json
    public objData : UserPoint[] = [];// объекты точек, для работы с картой
    public outData : UserPoint[] = [];// данные с сортироввками и фильтрами
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
        this.objData = [];
        for(let p of  this.srcData){
            let e = new UserPoint(p,this.map as Map);
            e.addEvents(this.events)
            this.objData.push(e);
        }
        this.cluster = new Cluster(this.objData,this.map as Map);
    }
    /* удаление точек */
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
    }
    /* отобразить (обновить даные) */
    async display(){
        await this.getData();
        this.drawData();
        this.filterClear();
    }

    /* ФИЛЬТРАЦИЯ и СОРТИРОВКА*/
    /*
    <<<параметры>>>
    */
    //фильтр по полу
    public filter_male_active : boolean = false;
    public filter_male_value : boolean = false;
    //фильтр по возрастц
    public filter_age_active : boolean = false;
    public filter_age_from : number = 0;
    public filter_age_to : number = 500;
    //Фильтр по округу
    //...
    //Фильтр по наличию в online
    //...
    /*
    <<<Функции>>>
    */
    //очистить фильтрацию
    filterClear(){
        try {
            this.outData = this.objData;
            //фильтр по полу
            this.filter_male_active = false;
            this.filter_male_value = false;
            //фильтр по возрастц
            this.filter_age_active = false;
            this.filter_age_from = 0;
            this.filter_age_to = 500;
            //Фильтр по округу
            //---
            //Фильтр по наличию в online
            //---
            this.objData.forEach((e : UserPoint) => {
                e.setVisible(true);
            });
            this.cluster!.repaint();
        } catch ( e ) {
            alert('collectionUsers.filterClear() '+e.message)
        }
    }
    //фильтрация и сортировка
    filterAndSort_commit(){
        let context = this;

        try{

        this.outData = [];
        
        //фильтрация
        this.objData.forEach((e : UserPoint) => {
            
            let calcVisible = true;
            if(context.filter_age_active) if(context.filter_age_from > e.age || e.age > context.filter_age_to) calcVisible = false;
            if(context.filter_male_active) if(Boolean(e.male) != context.filter_male_value) calcVisible = false;
            if(calcVisible) {
                e.setVisible(true);
                context.outData.push(e)
            }else{
                e.setVisible(false);
            }
        });
        this.cluster!.repaint();
        
    }catch(e){
            console.log("collectionUsers.filterAndSort_commit()",e);
    }
    }
}