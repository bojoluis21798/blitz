import {decorate, observable, computed} from "mobx";

interface ICategory{
    [key:string]:string|number;
    id: number;
    name: string;
}

export class Store {
    categories:ICategory[] = [];    
    hasError:boolean = false;
    score:number = 0;

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

        let score = window.sessionStorage.getItem("score");
        if(score){
            this.score = parseInt(score);
        }else {
            window.sessionStorage.setItem("score", "0");
        }
    }

    addScore(num:number){
        this.score += num;
        window.sessionStorage.setItem("coins", this.score.toString());
    }
}

decorate(Store, {
    categories: observable,
    hasError: observable,
    score: observable,
})