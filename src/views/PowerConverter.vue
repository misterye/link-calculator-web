<template>
  <div class="container">
    <div class="header">
      <button class="back-btn" @click="router.back()">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        返回
      </button>
      <h1 class="title">功放功率换算</h1>
    </div>
    
    <div class="card">
      <h2 class="subtitle">转换类型</h2>
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" value="wattsTodBm" v-model="convertType" @change="onConvertTypeChange">
          Watts 转 dBm
        </label>
        <label class="radio-label">
          <input type="radio" value="dBmToWatts" v-model="convertType" @change="onConvertTypeChange">
          dBm 转 Watts
        </label>
      </div>
    </div>
    
    <div class="card" v-if="convertType === 'wattsTodBm'">
      <h2 class="subtitle">输入功率</h2>
      <div class="input-group">
        <label class="input-label">功率 (W)</label>
        <input 
          class="input" 
          type="number" 
          v-model.number="inputWatts" 
          placeholder="请输入功率值"
          @input="showResult = false"
        />
      </div>
    </div>
    
    <div class="card" v-if="convertType === 'dBmToWatts'">
      <h2 class="subtitle">输入功率</h2>
      <div class="input-group">
        <label class="input-label">功率 (dBm)</label>
        <input 
          class="input" 
          type="number" 
          v-model.number="inputDBm" 
          placeholder="请输入功率值"
          @input="showResult = false"
        />
      </div>
    </div>
    
    <button class="btn-primary" @click="convert">转换</button>
    
    <div class="card" v-if="showResult">
      <h2 class="subtitle">转换结果</h2>
      <div class="result-group">
        <div class="result-item">
          <span class="result-label">BUC 输出功率为：</span>
          <span class="result-value">{{ result.value }} {{ result.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import calculator from '../utils/calculator'

const router = useRouter()

const convertType = ref('wattsTodBm')
const inputWatts = ref('')
const inputDBm = ref('')
const showResult = ref(false)
const result = ref({
  value: '',
  unit: ''
})

const onConvertTypeChange = () => {
  showResult.value = false
}

const convert = () => {
  if (convertType.value === 'wattsTodBm') {
    if (!inputWatts.value && inputWatts.value !== 0) {
      alert('请输入功率(W)')
      return
    }
    
    const watts = parseFloat(inputWatts.value)
    const dBm = calculator.wattsTodBm(watts)
    
    result.value = {
      value: dBm.toFixed(2),
      unit: "dBm"
    }
  } else {
    if (!inputDBm.value && inputDBm.value !== 0) {
      alert('请输入功率(dBm)')
      return
    }
    
    const dBm = parseFloat(inputDBm.value)
    const watts = calculator.dBmToWatts(dBm)
    
    result.value = {
      value: watts.toFixed(5),
      unit: "W"
    }
  }
  showResult.value = true
}
</script>

<style scoped>
/* Scoped styles are mostly removed as they are now global in main.css */
</style>
