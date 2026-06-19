import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import 'katex/dist/katex.min.css'
import GlassCard from '../components/GlassCard'
import { useI18n } from '../contexts/I18nContext'
import { Shield } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Disclaimer() {
  const navigate = useNavigate()
  const { locale, t } = useI18n()
  const [content, setContent] = useState('')

  useEffect(() => {
    const mdPath = `/docs/${locale}/disclaimer.md`
    fetch(mdPath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load disclaimer file')
        }
        return response.text()
      })
      .then(text => {
        setContent(text)
      })
      .catch(err => {
        console.error('Error fetching disclaimer:', err)
        setContent('Error loading content. / 加载失败。')
      })
  }, [locale])

  return (
    <div className="flex flex-col gap-6 pt-4 pb-12 max-w-4xl mx-auto w-full px-4 sm:px-0">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--result-num)] text-white shadow-lg shadow-[var(--accent-glow)] hidden sm:flex shrink-0">
          <Shield size={24} className="stroke-[2.5px]" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-transparent">
          {t('disclaimer.title')}
        </h1>
      </div>

      <GlassCard delay={0.05} className="!p-6 sm:!p-10 !rounded-[32px] overflow-hidden relative border-[var(--bg-elevated)] ring-1 ring-[var(--border-glass)] shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)] opacity-[0.06] rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--result-num)] opacity-[0.04] rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/4" />
        
        <div className="prose-formula relative z-10 w-full overflow-x-hidden">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </GlassCard>
    </div>
  )
}
