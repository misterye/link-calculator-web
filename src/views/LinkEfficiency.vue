<template>
  <div class="container">
    <div class="header">
      <button class="back-btn" @click="router.back()">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        返回
      </button>
      <h1 class="title">链路效率计算</h1>
    </div>
    
    <div class="card">
      <h2 class="subtitle">链路类型</h2>
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" value="downlink" v-model="linkType" @change="onLinkTypeChange">
          下行链路
        </label>
        <label class="radio-label">
          <input type="radio" value="uplink" v-model="linkType" @change="onLinkTypeChange">
          上行链路
        </label>
      </div>
    </div>
    
    <div class="card">
      <h2 class="subtitle">计算方式</h2>
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" value="datarate" v-model="calcType" @change="onCalcTypeChange">
          输入数据速率
        </label>
        <label class="radio-label">
          <input type="radio" value="symbolrate" v-model="calcType" @change="onCalcTypeChange">
          输入符号速率
        </label>
      </div>
    </div>
    
    <div class="card">
      <h2 class="subtitle">MODCOD 选择</h2>
      <select v-model="selectedModcod" class="select-input" @change="showResult = false">
        <option v-for="modcod in currentModcods" :key="modcod" :value="modcod">
          {{ modcod }}
        </option>
      </select>
    </div>
    
    <div class="card" v-if="calcType === 'datarate'">
      <h2 class="subtitle">输入数据速率</h2>
      <div class="input-group">
        <label class="input-label">数据速率 (kbps)</label>
        <input 
          class="input" 
          type="number" 
          v-model.number="inputDataRate" 
          placeholder="请输入数据速率"
          @input="showResult = false"
        />
      </div>
    </div>
    
    <div class="card" v-if="calcType === 'symbolrate'">
      <h2 class="subtitle">输入符号速率</h2>
      <div class="input-group">
        <label class="input-label">符号速率 (ksps)</label>
        <input 
          class="input" 
          type="number" 
          v-model.number="inputSymbolRate" 
          placeholder="请输入符号速率"
          @input="showResult = false"
        />
      </div>
    </div>
    
    <button class="btn-primary" @click="calculate">计算</button>
    
    <div class="card" v-if="showResult">
      <h2 class="subtitle">计算结果</h2>
      <div class="result-group">
        <div class="result-item">
          <span class="result-label">数据速率 (datarate)：</span>
          <span class="result-value">{{ result.dataRate }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">符号速率 (symbolrate)：</span>
          <span class="result-value">{{ result.symbolRate }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">占用带宽 (bandwidth)：</span>
          <span class="result-value">{{ result.bandwidth }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">链路效率 (efficiency)：</span>
          <span class="result-value">{{ result.efficiency }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import calculator from '../utils/calculator'

const router = useRouter()

const linkType = ref('downlink')
const calcType = ref('datarate')
const selectedModcod = ref('')
const inputDataRate = ref('')
const inputSymbolRate = ref('')
const showResult = ref(false)
const result = ref({
  dataRate: '',
  symbolRate: '',
  bandwidth: '',
  efficiency: ''
})

const rollOffPercentage = calculator.getRollOffPercentage()

const currentModcods = computed(() => {
  return linkType.value === 'downlink' ? calculator.DOWNLINK_MODCODS : calculator.UPLINK_MODCODS
})

// Initialize selectedModcod
onMounted(() => {
  selectedModcod.value = currentModcods.value[0]
})

const onLinkTypeChange = () => {
  selectedModcod.value = currentModcods.value[0]
  showResult.value = false
}

const onCalcTypeChange = () => {
  showResult.value = false
}

const calculate = () => {
  if (calcType.value === 'datarate') {
    if (!inputDataRate.value) {
      alert('请输入数据速率')
      return
    }
    
    const dataRate = parseFloat(inputDataRate.value)
    const symbolRate = calculator.calculateSymbolRate(dataRate, selectedModcod.value)
    const bandwidth = calculator.calculateBandwidth(symbolRate)
    const efficiency = calculator.calculateEfficiency(dataRate, bandwidth)
    
    result.value = {
      dataRate: dataRate.toFixed(3) + " kbps",
      symbolRate: symbolRate.toFixed(3) + " ksps (-" + rollOffPercentage + "%)",
      bandwidth: bandwidth.toFixed(3) + " kHz (-" + rollOffPercentage + "%)",
      efficiency: efficiency.toFixed(3) + " bps/Hz"
    }
  } else {
    if (!inputSymbolRate.value) {
      alert('请输入符号速率')
      return
    }
    
    const symbolRate = parseFloat(inputSymbolRate.value)
    const dataRate = calculator.calculateDataRate(symbolRate, selectedModcod.value)
    const bandwidth = calculator.calculateBandwidth(symbolRate)
    const efficiency = calculator.calculateEfficiency(dataRate, bandwidth)
    
    result.value = {
      symbolRate: symbolRate.toFixed(3) + " ksps (-" + rollOffPercentage + "%)",
      dataRate: dataRate.toFixed(3) + " kbps",
      bandwidth: bandwidth.toFixed(3) + " kHz (-" + rollOffPercentage + "%)",
      efficiency: efficiency.toFixed(3) + " bps/Hz"
    }
  }
  showResult.value = true
}
</script>

<style scoped>
/* Scoped styles are mostly removed as they are now global in main.css */
</style>
