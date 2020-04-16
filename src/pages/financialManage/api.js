import { request } from "../../request/http";

//确认新增某个目录
export function saveMenuData(data){
    return request({
        url:'/web/webmenu/save',
        data,
        method:'post'
    })
}
//收款管理列表
export function getTableListData(data){
    return request({
        url:'/manager/payOrder/selectAll',
        params:data,
        method:'get'
    })
}
//收款管理查询详情
export function getItemDetail(data){
    return request({
        url:'/manager/payOrder/selectDetail',
        params:data,
        method:'get'
    })
}
//备注保存
export function upDateRemark(data){
    return request({
        url:'/manager/payOrder/upRemarks',
        params:data,
        method:'get'
    })
}
//导出
export function exportList(data){
    return request({
        url:'/manager/payOrder/exportList',
        params:data,
        method:'get'
    })
}
// //备注保存
// export function upDateRemark(data){
//     return request({
//         url:'/manager/payOrder/upRemarks',
//         data,
//         method:'post'
//     })
// }