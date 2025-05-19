<template>
  <StarlightBackground />
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import StarlightBackground from './components/StarlightBackground.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* 动态渐变背景 */
  background: linear-gradient(120deg, #eaf4ff 0%, #4f8cff 60%, #e6e9f0 100%);
  background-size: 200% 200%;
  animation: gradientMove 12s ease-in-out infinite;
  color: #333;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
    background: linear-gradient(120deg, #eaf4ff 0%, #4f8cff 60%, #e6e9f0 100%);
  }
  50% {
    background-position: 100% 50%;
    background: linear-gradient(240deg, #eaf4ff 0%, #6ed0ff 60%, #b8c6ff 100%);
  }
  100% {
    background-position: 0% 50%;
    background: linear-gradient(120deg, #eaf4ff 0%, #4f8cff 60%, #e6e9f0 100%);
  }
}

#app {
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 