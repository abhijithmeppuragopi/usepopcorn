import { useState,useEffect } from "react";


export function useLocalStorageState(initialState,key){
    const [value, setValue] = useState(function (){
        const watchedMovie=localStorage.getItem(key);
        return JSON.parse(watchedMovie)});
    
    useEffect(function(){
     localStorage.setItem(key,JSON.stringify(value))
      
        },[value,key])
        return [value,setValue]

}
