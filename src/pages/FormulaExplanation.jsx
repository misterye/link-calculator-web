import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import 'katex/dist/katex.min.css'
import GlassCard from '../components/GlassCard'
import { useI18n } from '../contexts/I18nContext'
import { ArrowLeft, BookOpenText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FormulaExplanation() {
  const { type } = useParams()
  const navigate = useNavigate()
  const { locale, t } = useI18n()
  const [content, setContent] = useState('')

  useEffect(() => {
    // Map URL path parameter to markdown file names
    const fileMap = {
      'link-efficiency': 'link_efficiency_formula',
      'power-converter': 'power_converter_formula',
      'ebn0': 'ebn0_formula',
      'noise-figure': 'noise_figure_formula',
      'antenna': 'antenna_formula',
      'eirp-gt': 'eirp_gt_formula'
    };

    const fileName = fileMap[type];
    if (!fileName) {
      setContent('Document not found / 文档未找到');
      return;
    }

    // Determine the path to the markdown file depending on current locale
    const mdPath = `/docs/${locale}/${fileName}.md`;

    fetch(mdPath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load markdown file');
        }
        return response.text();
      })
      .then(text => {
        // Pre-process markdown to convert standard LaTeX display/inline math to remark-math expected format
        const processedText = text
          // Convert block math \[ ... \] to $$ ... $$ (ensure it's on a new line)
          .replace(/\\\[([\s\S]*?)\\\]/g, '\n$$$$$1$$$$\n')
          // Convert inline math \( ... \) to $ ... $
          .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');
        
        setContent(processedText);
      })
      .catch(err => {
        console.error('Error fetching markdown:', err);
        setContent('Error loading content.');
      });
  }, [type, locale])

  return (
    <div className="flex flex-col gap-6 pt-4 pb-12 max-w-4xl mx-auto w-full px-4 sm:px-0">
      <div className="flex items-center gap-4 mb-2">
        <motion.button 
          onClick={() => navigate(-1)} 
          className="glass-card !p-2.5 !rounded-full cursor-pointer shrink-0"
          style={{
            border: '1px solid var(--border-glass)',
            minWidth: '38px',
            minHeight: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Go back"
        >
          <ArrowLeft size={18} style={{ color: 'var(--text-secondary)' }} />
        </motion.button>
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--result-num)] text-white shadow-lg shadow-[var(--accent-glow)] hidden sm:flex shrink-0">
          <BookOpenText size={24} className="stroke-[2.5px]" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-transparent">
          {t('common.formulaExplanation')}
        </h1>
      </div>

      <GlassCard delay={0.05} className="!p-6 sm:!p-10 !rounded-[32px] overflow-hidden relative border-[var(--bg-elevated)] ring-1 ring-[var(--border-glass)] shadow-2xl">
        {/* Subtle decorative glow */}
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
