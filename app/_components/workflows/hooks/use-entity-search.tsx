import { PAGINATION } from "@/app/config/constants";
import { useEffect, useState } from "react";

interface UseEntitySearchProps <T extends{
    search:string;
    page:number
}>{
    params:T;
    setParams: (params:T) => void;
    deboundMs? :number
}

export function useEntitysearch<T extends {
    search: string;
    page:number
}>({params ,setParams, deboundMs=500}: UseEntitySearchProps){
    const [localSearch, setLocalSearch] = useState(params.search)
    useEffect(()=>{
        if(localSearch=== "" && params.search !== ""){
            setParams({
                ...params,
                search:"",
                page:PAGINATION.DEFAULT_PAGE,
            })
            return;
        }
        const timer  = setTimeout(()=>{
            if(localSearch!== params.search){
                setParams({
                    ...params,
                    search: localSearch,
                    page: PAGINATION.DEFAULT_PAGE,
                })
            }
        }, deboundMs)
        return ()=> clearTimeout(timer);

    },[localSearch, params, setParams, deboundMs])
    
    useEffect(()=>{
        setLocalSearch(params.search)
    },[params.search])
    return{
        searchValue : localSearch,
        onSearchChange: setLocalSearch
    }
}