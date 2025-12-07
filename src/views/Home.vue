<template>
  <div class="container">
    <h1 class="title" style="margin-bottom: 30px;">链路参数计算器</h1>
    
    <div class="card">
      <h2 class="subtitle">主要功能</h2>
      <div class="button-group">
        <button class="btn-primary" @click="navigateToLinkEfficiency">链路效率计算</button>
        <button class="btn-primary" @click="navigateToPowerConverter">功放功率换算</button>
      </div>
    </div>
    
    <div class="card">
      <h2 class="subtitle">功能介绍</h2>
      <div class="description">
        <p>1. 链路效率计算：根据不同链路类型（上行/下行）计算数据速率、符号速率、占用带宽及利用效率。</p>
        <p class="mt-2">2. 功放功率换算：在 Watts 和 dBm 两种单位之间进行功率值转换。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLinkEfficiency = () => {
  router.push('/link-efficiency')
}

const navigateToPowerConverter = () => {
  router.push('/power-converter')
}
</script>

<style scoped>
.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.description {
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.6;
}

.mt-2 {
  margin-top: 10px;
}
</style>
