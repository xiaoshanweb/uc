import Vue from 'vue'

Vue.directive('auth', {
  bind: function(el, binding, vnode) {
    // 获取按钮权限
    const value = binding.value

    // 获取用户权限
    const getters = vnode.context.$store.getters
    const auth = getters.privilegeResources.map(v => v.uri)

    // 解决权限模块闪现问题
    try {
      el.style.opacity = '0'
    } catch (e) {
      console.error(e)
    }

    if (!auth.includes(value)) {
      setTimeout(function() {
        try {
          el.parentNode.removeChild(el)
        } catch (e) {
          console.error(e)
        }
      }, 10)
    } else {
      setTimeout(function() {
        try {
          el.style.opacity = '1'
        } catch (e) {
          console.error(e)
        }
      }, 10)
    }
  }
})
