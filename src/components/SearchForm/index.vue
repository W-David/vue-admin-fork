<template>
  <div class="search-form-container">
    <el-form id="search-form" ref="form" label-width="100px" label-position="right">
      <el-form-item v-for="item in showFormConfArr" :key="item.name" :label="item.label">
        <el-select v-if="item.type === 'select'" v-model="item.itemModel" placeholder="请选择" clearable>
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
        <el-date-picker v-else-if="item.type === 'date'" v-model="item.itemModel" :type="item.dateType" placeholder="请选择" clearable />
        <el-input v-else v-model="item.itemModel" clearable />
      </el-form-item>
      <el-form-item class="ctrl-item">
        <el-button type="primary" size="small" @click="submitForm">搜索</el-button>
        <el-button type="primary" size="small" @click="resetForm">重置</el-button>
        <el-button v-if="hideFormConfArr && hideFormConfArr.length" type="text" size="small" @click="switchForm">
          <span>{{ isHide ? '展开更多' : '收起' }}</span>
          <i :class="[isHide ? 'el-icon-arrow-down' : 'el-icon-arrow-up']" style="margin-left: 4px" />
        </el-button>
      </el-form-item>
      <el-form-item v-for="item in hideFormConfArr" v-show="!isHide" :key="item.name" :label="item.label">
        <el-select v-if="item.type === 'select'" v-model="item.itemModel" placeholder="请选择" clearable>
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
        <el-date-picker v-else-if="item.type === 'date'" v-model="item.itemModel" :type="item.dateType" placeholder="请选择" clearable />
        <el-input v-else v-model="item.itemModel" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    formConfArr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isHide: true,
      initColumnNum: 3
    }
  },
  computed: {
    showFormConfArr() {
      return this.formConfArr.slice(0, this.initColumnNum)
    },
    hideFormConfArr() {
      return this.formConfArr.slice(this.initColumnNum)
    }
  },
  watch: {},
  created() {},
  mounted() {
    window.addEventListener('resize', this.$_resize)
    this.setColumnNum()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resize)
  },
  methods: {
    $_resize() {
      this.setColumnNum()
    },
    getFormWidth() {
      const formEle = document.getElementById('search-form')
      const formWidth = formEle.clientWidth || 640
      return formWidth
    },
    setColumnNum() {
      const formWidth = this.getFormWidth()
      const columnNum = Math.floor(formWidth / (100 + 210))
      this.initColumnNum = Math.max(columnNum - 1, 0)
    },
    submitForm() {
      const formData = {}
      this.formConfArr.forEach(item => (formData[item.name] = item.itemModel))
      console.log('提交对象', formData)
    },
    resetForm() {
      this.$emit('on-reset-form')
    },
    switchForm() {
      this.isHide = !this.isHide
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form-container {
  margin: 16px auto;
  &:deep {
    .el-form {
      min-width: 640px;
      overflow: auto;
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 310px);
      .el-form-item {
        .el-form-item__content {
          .el-input {
            width: 210px;
          }
        }
        &.ctrl-item {
          width: 310px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .el-button {
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
