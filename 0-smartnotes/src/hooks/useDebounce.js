import { useEffect, useState } from "react";

export function useDebounce(value, delay){
   const [debouncedValue, setDebouncedValue] = useState(value); 
   // state that stores the debounced (delayed) value
   
   useEffect(()=>{
    const timer = setTimeout(() => setDebouncedValue(value), delay); 
    // wait for "delay" milliseconds before updating the debounced value

    return () => clearTimeout(timer); 
    // cleanup: cancel the previous timeout if value/delay changes or component unmounts
    
   }, [value, delay]); 
   // useEffect runs whenever "value" or "delay" changes

   return debouncedValue; 
   // return the debounced value to the component using this hook
}