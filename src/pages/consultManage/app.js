import { request } from "../../request/http";
// import { get } from "https";
//新增新闻资讯
export function addNewsForm(data){
    return request({
        url:'/news/addNewsInformation',
        data,
        method:'post'
    })
}
//查询新闻资讯
export function searchNewsTable(data){
    return request({
        url:'/news/searchAllNewsInformation',
        params:data,
        method:'get'
    })
}