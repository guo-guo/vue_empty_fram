<template>
  <div>
    <el-input type="input" v-model='addparams.name'></el-input>
    <el-input type="input" v-model='addparams.pwd'></el-input>
    <el-button type="primary" @click='login'>登录</el-button>
  </div>
</template>
<script>
import { wechatLogin } from '@/service/login'
export default {
  data () {
    return {
      addparams:{
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    async login () {
      let res = await wechatLogin({data: this.addparams})
    }
  }
}
</script>
<style lang="scss">

</style>