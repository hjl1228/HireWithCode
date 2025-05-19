<template>
  <div class="welcome-container">
    <img src="../assets/logo.png" alt="Infist Logo" class="logo" />
    <h1 class="welcome-text">欢迎来到 infist 线上面试环节，期待你的加入！</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/guide')
  }, 2000)
})
</script>

<style scoped>
.welcome-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4f8cff 0%, #6ed0ff 100%);
}

.logo {
  width: 200px;
  height: auto;
  margin-bottom: 2rem;
  animation: spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12), 0 1.5px 8px 0 rgba(255,255,255,0.18) inset;
  border-radius: 50%;
  background: rgba(255,255,255,0.38);
  padding: 2.2rem;
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border: 1.5px solid rgba(255,255,255,0.32);
}

@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}

.welcome-text {
  font-size: 2.2rem;
  color: #fff;
  text-align: center;
  padding: 0 1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.15);
  margin-top: 1rem;
  border-radius: 38px;
  background: rgba(255,255,255,0.18);
  box-shadow: 0 2px 12px rgba(31, 38, 135, 0.08), 0 1.5px 8px 0 rgba(255,255,255,0.13) inset;
  display: inline-block;
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  border: 1.5px solid rgba(255,255,255,0.22);
}

@media (max-width: 768px) {
  .logo {
    width: 120px;
    padding: 1rem;
  }
  .welcome-text {
    font-size: 1.3rem;
    padding: 0 0.5rem;
  }
}
</style> 