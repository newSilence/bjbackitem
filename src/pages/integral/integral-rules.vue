<template>
  <div style="box-sizing: border-box;padding: 32px 40px 26px 40px">
    <div class="integral-title">
      <span :class="{'active':isActive}" @click="toggleTitle(1)">积分账户查询</span>
      <span :class="{'active':!isActive}" @click="toggleTitle(2)">积分明细</span>
    </div>
    <component :is="currentComponent"></component>
  </div>
</template>
<script>
  import IntegralAccount from './integral-rules/integral-account'
  import IntegralDetail from './integral-rules/integral-detail'
  export default {
    data() {
      return {
        isActive:true,
        currentComponent:'IntegralAccount'
      }
    },
    created () {

    },
    components: {
      IntegralAccount,
      IntegralDetail
    },
    methods: {
      toggleTitle(i){
        if (i==1){
          this.isActive = true;
          this.currentComponent = 'IntegralAccount'
        }else {
          this.isActive = false;
          this.currentComponent = 'IntegralDetail'
        }
      }
    },

  }
</script>

<style lang="less" scoped>
  .active {
    color:#2BB1E8!important;
  }
  .integral-title {
    box-sizing: border-box;
    padding-bottom: 22px;
    span {
      cursor: pointer;
    }
    span:hover{
      color:#2BB1E8!important;
    }
    span:nth-child(1){
      font-size:16px;
      font-weight:500;
      color:rgba(51,51,51,1);
      display: inline-block;
      padding-right: 37px;
    }
    span:nth-child(2){
      font-size:16px;
      font-weight:500;
      color:rgba(51,51,51,1);
      display: inline-block;
      padding-left: 37px;
      position: relative;
    }
    span:nth-child(2):before{
      content: '';
      display: block;
      background-color: #D2D2D2;
      width:1px;
      height:13px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
    }
  }
</style>
