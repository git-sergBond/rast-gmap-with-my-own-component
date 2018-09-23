export default class Map {

    private _vue_DOMelement? : Element
    private _gm_mapInst? : google.maps.Map
    private lat? : number
    private lng? : number
    private zoom? : number

    constructor(_vue_DOMelement : Element, lat : number, lng : number, zoom : number){
        this.lat = lat;
        this.lng = lng;
        this.zoom = zoom;
        this._vue_DOMelement = _vue_DOMelement;
        this._gm_mapInst = new google.maps.Map(_vue_DOMelement, {
            center: {
              lat,
              lng
            },
            zoom
        })
    }
    getInst() : google.maps.Map{
        return this._gm_mapInst as google.maps.Map;
    }
}