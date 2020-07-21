import {createContext, useContext} from "react";
import {Store} from "./Store";

const store = createContext({
    store: new Store()
})

export const useStore = ()=> useContext(store);