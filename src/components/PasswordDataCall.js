
import Axios from "axios";
import {getRecordURL,addRecordURL} from './Constants';



export function getRecord(json){
    console.log(json)
    
    const header ={ "Content-Type": "application/json" };
    return Axios.request(
        {
            method:"POST",
            url : getRecordURL,
            data : json,
            headers: header,
            credentials: 'include'
        }
    ).then(res=>res)
}


export function addRecord(json){
    
    return Axios.request({
        method: "POST",
        data: json,
        url: addRecordURL,
        headers: {"Content-Type": "application/json" },
    })
    .then(res => res)
        // .catch(err => alert(err));
}

