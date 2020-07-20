import {createContext, useContext} from "react";
import {Store} from "./Store";

const store = createContext({
    store: new Store()
})

console.log("creted instance");

export const useStore = ()=> useContext(store);