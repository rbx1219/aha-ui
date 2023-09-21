<!-- src/views/LoginPage.vue -->

<template>
    <div class="login-page">
      <!-- 可以包含子路由视图的地方 -->
      <router-view></router-view>

      <!-- 或者你可以在这里添加其他页面级的元素或组件 -->
    </div>
  </template>

  <script>
  export default {
    name: 'LoginPage',

    // 如果需要, 可以包括本地的状态, 计算属性, 方法等
    data() {
      return {};
    }
  }
  </script>

  <style scoped>
  .login-page {
  }
  </style>
