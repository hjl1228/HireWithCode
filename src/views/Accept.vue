<template>
  <div class="accept-container">
    <h1 class="title">接受挑战</h1>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="accept-form"
    >
      <el-form-item label="GitHub ID" prop="githubId">
        <el-input
          v-model="form.githubId"
          placeholder="请输入你的 GitHub ID"
        />
      </el-form-item>
      
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="form.email"
          placeholder="请输入你的邮箱"
          type="email"
        />
      </el-form-item>
      
      <el-form-item>
        <el-button
          type="primary"
          class="submit-button"
          :loading="loading"
          @click="handleSubmit"
        >
          接受挑战
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)

const form = reactive({
  githubId: '',
  email: ''
})

const rules = {
  githubId: [
    { required: true, message: '请输入 GitHub ID', trigger: 'blur' },
    { min: 1, max: 39, message: 'GitHub ID 长度应在 1-39 个字符之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    // TODO: 这里添加实际的表单提交逻辑
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success('提交成功！')
    router.push('/submit')
  } catch (error) {
    console.error('Form validation failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.accept-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4f8cff 0%, #6ed0ff 100%);
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.accept-form {
  background: rgba(255,255,255,0.28);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  padding: 2.5rem 2rem;
  border-radius: 38px;
  box-shadow: 0 8px 48px 0 rgba(31, 38, 135, 0.13), 0 1.5px 8px 0 rgba(255,255,255,0.18) inset;
  width: 100%;
  border: 1.5px solid rgba(255,255,255,0.32);
  transition: box-shadow 0.25s, transform 0.18s;
}
.accept-form:hover {
  box-shadow: 0 16px 80px 0 rgba(31, 38, 135, 0.18), 0 1.5px 12px 0 rgba(255,255,255,0.22) inset;
  transform: translateY(-2px) scale(1.01);
}

.el-input__wrapper {
  border-radius: 22px !important;
  box-shadow: 0 2px 18px rgba(31, 38, 135, 0.08), 0 1.5px 8px 0 rgba(255,255,255,0.13) inset;
  background: rgba(255,255,255,0.38) !important;
  backdrop-filter: blur(8px) saturate(140%);
  -webkit-backdrop-filter: blur(8px) saturate(140%);
  border: 1.2px solid rgba(255,255,255,0.22);
  transition: box-shadow 0.2s, transform 0.18s;
}
.el-input__wrapper:focus-within {
  box-shadow: 0 4px 32px rgba(31, 38, 135, 0.16), 0 1.5px 12px 0 rgba(255,255,255,0.18) inset;
  transform: scale(1.03);
}

.submit-button {
  width: 100%;
  padding: 1rem;
  font-size: 1.15rem;
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
.submit-button:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 6px 32px rgba(31, 38, 135, 0.16), 0 1.5px 12px 0 rgba(255,255,255,0.18) inset;
}
.submit-button:active {
  transform: scale(0.97);
}

@media (max-width: 768px) {
  .accept-container {
    padding: 1rem;
  }
  .accept-form {
    padding: 1rem;
  }
  .title {
    font-size: 1.3rem;
  }
  .submit-button {
    font-size: 1rem;
    padding: 0.8rem 0;
  }
}
</style> 