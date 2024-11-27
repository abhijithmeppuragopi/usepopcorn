import { useEffect } from "react";

// to listen to escape key press while displaying the movie and close the evenlistener instead of creating new listener all the time
export function useKeyPress(key,action){
useEffect(function (){
    function callback(e){
      if(e.code.toLowerCase()===key.toLowerCase()){
        action();
      }

    }

    document.addEventListener('keydown',callback)

    return function(){
      document.removeEventListener('keydown',callback)
    }
  },[action,key])
}