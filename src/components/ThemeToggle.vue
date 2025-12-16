<template>
  <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? '切换到浅色模式' : '切换到暗色模式'">
    <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

// 初始化主题
onMounted(() => {
  // 从localStorage读取保存的主题偏好
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // 如果没有保存的主题，检查系统偏好
    isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  applyTheme()
})

// 应用主题
const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

// 切换主题
const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme()
  
  // 保存到localStorage
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// 监听系统主题变化
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // 只有在用户没有手动设置主题时才自动切换
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches
      applyTheme()
    }
  })
}
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px var(--shadow-color);
  transition: all 0.3s ease;
  z-index: 1000;
  color: var(--text-color);
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px var(--shadow-color);
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.theme-toggle svg {
  transition: transform 0.3s ease;
}

.theme-toggle:hover svg {
  transform: rotate(20deg);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .theme-toggle {
    top: 10px;
    right: 10px;
    width: 44px;
    height: 44px;
  }
}
</style>
