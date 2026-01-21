<template>
  <div class="container">
    <h1 class="title" style="margin-bottom: 30px;">{{ t('home.title') }}</h1>
    
    <div class="card">
      <h2 class="subtitle">{{ t('home.features') }}</h2>
      <div class="button-group">
        <button class="btn-primary" @click="navigateToLinkEfficiency">{{ t('home.linkEfficiency') }}</button>
        <button class="btn-primary" @click="navigateToPowerConverter">{{ t('home.powerConverter') }}</button>
      </div>
    </div>
    
    <div class="card">
      <h2 class="subtitle">{{ t('home.intro') }}</h2>
      <div class="description">
        <p>{{ t('home.introText1') }}</p>
        <p class="mt-2">{{ t('home.introText2') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from '../utils/useI18n'

const router = useRouter()
const { t } = useI18n()

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
