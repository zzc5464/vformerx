
<template>
  <div>
    <form-unit v-for="(formModel, key) in formModels" :key="key" :name="pageName + '-' + key" :formModels="formModel" @formChange="onChange" @formEvent="onEvent">
      <template>
        <za-title className="main-title" name="applicanttitle">
          投保人信息
        </za-title>
	    </template>
    </form-unit>
  </div>
</template>
<script>
/**
 * 添加保险人信息尝试
 */
import { ARTICLELIST } from "@/api"
import * as types from "@/store/mutation-types"
import { formUnit, Tab, TabItem } from "vformer"
export default {
  data () {
    return {
      pageName: 'p4'
    };
  },
  components: {
    formUnit, Tab, TabItem
  },
  methods: {
    onChange (v) {
      this.$store.dispatch('dataUpdated', v);
    },
    onItemClick () {

    },
    onEvent () {},
    render () {},
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

</style>
