import { request } from "../../request/http";
// import { get } from "https";
//获取侧边栏相关数据
export function getNavMenu(data){
    return request({
        url:'/sys/menu/nav',
        params:data,
        method:'get'
    })
}
export function addNewsForm(data){
    return request({
        url:'/news/addNewsInformation',
        data,
        method:'post'
    })
}
//新增下载中心的接口
export function addUploadForm(data){
    return request({
        url:'/document/upload/',
        data,
        method:'post'
    })
}
//查询新闻资讯
