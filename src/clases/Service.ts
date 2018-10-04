import TradePoint from '@/clases/TradePoint';
import Map from '@/clases/Map';
export default class Service{
    //работа с метками
    serviceid : number
    subjectid : number
    description : string
    pricemin : number
    pricemax : number
    subjecttype : string
    datepublication : string
    regionid : number
    name : string
    rating : number
    ratingcount : number
    images : string[]
    /*categories */
    points : TradePoint[] = []
    //работа с ГУИ
    private map? : Map;//ссылка на карту к которой привязан маркер
    private events : any[] = [];//события для точек
    //
    constructor(parseService : any, map : Map, events : any[]){
        this.serviceid = parseService.service.serviceid;
        this.subjectid = parseService.service.subjectid;
        this.description = parseService.service.description;
        this.pricemin = parseService.service.pricemin;
        this.pricemax = parseService.service.pricemax;
        this.subjecttype = parseService.service.subjecttype;
        this.datepublication = parseService.service.datepublication;
        this.regionid = parseService.service.regionid;
        this.name = parseService.service.name;
        this.rating = parseService.service.rating;//рейтинг
        this.ratingcount = parseService.ratingcount;//кол-во отзывов 

        /*
        this.categories = []
        for(let categori of parseService.categories){
            this.categories.push(new Categori(categori,mapIsnt,VueContext));
        }
        */

        this.points = [];
        for(let point of parseService.points){
            this.points.push(new TradePoint(point,map));
        }

        this.images = parseService.images

        //гуи
        this.map = map;
        this.events = events;
        this.points.forEach(e=>e.addEvents(this.events))        
    }
    setVisiblePoints(vis : boolean){
        this.points.forEach(e=>e.setVisible(vis));
    }
    deletePoints(){
        this.points.forEach((e : TradePoint) => e.setMap(null));
    }
}
