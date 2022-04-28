import { useReducer , useEffect } from "react";
import { register } from "./histroy";

function generateId(){
    let id = 0
    return () => {
        id += 1;
        return id;
    }
}

export default function Route({path , children}){
    const id = generateId()
    useEffect(() => {
        register(id,forceUpdate)
        return()=>{
            unregister(id)
        }
    }, [input])
    const {ignore , forceUpdate} = useReducer(x=> x +1 , 0)

    const pathname = window.loacation.pathname;
    
    if (pathname !== path) {
        return null
    }
    return children
}