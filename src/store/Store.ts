import {decorate, observable, computed} from "mobx";

interface Category{
    [key:string]:string|number;
    id: number;
    name: string;
}

export class Store {
    categories:Category[] = [];   
    hasError:boolean = false;

    constructor(){
        fetch("https://opentdb.com/api_category.php")
        .then(response=>response.json())
        .then((data)=>{
            let categories:Category[] = data.trivia_categories;

            this.categories = categories.map((item)=>{
                if(item.name.indexOf(":") !== -1){
                    item.name = item.name.substring(item.name.indexOf(":")+2, item.name.length);
                }
                if(item.name === "Japanese Anime & Manga"){   
                    item.name = "Anime & Manga";
                }
                
                return item;
            });
        })
        .catch((error)=>this.hasError = true);
    }
}

decorate(Store, {
    categories: observable,
    hasError: observable,
})