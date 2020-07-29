import {decorate, observable, computed} from "mobx";

export class Store {
    categories:Trivia.Category[] = [];
    activeCategory: Trivia.Category;    
    hasError:boolean = false;

    constructor(){
        fetch("https://opentdb.com/api_category.php")
        .then(response=>response.json())
        .then((data)=>{
            let categories:Trivia.Category[] = data.trivia_categories;

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