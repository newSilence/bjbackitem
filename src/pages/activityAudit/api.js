import { request } from "../../request/http";
//登录
// export function login(data){
//     return request({
//         url:'/sys/login',
//         data,
//         method:'post'
//     })
// }
//查询接口
export function getProjectList(data){
    return request({
        url:'/manager/projectInfo/pageQueryList.json',
        params:data,
        method:'get'
    })
}
//获取所有的省份
export function getAllProvince(data){
    return request({
        url:'/region/queryAllProvinces.json',
        params:data,
        method:'get'
    })
}
//获取省份下所有的市
export function getProvinceAllCity(data){
    return request({
        url:'/region/queryCityByProvinceId.json',
        params:data,
        method:'get'
    })
}
//获取所有的技术领域
export function getListSkillArea(data){
    return request({
        url:'/config/listSkillArea.json',
        params:data,
        method:'get'
    })
}
//获取所有的应用领域
export function getListUserArea(data){
    return request({
        url:'/config/listUserArea.json',
        params:data,
        method:'get'
    })
}
//获取所有的当前阶段
export function getListProcessType(data){
    return request({
        url:'/config/listProcessType.json',
        params:data,
        method:'get'
    })
}
//获取所有的成果类型
export function getListFruitType(data){
    return request({
        url:'/config/listFruitType.json',
        params:data,
        method:'get'
    })
}
//获取所有的研究领域
export function getAllResearch(data){
    return request({
        url:'/manager/Research/selectAllResearch',
        params:data,
        method:'get'
    })
}
//获取所有的融资阶段
export function getAllFinancingType(data){
    return request({
        url:'/config/listFinancingType.json',
        params:data,
        method:'get'
    })
}
//项目下线
export function offLineFun(data){
    return request({
        url:'/manager/projectInfo/cancelById.json',
        data,
        method:'post'
    })
}
//项目删除
export function deleteProFun(data){
    return request({
        url:'/manager/projectInfo/deleteById.json',
        data,
        method:'post'
    })
}
//项目推荐
export function recommendProFun(data){
    return request({
        url:'/manager/projectInfo/setRecommend.json',
        data,
        method:'post'
    })
}
//项目批量删除
export function batchDeleteProFun(data){
    return request({
        url:'/manager/projectInfo/deleteByBatch.json',
        data,
        method:'post'
    })
}
//项目批量设为推荐
export function batchRecommendProFun(data){
    return request({
        url:'/manager/projectInfo/recommendProject.json',
        data,
        method:'post'
    })
}
//根据项目id查询详细数据
export function getProDetailById(data){
    return request({
        url:'/manager/projectInfo/queryById.json',
        params:data,
        method:'get'
    })
}
//项目驳回
export function rejectProById(data){
    return request({
        url:'/manager/projectInfo/approvalRejected.json',
        data,
        method:'post'
    })
}
//项目更新接口
export function updateProDetail(data){
    return request({
        url:'/manager/projectInfo/saveOrUpdateHistory.json',
        data,
        method:'post'
    })
}
//项目审核通过
export function approvalProDetail(data){
    return request({
        url:'/manager/projectInfo/approvalPass.json',
        data,
        method:'post'
    })
}
//获取活动类型
export function getActiveType(data){
  return request({
    url:'/dict/getTreeByType',
    params:data,
    method:'get'
  })
}
//获取活动列表
export function getActiveList(data){
  return request({
    url:'/manager/innovationActivities/showByPage',
    params:data,
    method:'get'
  })
}
//删除活动
export function delActiveItem(data){
  return request({
    url:'/manager/innovationActivities/deleteById',
    params:data,
    method:'get'
  })
}
export function reqActiveDetails(data){
  return request({
    url:'/manager/innovationActivities/getById',
    params:data,
    method:'get'
  })
}
//通过活动
export function reqActivePass(data){
  return request({
    url:'/manager/innovationActivities/updateApprovalStatusPass',
    data,
    method:'post'
  })
}
//驳回活动
export function reqActiveReject(data){
  return request({
    url:'/manager/innovationActivities/updateApprovalStatusRejected',
    data,
    method:'post'
  })
}
//下线活动
export function reqCloseActive(data){
  return request({
    url:'/manager/innovationActivities/closeActivities',
    data,
    method:'post'
  })
}
//批量删除
export function reqDeleateActive(data){
  return request({
    url:'/manager/innovationActivities/deleteByBatch',
    params:data,
    method:'get'
  })
}
//修改活动
export function reqmodifyActive(data){
  return request({
    url:'/manager/innovationActivities/updateById',
    data,
    method:'post'
  })
}
//批量置顶
export function reqBatchTopping(data){
  return request({
    url:'/manager/top/saveBatch',
    data,
    method:'post'
  },false)
}

