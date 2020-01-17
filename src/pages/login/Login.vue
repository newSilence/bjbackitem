<template>
    <div>
        <el-form>
            <el-form-item label="用户名">
                <el-input  v-model="ruleForm.username" ></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="loginClick">登录</el-button>
            </el-form-item>
        </el-form>  
    </div>
</template>

<script>
import { login , getNavMenuData } from './api'
    export default {
        data() {
            return {
                ruleForm: {
                    username:'',
                    password:''
                }
            }
        },
        methods: {
            loginClick() {
                login(this.ruleForm).then(res=>{
                    if(res.data.code==0){
                        sessionStorage.setItem('username',this.ruleForm.username);
                        this.$store.commit('changeUserName',this.ruleForm.username);
                        sessionStorage.setItem('token',res.data.data);
                        this.$store.commit('setToken',res.data.data);
                        getNavMenuData().then(res=>{
                            console.log("responsemenu",res);
                            this.$store.commit('changeHomeTabList',res.data.data);
                            sessionStorage['headTabClickIndexStr']=this.$store.state.headTabClickIndexStr;
                            sessionStorage.setItem('homeTabList',JSON.stringify(res.data.data));
                            this.$router.push('/');
                            // let homeDataArray=res.data.data;
                        })
                        // this.$router.push('/');
                    }
                    console.log('logres',res);
                })
            }
        },
    }
</script>

<style scoped>

</style>