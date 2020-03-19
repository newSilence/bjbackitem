import { request } from "../../request/http";
// import { get } from "https";
//获取管理员管理列表数据
export function getAdminManageTable(data){
    return request({
        url:'/sys/user/list',
        params:data,
        method:'get'
    })
}
// 查看某个用户详细信息
export function getUserDetailInfo(data){
    return request({
        url:'/sys/user/userInfo',
        params:data,
        method:'get'
    })
}
//新增用户接口
export function saveAdminUser(data){
    return request({
        url:'/sys/user/save',
        data,
        method:'post'
    })
}
//编辑用户接口
export function updateAdminUser(data){
    return request({
        url:'/sys/user/update',
        data,
        method:'post'
    })
}
//获取所有角色
export function getAllRoleData(data){
    return request({
        url:'/web/webrole/list',
        // data,
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
//查询当前账户分配的角色
export function getAccountPermWebrole(data){
    return request({
        url:'/web/webuser/userInfo',
        params:data,
        method:'get'
    })
}
//账户分配角色，角色的下拉列表
export function getAccountMemPermWebrole(data){
    return request({
        url:'/web/webrole/select',
        params:data,
        method:'get'
    })
}
//确认账户分配角色
export function setAccountRolePerUrl(data){
    return request({
        url:'/web/webuser/updateUserRole',
        data,
        method:'post'
    })
}
//

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
//角色启用禁用
export function updateRoleStatus(data){
    return request({
        url:'/web/webrole/updateStatus',
        data,
        method:'post'
    })
}
// //确认编辑某个目录
// export function updateMenuData(data){
//     return request({
//         url:'/sys/menu/update',
//         data,
//         method:'post'
//     })
// }
//确认编辑某个目录
export function updateMenuData(data){
    return request({
        url:'/web/webmenu/update',
        data,
        method:'post'
    })
}
// //删除某一条功能权限
// export function deleteMenuData(data){
//     return request({
//         url:'/sys/menu/delete',
//         data,
//         method:'post'
//     })
// }
//删除某一条功能权限
export function deleteMenuData(data){
    return request({
        url:'/web/webmenu/delete',
        data,
        method:'post'
    })
}
// //确认新增某个目录
// export function saveMenuData(data){
//     return request({
//         url:'/sys/menu/save',
//         data,
//         method:'post'
//     })
// }
//确认新增某个目录
export function saveMenuData(data){
    return request({
        url:'/web/webmenu/save',
        data,
        method:'post'
    })
}
//会员账号审核查询接口
export function getMemAccountData(data){
    return request({
        url:'/manager/userManager/selectAuditUser',
        params:data,
        method:'get'
    })
}
//会员账号管理查询接口
export function getAllMemAccountData(data){
    return request({
        url:'/manager/userManager/selectAllUserInfo',
        params:data,
        method:'get'
    })
}
//根据type：1代表专家2代表服务商及专家或者服务商的id查询对应详情/manager/userManager/selectAuthentication
export function getMemAccountSelectAuthenticationData(data){
    return request({
        url:'/manager/userManager/selectAuthentication',
        params:data,
        method:'get'
    })
}
//查看详情信息
export function getMemAccountDetailData(data){
    return request({
        url:'/manager/userManager/getUserInfoById',
        params:data,
        method:'get'
    })
}
//会员账号管理审核通过
export function accountReviewInter(data){
    return request({
        url:'/manager/userManager/approvalPass',
        data,
        method:'post'
    })
}
//会员账号管理审核驳回
export function rejectProById(data){
    return request({
        url:'/manager/userManager/approvalReject',
        data,
        method:'post'
    })
}
//启用或者禁用会员账号
export function updateCanOrUse(data){
    return request({
        url:'/manager/userManager/upDateUserState',
        data,
        method:'post'
    })
}
//
// export function getAdminManageTable(data){
//     return request({
//         url:'/news/addNewsInformation',
//         data,
//         method:'post'
//     })
// }
//查询新闻资讯
// export function searchNewsTable(data){
//     return request({
//         url:'/news/searchAllNewsInformation',
//         params:data,
//         method:'get'
//     })
// }