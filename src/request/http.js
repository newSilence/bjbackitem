import axios from 'axios'
import Qs from 'qs'
import baseUrl from './uploadUrl'
import store from '@/vuex/store'
import Router from '@/router/index'
import { Message } from 'element-ui';
export function request(config,isForm=true){
    // console.log("baseUrl",baseUrl.uploadUrl);
    const instance =isForm ? axios.create({
        baseURL:baseUrl.uploadUrl,
        timeout:5000,
        transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    }): axios.create({
       baseURL:baseUrl.uploadUrl,
       timeout:5000,
    })
    instance.interceptors.request.use((config)=>{
        // console.log("config",config);
        let token=store.state.token?store.state.token:sessionStorage['token'];
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token = token;
            // console.log('interceptors config=',config)
        }
        // this.$store.commit('')
        //一般在这之前对config做处理
        return config;//config为请求配置，须返回config
    },function(error){})
    // console.log('dddd',store.state.isShowMessage)
    instance.interceptors.response.use((response)=>{

        // console.log("response",response)
        // console.log('dddd',store.state.isShowMessage)
        if(response.data.errcode=="500405"){
            Router.push('/login');
        }
        // console.log(re)
        if(store.state.isShowMessage&&!response.data.ret){
            console.log("response error");
            store.commit('setIsShowMessage',false);
            Message.error(
                {
                    showClose: true,
                    message: response.data.errmsg,
                    type: 'error',
                    onClose:function(){
                        store.commit('setIsShowMessage',true)
                    }
                }
            )
            return false;
        }
        // if(response.data.code!=0){
        //     Message.error(
        //         {
        //             showClose: true,
        //             message: '权限失效，请退出重新登录',
        //             type: 'error'
        //         }
        //     )
        //     return false;
        // }
        return response
    },function(error){
        console.log("error",error)
    })

    return instance(config);
}
