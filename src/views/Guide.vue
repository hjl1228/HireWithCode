<template>
  <div class="guide-container">
    <div class="guide-content" v-html="renderedContent"></div>
    <el-button type="primary" class="next-button" @click="goToNext">接受挑战</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import 'element-plus/dist/index.css'

const router = useRouter()
const renderedContent = ref('')

onMounted(async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/InfiniteStatesInc/HireWithCode/refs/heads/main/README.md')
    const markdown = await response.text()
    renderedContent.value = marked(markdown)
  } catch (error) {
    console.error('Failed to load guide content:', error)
    renderedContent.value = '<p>加载内容失败，请刷新页面重试。</p>'
  }
})

const goToNext = () => {
  router.push('/accept')
}
</script>

<style scoped>
.guide-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4f8cff 0%, #6ed0ff 100%);
}

.guide-content {
  flex: 1;
  background: rgba(255,255,255,0.28);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  padding: 2.5rem 2rem;
  border-radius: 38px;
  box-shadow: 0 8px 48px 0 rgba(31, 38, 135, 0.13), 0 1.5px 8px 0 rgba(255,255,255,0.18) inset;
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 700px;
  font-size: 1.1rem;
  color: #222;
  line-height: 1.8;
  transition: box-shadow 0.25s, transform 0.18s;
  border: 1.5px solid rgba(255,255,255,0.32);
}
.guide-content:hover {
  box-shadow: 0 16px 80px 0 rgba(31, 38, 135, 0.18), 0 1.5px 12px 0 rgba(255,255,255,0.22) inset;
  transform: translateY(-2px) scale(1.01);
}

.next-button {
  align-self: center;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  border-radius: 38px;
  background: linear-gradient(90deg, rgba(79,140,255,0.85) 0%, rgba(110,208,255,0.85) 100%);
  border: 1.5px solid rgba(255,255,255,0.32);
  box-shadow: 0 2px 18px rgba(31, 38, 135, 0.10), 0 1.5px 8px 0 rgba(255,255,255,0.13) inset;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
  transition: transform 0.15s, box-shadow 0.15s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px) saturate(120%);
  -webkit-backdrop-filter: blur(4px) saturate(120%);
}
.next-button:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 6px 32px rgba(31, 38, 135, 0.16), 0 1.5px 12px 0 rgba(255,255,255,0.18) inset;
}
.next-button:active {
  transform: scale(0.97);
}

@media (max-width: 768px) {
  .guide-container {
    padding: 1rem;
  }
  .guide-content {
    padding: 1rem;
    font-size: 1rem;
  }
  .next-button {
    width: 100%;
    font-size: 1rem;
    padding: 0.8rem 0;
  }
}
</style> 