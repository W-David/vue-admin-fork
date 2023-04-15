/**
 * v-number-only 限制输入框只能输入数字
 */
export default {
  bind(el, binding) {
    // 获取参数对象中的配置项
    const config = binding.value || {}
    // 包含所有正则表达式和错误提示信息的配置对象
    const regConfig = Object.assign(
      {
        integer: /^\d+$/, // 整数
        decimal: /^\d+(\.\d{0,2})?$/, // 小数，保留两位小数
        positive: /^[1-9]\d*$/, // 正整数
        negative: /^-[1-9]\d*$/, // 负整数
        positiveDecimal: /^(([1-9]\d*)|([0]))(\.\d{0,2})?$/, // 正小数，保留两位小数
        negativeDecimal: /^-(([1-9]\d*)|([0]))(\.\d{0,2})?$/ // 负小数，保留两位小数
      },
      config.regExp
    )
    // 错误提示信息
    const errorMsg = Object.assign(
      {
        integer: '请输入整数',
        decimal: '请输入数字，最多保留两位小数',
        positive: '请输入正整数',
        negative: '请输入负整数',
        positiveDecimal: '请输入数字，不超过两位小数',
        negativeDecimal: '请输入数字，不超过两位小数'
      },
      config.errorMsg
    )

    // 定义校验函数
    const handleInput = () => {
      let val = el.value
      let regExp
      let msg

      // 如果为空或非数字，则直接返回
      if (!val || isNaN(val)) {
        return
      }

      // 匹配相应的正则表达式
      switch (config.type) {
        case 'integer':
          regExp = regConfig.integer
          msg = errorMsg.integer
          break
        case 'decimal':
          regExp = regConfig.decimal
          msg = errorMsg.decimal
          break
        case 'positive':
          regExp = regConfig.positive
          msg = errorMsg.positive
          break
        case 'negative':
          regExp = regConfig.negative
          msg = errorMsg.negative
          break
        case 'positiveDecimal':
          regExp = regConfig.positiveDecimal
          msg = errorMsg.positiveDecimal
          break
        case 'negativeDecimal':
          regExp = regConfig.negativeDecimal
          msg = errorMsg.negativeDecimal
          break
        default:
          regExp = regConfig.integer
          msg = errorMsg.integer
      }

      // 校验输入值是否符合指定的正则表达式
      if (!regExp.test(val)) {
        // 不符合，则使用错误提示信息提示用户
        const prevCursorPos = el.selectionStart - 1
        let replacedVal = ''
        for (let i = 0; i < val.length; i++) {
          if (regExp.test(replacedVal + val.charAt(i))) {
            replacedVal += val.charAt(i)
          }
        }
        el.value = replacedVal
        showErrorMsg(msg, prevCursorPos)
      }
    }

    // 定义弹窗显示错误信息
    const showErrorMsg = (msg, prevCursorPos) => {
      alert(msg)
      setTimeout(() => {
        el.focus()
        el.setSelectionRange(prevCursorPos, prevCursorPos)
      }, 0)
    }

    // 注册事件监听
    el.addEventListener('input', handleInput)

    // 在元素销毁时移除事件监听
    el.__numberOnlyHandleInput__ = handleInput
    el.__numberOnlyErrorMsg__ = errorMsg
  },
  unbind(el) {
    el.removeEventListener('input', el.__numberOnlyHandleInput__)
    delete el.__numberOnlyHandleInput__
    delete el.__numberOnlyErrorMsg__
  }
}
