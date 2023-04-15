# 前端测试项目-王振华

## 新增页面路径
`views/form/index`
## 组件路径
`components/SearchForm/index`
## 其他说明
1. `form`使用`grid`布局实现子项宽度的平均分配和最后一行的左对齐
2. `formConfArr`说明
   ```javascript
	 // item名称，v-for的key,提交对象解析的键
   name: 'region',
	 //el-form-item 的 label
   label: '地区',
	 //表单项类型， 目前支持 'input'、'select' 和 'date', 默认为 'input'
   type: 'select',
	 // 表单项的值, 提交对象解析的值
   itemModel: '',
	 // 表单项类型为 ‘select’时提供
   options: [
     { label: '测试1', value: 'test1' },
     { label: '测试2', value: 'test2' },
     { label: '测试3', value: 'test3' }
   ]
	 ```
## END
