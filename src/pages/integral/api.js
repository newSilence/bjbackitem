import { request } from "../../request/http";
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
//获取积分类型
export function reqIntegralType(data){
  return request({
    url:'/manager/Integral/selectAllIntegralBycondition',
    data,
    method:'post'
  })
}
//添加积分类型
export function reqAddIntegralType(data){
  return request({
    url:'/manager/Integral/addIntegral',
    data,
    method:'post'
  })
}
//根据id获取触发接口
export function reqAddIntegralPort(id){
  return request({
    url:'/manager/Integral/selectIntegralById',
    params:id,
    method:'get'
  })
}
//积分类型修改
export function reqIntegralTypeModify(data){
  return request({
    url:'/manager/Integral/updateIntegral',
    data,
    method:'post'
  })
}
//获取积分规则配置
export function reqIntegralRule(data){
  return request({
    url:'/manager/IntegralRecord/selectIntegralRecord',
    params:data,
    method:'get'
  })
}
//积分规则全部获取
export function reqAllIntegralType(){
  return request({
    url:'/manager/Integral//selectAllIntegralList',
    method:'post'
  })
}


