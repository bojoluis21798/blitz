import {decorate, observable, computed} from "mobx";

interface ICategory{
    [key:string]:string|number;
    id: number;
    name: string;
}

const startingCoins = 100;

export class Store {
    categories:ICategory[] = [];    
    hasError:boolean = false;
    coins:number = 0;

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

        let coins = window.sessionStorage.getItem("coins");
        if(coins){
            this.coins = parseInt(coins);
        }else {
            window.sessionStorage.setItem("coins", startingCoins.toString());
            this.coins = startingCoins;
        }
    }

    addCoins(num:number){
        this.coins += num;
        window.sessionStorage.setItem("coins", this.coins.toString());
    }
}

decorate(Store, {
    categories: observable,
    hasError: observable,
    coins: observable,
})