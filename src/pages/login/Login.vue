<template>
    <div class="bklogin" style="">
        <div>
            <div style="color:#FFFFFF;font-size:30px;font-weight:500;margin-bottom:42px;text-align:center">科创汇后台管理系统</div>
            <div style="background:rgba(255,255,255,1);box-shadow:0px 3px 18px 1px rgba(2,2,19,1);width:424px;padding:45px 50px">
                <div style="font-size:24px;font-weight:500;color:#5E5E5E;margin-bottom:47px">欢迎登录！</div>
                <el-form>
                    <el-form-item label="">
                        <el-input
                            placeholder="请输入用户名"
                            v-model="ruleForm.username">
                            <i slot="prefix" class="el-input__icon el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item v-show="!showPassword" label="">
                        <el-input
                            type="password"
                            placeholder="请输入密码"
                            v-model="ruleForm.password">
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            <i slot="suffix" @click="changeShowPs" v-show="ruleForm.password.length>0" class="el-input__icon el-icon-view"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item v-show="showPassword" label="">
                        <el-input
                            placeholder="请输入密码"
                            v-model="ruleForm.password">
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            <i slot="suffix" @click="changeShowPs" class="el-input__icon el-icon-turn-off-microphone"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-checkbox v-model="ruleForm.checked">下次免登录</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width:100%;border-radius:28px;background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);box-shadow:0px 12px 10px -8px rgba(42,210,212,1);color:white" @click="loginClick">登陆</el-button>
                    </el-form-item>
                </el-form> 
            </div>
             
        </div>
    </div>
</template>

<script>
import { login , getNavMenuData } from './api'
import loginBk from "../../assets/loginBk.png";
    export default {
        data() {
            return {
                showPassword:false,
                ruleForm: {
                    username:'',
                    password:'',
                    checked:false,
                }
            }
        },
        methods: {
            changeShowPs(){
                this.showPassword=!this.showPassword;
            },
            loginClick() {
                login(this.ruleForm).then(res=>{
                    console.log(res);
                    if(res.data.ret){
                        sessionStorage.setItem('username',this.ruleForm.username);
                        this.$store.commit('changeUserName',this.ruleForm.username);
                        sessionStorage.setItem('token',res.data.data);
                        this.$store.commit('setToken',res.data.data);
                        // getNavMenuData().then(res=>{
                        //     console.log("responsemenu",res);
                        //     this.$store.commit('changeHomeTabList',res.data.data);
                        //     sessionStorage['headTabClickIndexStr']=this.$store.state.headTabClickIndexStr;
                        //     sessionStorage.setItem('homeTabList',JSON.stringify(res.data.data));
                        //     this.$router.push('/');
                        //     // let homeDataArray=res.data.data;
                        // })
                        this.$router.push('/index/authority/menu');
                        this.$store.commit('changeMenuTitle','会员账号管理');
                        sessionStorage['menuTitle']="会员账号管理";
                    }
                    console.log('logres',res);
                })
            }
        },
    }
</script>

<style>
    .bklogin{
        background: url('../../assets/loginBk.png');
        background-size: 100%;
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .bklogin .el-icon-user:before{
        color: transparent;
        font-size: 18px;
        background-size:18px 18px;
        background: url('../../assets/userlgBk.png') no-repeat;
    }
    .bklogin .el-icon-lock:before{
        color: transparent;
        font-size: 18px;
        background-size:18px 18px;
        background: url('../../assets/pslgBk.png') no-repeat;
    }
    .bklogin .el-icon-view:before{
        color: transparent;
        font-size: 18px;
        background-size:cover;
        background: url('../../assets/pspslgBk.png') no-repeat;
    }
    .bklogin .el-icon-turn-off-microphone:before{
        color: transparent;
        font-size: 18px;
        background-size:cover;
        background: url('../../assets/psnpslgBk.png') no-repeat;
    }
    /* .el-icon-user:before{
        background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);
    } */
</style>