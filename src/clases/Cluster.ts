import Point from '@/clases/Point';
import Map from '@/clases/Map'
import MarkerClusterer from 'marker-clusterer-plus'
export default class Cluster {
    constructor(points : Point[], map : Map){
        try{
            let arrPoints : google.maps.Marker[] = points.map(e => e.getInst())
            let clist : any = new MarkerClusterer(map.getInst(),arrPoints,{
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
              })
        } catch(e) {
            console.log('class Cluster.constructor()'+e.message)
        }
    }
}