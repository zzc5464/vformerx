<template>
  <div>
    <tab>
      <tab-item selected @on-item-click="onItemClick('p1')">已发货</tab-item>
      <tab-item @on-item-click="onItemClick('p2')">未发货</tab-item>
      <tab-item @on-item-click="onItemClick('p3')">全部订单</tab-item>
    </tab>
    <za-title className="main-title" name="applicanttitle">
      投保人信息
    </za-title>
    <form-unit name='form1' :formModels="formModels['form1']" @formChange="onChange" @formEvent="onEvent">

    </form-unit>
    <za-title className="main-title" name="applicanttitle">
      被投保人信息
    </za-title>
    <!-- <form-unit name='form2' :formModels="formModels['form2']" @formChange="onChange" >

    </form-unit> -->
    <form-unit v-for="(v,i) in copyFormModels" :key='i' :name='v' :formModels="formModels[v]" @formChange="onChange" >

    </form-unit>
    <!-- <p v-for="(v,i) in copyFormModels" :key='i'>
      {{v}}
    </p> -->
    <div class="btn-container" @click='insertUser'>
      <div  class="weui-btn add">
        <span class="icon-add-blue"></span>
          <span class="vertivalm">添加被保人</span>
      </div>
    </div>
    <div  class="btn-next"> 下一步</div>
  </div>
</template>
<script>
import { ARTICLELIST } from "@/api"
import * as types from "@/store/mutation-types"
import { formUnit, Tab, TabItem, zaTitle} from "vformer"
export default {
  data () {
    return {
      pageName: 'p1',
      copyFormModels: []
    };
  },
  components: {
    formUnit, Tab, TabItem, zaTitle
  },
  methods: {
    onChange (v, t) {
      this.$store.dispatch('dataUpdated', {v, t, page: this.pageName});
    },
    insertUser() {
      this.$store.dispatch({
        type: 'insert',
        p: 'p1',
        f: 'form2'
      });
      this.renderCopyForm()
    },
    onItemClick (name) {
      this.pageName = name;
      //this.$store.dispatch('resetEventUpdated');
    },
    onEvent (t, v) {
      //this.$store.dispatch('eventUpdated', {t, v});
    },
    renderCopyForm () {
      this.copyFormModels = Object.keys(this.$store.state.config.formModels[this.pageName]).filter( v => v.includes('form2'))
    },
  },
  computed: {
    formModels () {
      return this.$store.state.config.formModels[this.pageName]
    },
    count () {
      return this.$store.state.count
    },
    countPlus () {
      return this.$store.getters.countPlus
    }
  },
  created () {
    this.renderCopyForm()
  }
};
</script>

<style lang="less" scoped>
  .btn-container {
      display: flex;
      justify-content: center;
      text-align: center;
      background-color: #ffffff;
      padding-top: 30px;
      padding-bottom: 30px;
      margin-top: 15px;
      margin-bottom: 60px;
      .btn-add {
        color: #5697ff;
        font-size: 17px;
        background-color: #ffffff;
        text-align: center;
        display: block;
        padding-top: 50px;
        padding-bottom: 50px;
        border: 1px solid #ffffff;
        .icon-add-blue {
          margin-right: 2px;
        }
      }
      .vertivalm{
        vertical-align: middle;
      }
      .add{
        width: 48%;
        border: 1px solid #5697ff;
        background-color: #ffffff;
        color: #5697ff;
        font-size: 16px;
        border-radius: 8px;
        padding: 10px 0;
      }
    }
    //下一步按鈕样式
    .btn-next{
      display: block;
      position: fixed;
      bottom: 0;
      left:0;
      width:100%;
      height:45px;
      line-height: 45px;
      color: #fff;
      text-align: center;
      font-size: 17px;
      z-index: 400;
      background: -webkit-linear-gradient(left, #67a4ff, #0062e8); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #67a4ff, #0062e8); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #67a4ff, #0062e8); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right,#67a4ff, #0062e8); /* 标准的语法（必须放在最后） */
    }
</style>
