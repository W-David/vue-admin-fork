<template>
  <div class="app-container">
    <search-form ref="searchForm" :form-conf-arr="formConfArr" @on-reset-form="resetForm" />
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm'
export default {
  components: {
    SearchForm
  },
  data() {
    return {
      formConfArr: [
        {
          name: 'companyName',
          label: '公司名称',
          type: 'input',
          itemModel: ''
        },
        {
          name: 'region',
          label: '地区',
          type: 'select',
          itemModel: '',
          options: [
            { label: '测试1', value: 'test1' },
            { label: '测试2', value: 'test2' },
            { label: '测试3', value: 'test3' }
          ]
        },
        {
          name: 'industry',
          label: '行业',
          type: 'select',
          itemModel: '',
          options: [
            { label: '测试1', value: 'test1' },
            { label: '测试2', value: 'test2' },
            { label: '测试3', value: 'test3' }
          ]
        },
        {
          name: 'companyType',
          label: '企业类型',
          type: 'select',
          itemModel: '',
          options: [
            { label: '测试1', value: 'test1' },
            { label: '测试2', value: 'test2' },
            { label: '测试3', value: 'test3' }
          ]
        },
        {
          name: 'registryPay',
          label: '注册资本',
          type: 'select',
          itemModel: '',
          options: [
            { label: '测试1', value: 'test1' },
            { label: '测试2', value: 'test2' },
            { label: '测试3', value: 'test3' }
          ]
        },
        {
          name: 'actuallyPay',
          label: '实缴资本',
          type: 'select',
          itemModel: '',
          options: [
            { label: '测试1', value: 'test1' },
            { label: '测试2', value: 'test2' },
            { label: '测试3', value: 'test3' }
          ]
        },
        {
          name: 'beginYear',
          label: '成立年份',
          type: 'date',
          itemModel: ''
        },
        {
          name: 'endYear',
          label: '结束年份',
          type: 'date',
          itemModel: ''
        },
        {
          name: 'clientTag',
          label: '客户标签',
          type: 'select',
          itemModel: '',
          options: [
            { label: '测试1', value: 'test1' },
            { label: '测试2', value: 'test2' },
            { label: '测试3', value: 'test3' }
          ]
        },
        {
          name: 'clientStatus',
          label: '客户状态',
          type: 'select',
          itemModel: '',
          options: [
            { label: '测试1', value: 'test1' },
            { label: '测试2', value: 'test2' },
            { label: '测试3', value: 'test3' }
          ]
        },
        {
          name: 'clientIndent',
          label: '客户意向',
          type: 'select',
          itemModel: '',
          options: [
            { label: '测试1', value: 'test1' },
            { label: '测试2', value: 'test2' },
            { label: '测试3', value: 'test3' }
          ]
        },
        {
          name: 'belongTo',
          label: '归属人',
          type: 'select',
          itemModel: '',
          options: [
            { label: '测试1', value: 'test1' },
            { label: '测试2', value: 'test2' },
            { label: '测试3', value: 'test3' }
          ]
        },
        {
          name: 'createBy',
          label: '创建人',
          type: 'select',
          itemModel: '',
          options: [
            { label: '测试1', value: 'test1' },
            { label: '测试2', value: 'test2' },
            { label: '测试3', value: 'test3' }
          ]
        }
      ]
    }
  },
  mounted() {},
  methods: {
    resetForm() {
      this.formConfArr.forEach(item => (item.itemModel = ''))
      this.$refs.searchForm.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
