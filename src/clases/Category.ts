export default class Categori {
    id : number = -1
    categoryname : string = 'no name'
    parentid : number = -1
    description : string = 'no description'
    img : string = 'no image'
    constructor(parseCategori : any){
        try{
            this.id = parseCategori.id; //categoryid
            this.categoryname = parseCategori.categoryname;
            this.parentid = parseCategori.parentid;
            this.description = parseCategori.description;
            this.img = parseCategori.img
        }catch(e){
            console.log("class Categori.constructor() : " + e.message)
        }
    }
}