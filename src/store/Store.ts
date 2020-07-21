import {decorate, observable, computed} from "mobx";

interface ICategory{
    [key:string]:string|number;
    id: number;
    name: string;
}

export class Store {
    public categories:ICategory[] = [];    
    public hasError:boolean = false;
    public coins:number = 0;

    constructor(){
        fetch("https://opentdb.com/api_category.php")
        .then(response=>response.json())
        .then((data)=>{
            let categories:ICategory[] = data.trivia_categories;

            this.categories = categories.map((item)=>{
                if(item.name.indexOf(":") !== -1){
                    item.name = item.name.substring(item.name.indexOf(":")+2, item.name.length);
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