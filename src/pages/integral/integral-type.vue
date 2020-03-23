<template>
  <div>
    <!-- 积分类型 -->
    <div class="intergralTypeWarp">
      <div class="IntegralType">
        <span  :class="{'active':isActive_1}" @click="toggleContent(1)">积分类型配置</span>
        <el-divider direction="vertical"></el-divider>
        <span :class="{'active':isActive_2}" @click="toggleContent(2)">积分规则配置</span>
        <!-- <el-divider direction="vertical"></el-divider>
        <span :class="{'active':isActive_3}" @click="toggleContent(3)">积分兑换活动设置</span> -->
      </div>
    </div>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import IntegralType from './integral-type/integral-type'
import IntegralRule from './integral-type/integral-rule'
import IntegralExchange from './integral-type/integral-exchange'
  export default {

    data() {

      return {
        isActive_1:true,
        isActive_2:false,
        isActive_3:false,
        currentComponent:'IntegralType'
      }
    },
    created () {

    },
    components: {IntegralType,IntegralRule,IntegralExchange},
    methods:{
      //顶部切换组件
      toggleContent(i){
        if (i===1){
          this.isActive_1=true;
          this.isActive_2=false;
          this.isActive_3=false;
          this.currentComponent = IntegralType;
        }else if (i===2){
          this.isActive_1=false;
          this.isActive_2=true;
          this.isActive_3=false;
          this.currentComponent = IntegralRule;
        }else if (i===3){
          this.isActive_1=false;
          this.isActive_2=false;
          this.isActive_3=true;
          this.currentComponent = IntegralExchange;
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .IntegralType {
    float: left;
    margin-top: 32px;
    span {
      font-size:16px;
      font-weight:500;
      color:rgba(51,51,51,1);
      cursor: pointer;
      display: inline-block;
      padding: 0 25px;
    }
    span:hover {
      color: #2BB1E8!important;
    }
  }
  .active {
    color: #2BB1E8!important;
  }
  .intergralTypeWarp {
    overflow: hidden;
  }

</style>
