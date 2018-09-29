import Point from '@/clases/Point';
import Map from '@/clases/Map'
import MarkerClusterer from 'marker-clusterer-plus'
export default class Cluster {
    private clist? : any;
    private arrPoints? : google.maps.Marker[];
    constructor(points : Point[], map : Map){
        try{
            let arrPoints : google.maps.Marker[] = points.map(e => e.getInst())
            this.clist = new MarkerClusterer(map.getInst(),arrPoints,{
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
              })
        } catch(e) {
            console.log('class Cluster.constructor()'+e.message)
        }
    }
    clearMarkers(){
        try{
        this.clist.clearMarkers();
        this.clist.repaint();
        }catch(e){
            alert('Cluster.clearMarkers()'+e.message)
        }
    }
}