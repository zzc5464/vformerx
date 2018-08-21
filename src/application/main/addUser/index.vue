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
    <form-unit name='p1-form1' :formModels="formModels['form1']" @formChange="onChange" @formEvent="onEvent">

    </form-unit>
    <za-title className="main-title" name="applicanttitle">
      被投保人信息
    </za-title>
    <form-unit name='p1-form2' :formModels="formModels['form2']" >

    </form-unit>
      <div class="btn-container" >
        <div  class="weui-btn add">
          <span class="icon-add-blue"></span>
           <span class="vertivalm">添加被保人</span>
        </div>
      </div>
    <!-- <button @click="onAddBtnClicked">ADD</button> -->
  </div>
</template>
<script>
import { ARTICLELIST } from "@/api"
import * as types from "@/store/mutation-types"
import { formUnit, Tab, TabItem, zaTitle} from "vformer"
export default {
  data () {
    return {
      pageName: 'p1'
    };
  },
  components: {
    formUnit, Tab, TabItem, zaTitle
  },
  methods: {
    onChange (v, t) {
      this.$store.dispatch('dataUpdated', {v, t});
    },
    onItemClick (name) {
      this.pageName = name;
      //this.$store.dispatch('resetEventUpdated');
    },
    onEvent (t, v) {
      //this.$store.dispatch('eventUpdated', {t, v});
    },
    render () {
      console.log(this.formModels);
      
    },
    onAddBtnClicked () {
      this.$store.dispatch('insert');
    }
  },
  computed: {
    formModels () {
      return this.$store.state.formModels[this.pageName]
    },
    count () {
      return this.$store.state.count
    },
    countPlus () {
      return this.$store.getters.countPlus
    }
  },
  created () {
    this.render();
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
</style>
