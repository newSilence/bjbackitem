import { request } from "../request/http";
// import { get } from "https";
//登录
//获取nav
export function Logout(data){
    return request({
        url:'logout',
        params:data,
        method:'get'
    })
}
// export function login(data){
//     return request({
//         url:'logout',
//         data,
//         method:'post'
//     })
// }