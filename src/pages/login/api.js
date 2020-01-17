import { request } from "../../request/http";
// import { get } from "https";
//登录
export function login(data){
    return request({
        url:'/sys/login',
        data,
        method:'post'
    })
}

//获取nav
export function getNavMenuData(data){
    return request({
        url:'/sys/menu/nav',
        params:data,
        method:'get'
    })
}