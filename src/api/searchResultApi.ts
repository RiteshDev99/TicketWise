import axios from "axios";
import conf from "../conf/conf";

const SearchResults = async() => {
    try{
        const response = await axios.get(conf.searchSuggestionApi,{
            params:{}

        });
        

    }catch(error){
        console.log("Search Result::", error);
        
    }
}