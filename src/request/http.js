import axios from 'axios'
export function request(config){
    const instance = axios.create({
        baseURL:'',
        timeout:5000
    })
    instance.interceptors.request.use((config)=>{
        //一般在这之前对config做处理
        return config;//config为请求配置，须返回config
    },function(error){})
    instance.interceptors.response.use((response)=>{
        return response
    },function(error){})

    return instance(config);
}