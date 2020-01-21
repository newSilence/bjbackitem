import { request } from "../../request/http";
// import { get } from "https";
//获取管理员管理列表数据
export function getAdminManageTable(data){
    return request({
        url:'/web/webuser/list',
        params:data,
        method:'get'
    })
}
// 查看某个用户详细信息
export function getUserDetailInfo(data){
    return request({
        url:'/web/webuser/userInfo',
        params:data,
        method:'get'
    })
}
//新增用户接口
export function saveAdminUser(data){
    return request({
        url:'/web/webuser/save',
        data,
        method:'post'
    })
}
//编辑用户接口
export function updateAdminUser(data){
    return request({
        url:'/web/webuser/update',
        data,
        method:'post'
    })
}
//获取所有角色
export function getAllRoleData(data){
    return request({
        url:'/web/webrole/list',
        params:data,
        method:'get'
    })
}
//获取所属部门
export function getAllDepartData(data){
    return request({
        url:'/sys/dept/list',
        params:data,
        method:'get'
    })
}
//获取所属部门里所属部门下拉框值
export function getAllAboutOneDepartData(data){
    return request({
        url:'/sys/dept/select',
        params:data,
        method:'get'
    })
}
//确认编辑某部门
export function updateDept(data){
    return request({
        url:'/sys/dept/update',
        data,
        method:'post'
    })
}

//确认新增某部门
export function saveDeptData(data){
    return request({
        url:'/sys/dept/save',
        data,
        method:'post'
    })
}
//获取功能权限
export function getAllFuncPerm(data){
    return request({
        url:'/web/webmenu/list',
        params:data,
        method:'get'
    })
}
//获取功能权限下拉框包含一级目录
export function getAllSelectFuncPerm(data){
    return request({
        url:'/web/webmenu/select',
        params:data,
        method:'get'
    })
}
//确认新增某角色
export function saveRoleData(data){
    return request({
        url:'/web/webrole/save',
        data,
        method:'post'
    })
}
//某个角色的具体信息
export function getRoleDetailInfo(data){
    return request({
        url:'/web/webrole/info',
        params:data,
        method:'get'
    })
}

//确认编辑某角色
export function updateRoleData(data){
    return request({
        url:'/web/webrole/update',
        data,
        method:'post'
    })
}
//确认编辑某个目录
export function updateMenuData(data){
    return request({
        url:'/web/webmenu/update',
        data,
        method:'post'
    })
}
//删除某一条功能权限
export function deleteMenuData(data){
    return request({
        url:'/web/webmenu/delete',
        data,
        method:'post'
    })
}
//确认新增某个目录
export function saveMenuData(data){
    return request({
        url:'/web/webmenu/save',
        data,
        method:'post'
    })
}