import axios from  'axios'
export default class collectionCategories {
    //запрос на получение списка категорйи
    static async getCategoriesForSite(){
        let treeCategories = null
        try{
            let res = await axios({url: 'CategoriesAPI/getCategoriesForSite', method: 'GET' })
            treeCategories = {
                name:"Категории", 
                child: res.data.categories,
                root: true
            }
        }catch(e){
            console.log("class Categori.getCategoriesForSite() : " + e.message)
        }
        return treeCategories
    }
}