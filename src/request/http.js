import axios from 'axios'
import Qs from 'qs'
import baseUrl from './uploadUrl'
export function request(config){
    console.log("baseUrl",baseUrl.uploadUrl);
    const instance = axios.create({
        baseURL:baseUrl.uploadUrl,
        timeout:5000,
        transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data)
        }],
    })
    // instance.interceptors.request.use((config)=>{
    //     //一般在这之前对config做处理
    //     return config;//config为请求配置，须返回config
    // },function(error){})
    // instance.interceptors.response.use((response)=>{
    //     return response
    // },function(error){})

    return instance(config);
}