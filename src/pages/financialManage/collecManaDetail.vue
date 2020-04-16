<template>
    <div class="collect_det" style="padding:0px 28px 0px 0px;background:#F8F8F8;height:100%">
        <div style="background:white">
            <div style="display:flex;justify-content:space-between;font-size:16px;color:#333;padding:0 38px;background:white">
                <span></span>
                <span @click="goBack" style="cursor:pointer">
                    <i class="el-icon-back"></i>
                </span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-top:18px;padding:0 38px;background:white">
                <div>
                    <div style="font-size:16px;color:#333333;margin-bottom:6px">{{orderInfo.stateLable}}</div>
                    <div style="font-size:14px;color:#4A4A4A">{{orderInfo.orderCode}}</div>
                </div>
                <button @click="addRemark" style="background:linear-gradient(126deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);height:32px;line-height:1;border-radius:4px;color:white;font-size:14px;padding:0px 30px;cursor:pointer">添加备注</button>
            </div>
            <div style="background:rgba(230,247,255,1);border-radius:2px;border:1px solid rgba(145,213,255,1);padding:14px 10px 12px 28px;font-size:14px;color:#333333;margin:14px 38px 0px 38px">
                <div>
                    <span>备注时间：</span>
                    <span>{{orderInfo.finUpdateDate}}</span>
                </div>
                <div style="margin-top:6px">
                    <span>财务备注：</span>
                    <span>{{orderInfo.finRemarks}}</span>
                </div>
            </div>
            <div style="margin:24px 38px 0px 38px;border:1px solid rgba(217,217,217,1);">
                <div style="background:rgba(248,248,248,1);padding:10px 30px;font-size:14px;color:#6B6B6B">
                    <span>下单时间：{{orderInfo.createDate}}</span>
                    <span style="padding-left:198px"> 支付方式：{{orderInfo.payTypeLable}}</span>
                </div>
                <div style="display:flex;justify-content:space-between;padding:26px 130px 26px 30px">
                    <div style="display:flex">
                        <div style="width:138px;height:92px;margin-right:20px">
                            <img :src="orderInfo.imgAddrs" alt="活动图片">
                        </div>
                        <div>
                            <div style="font-size:16px;font-weight:600;line-height:22px">{{orderInfo.title}}</div>
                            <div style="font-size:14px;font-weight:400;line-height:20px;margin-top:10px;margin-bottom:17px">类型：{{orderInfo.typeLable}}</div>
                            <div style="font-size:12px;font-weight:400;line-height:17px">数量：× {{orderInfo.mallNum}}</div>
                        </div>
                    </div>
                    <div style="display:flex;align-items:center;color:rgba(222,90,2,1);font-size:14px;">¥{{orderInfo.totalPrice}}</div>
                    <div style="display:flex;align-items:center;color:#333333;font-size:14px;">{{orderInfo.stateLable}}</div>
                </div>
            </div>
            <div style="display:flex;justify-content:space-between;height:133px;margin:26px 38px 0px 38px">
                <div>
                    <span @click="()=>{$message.info('功能暂未开发')}" style="color:#2BB1E8;font-size:14px;cursor:pointer">查看合同</span>
                    <span style="font-size:14px;color:#EBEBEB;padding:0px 15px">|</span>
                    <span @click="()=>{$message.info('功能暂未开发')}" style="color:#2BB1E8;font-size:14px;cursor:pointer">查看发票</span>
                </div>
                <div>
                    <div style="width:180px">
                        <span style="display:inline-block;width:56px;text-align:right;color:#515151;font-size:14px;">总额：</span>
                        <span style="display:inline-block;width:113px;text-align:right;color:#515151;font-size:14px;text-align:right">¥{{orderInfo.totalPrice}}</span>
                    </div>
                    <div style="width:180px;margin-top:22px">
                        <span style="display:inline-block;width:56px;text-align:right;color:#515151;font-size:14px;">优惠：</span>
                        <span style="display:inline-block;width:113px;text-align:right;color:#515151;font-size:14px;">¥{{orderInfo.cousePrice}}</span>
                    </div>
                    <div style="width:180px;margin-top:22px">
                        <span style="display:inline-block;width:56px;text-align:right;color:#515151;font-size:14px;">实付款：</span>
                        <span style="display:inline-block;width:113px;text-align:right;color:#DE5A02;font-size:18px;">¥{{orderInfo.actualPrice}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:10px;background:#F8F8F8"></div>
        <div style="background:white;padding:0 38px 39px 38px;">
            <div style="color:#707070;font-size:16px;padding-top:30px">
                <span>
                    <img :src="bmxx" style="width:20px;height:20px;vertical-align:bottom" alt="s">
                    <!-- <i class="el-icon-mobile"></i> -->
                </span>
                <span>报名信息</span>
            </div>
            <div style="display:flex;flex-wrap:wrap">
                <div v-for="(item,index) in detailList" :key="index" style="font-size:14px;color:#333333;width:200px">
                    <div style="display:flex;margin-top:30px;margin-left:24px">
                        <div style="margin-right:10px">
                            <span style="align-self:stretch;border-radius:50%;font-size:14px;padding:0px 6px;background:rgb(255,209,51);color:white">{{index+1}}</span>
                        </div>
                        <div style="font-size:14px;color:#333333;">
                            <div style="margin-bottom:12px">
                                姓名：{{item.real_name}}
                            </div>
                            <div style="margin-bottom:12px">
                                电话：{{item.phone_number}}
                            </div>
                            <div style="line-height:16px">
                                单位/职务：{{item.work_unit+'/'+item.job_duties}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div style="height:10px;background:#F8F8F8"></div>
        <div style="padding:0 38px 0px 38px;background:white">
            <div style="color:#707070;font-size:16px;padding-top:30px">
                <span>
                    <!-- <i class="el-icon-mobile"></i> -->
                    <img :src="bmxx" style="width:20px;height:20px;vertical-align:bottom" alt="s">
                </span>
                <span>活动信息</span>
            </div>
            <div style="font-size:14px;color:#333333;">
                <div style="display:flex;margin-top:30px;margin-left:54px">
                    <div style="font-size:14px;color:#333333;">
                        <div style="margin-bottom:22px">
                            活动类型：{{mallInfo.activities_type_name}}
                        </div>
                        <div style="margin-bottom:22px">
                            活动领域：{{mallInfo.activities_type_name}}
                        </div>
                        <div style="margin-bottom:22px">
                            活动时间：{{$moment(mallInfo.start_time).format('YYYY-MM-DD HH:mm')}}  -  {{$moment(mallInfo.end_time).format('YYYY-MM-DD HH:mm')}}
                        </div>
                        <div style="margin-bottom:30px">
                            活动地点：{{mallInfo.address}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="提示"
            center
            class="turn_down_dialog"
            @open="openTurnDown"
            :visible.sync="dialogTurnDownVisible"
            width="289px">
            <el-form ref="turn_down_form" :model="turnDownForm" :rules="turnDownFormRules">
                <el-form-item label="" prop="remarks">
                    <el-input
                        type="textarea"
                        :rows="8"
                        placeholder="请输入备注"
                        v-model="turnDownForm.remarks">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <button @click="cancelTurnDown"  style="background:rgba(251,251,251,1);border-radius:3px;padding:5px 20px;color:#828282;margin-right:30px;cursor:pointer">取消</button>
                <button @click="confirmTurnDown" style="background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);border-radius:3px;padding:5px 20px;color:white;cursor:pointer">确定</button>
                
            </span>
        </el-dialog>
    </div>
</template>

<script>

import { getItemDetail , upDateRemark } from './api'
// let moment = require("moment")
// import bmxx from "@/assets/bmxx.png"
    export default {
        data() {
            return {
                bmxx:require('@/assets/bmxx.png'),
                orderInfo:{},
                detailList:[],
                mallInfo:{},
                dialogTurnDownVisible:false,
                turnDownForm:{
                    remarks:'',
                },
                turnDownFormRules:{
                    remarks : [
                        { required: true, message: '请输入备注！', trigger: 'blur' },
                        { min: 1, max: 200, message: '备注200字以内', trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            fetchData(data){
                getItemDetail(data).then(res=>{
                    console.log(res);
                    if(res.data.ret){
                        this.orderInfo=res.data.data.orderInfo;
                        this.detailList=res.data.data.detailList;
                        this.mallInfo=res.data.data.mallInfo;
                    }else{
                        this.orderInfo={};
                        this.detailList=[];
                        this.mallInfo={};
                    }
                })
            },
            cancelTurnDown(){
                this.dialogTurnDownVisible=false;
            },
            openTurnDown(){
                this.turnDownForm.remarks='';
            },
            //添加备注
            addRemark(){
                this.dialogTurnDownVisible = true;
            },
            //防抖
            antiShake(){
              this.isDisabled = true;
              setTimeout(()=>{
                this.isDisabled = false;
              },2000)
            },
            //确认添加
            confirmTurnDown(){
                this.antiShake();
                this.$refs["turn_down_form"].validate((valid) => {
                    if (valid) {
                      let id = this.$route.query.id;
                      console.log(this.$route.query.id)
                      let params = {id}

                      params.remarks = this.turnDownForm.remarks;
                      upDateRemark(params).then(res=>{
                           console.log('添加备注',res)
                        if (res.data.errcode===0){
                          this.$message({
                            message:'添加备注成功',
                            type:'success'
                          })
                         this.dialogTurnDownVisible = false;
                          this.fetchData({id});
                        }else {
                          this.$message.error('添加备注失败');
                        }
                      })
                    } else {
                        return false;
                    }
                })
            },
            //返回上一页
            goBack(){
                this.$router.back(-1);
            },
            
            
        },
        created () {
            this.fetchData(this.$route.query);
            console.log(this.$route.query);
            
        },
    }
</script>

<style lang="less">
.collect_det{
    font-family: PingFangSC-Regular,PingFang SC;
    .turn_down_dialog .el-dialog__header{
        text-align: center;
        background:linear-gradient(36deg,rgba(42,213,210,1) 0%,rgba(43,180,232,1) 100%);
        height: 44px;
        color:white;
    }
    .el-dialog__title{
        color:white
    }
    .el-dialog--center .el-dialog__body{
        padding-bottom:0px;
    }
    .turn_down_dialog .el-dialog__headerbtn{
        top:15px;
    }
    .turn_down_dialog .el-dialog__title{
        line-height: 8px;
    }
}

</style>