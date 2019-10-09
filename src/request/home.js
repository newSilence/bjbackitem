import {request} from './http'
export function getData(data){
    return request({
        url:'',
        params:data,
        method:'get'
    })
}
export function getData(data){
    return request({
        url:'',
        data,
        method:'post'
    })
}