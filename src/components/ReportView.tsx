import { useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  report: string
  onNewQA: () => void
}

export function ReportView({ report, onNewQA }: Props) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(report).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleDownload() {
    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qa-report.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Extract summary stats from the report
  const criticalCount = (report.match(/🔴/g) || []).length
  const majorCount = (report.match(/🟠/g) || []).length
  const minorCount = (report.match(/🟡/g) || []).length
  const noteCount = (report.match(/⚪/g) || []).length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Report toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-base font-semibold text-slate-900">QA Report</h2>
          <div className="flex gap-2 text-xs">
            {criticalCount > 0 && (
              <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full font-medium">
                🔴 {criticalCount}
              </span>
            )}
            {majorCount > 0 && (
              <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full font-medium">
                🟠 {majorCount}
              </span>
            )}
            {minorCount > 0 && (
              <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                🟡 {minorCount}
              </span>
            )}
            {noteCount > 0 && (
              <span className="px-2 py-0.5 bg-slate-50 text-slate-600 rounded-full font-medium">
                ⚪ {noteCount}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Markdown'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Download .md
          </button>
        </div>
      </div>

      {/* Rendered report */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 report-content">
        <Markdown remarkPlugins={[remarkGfm]}>{report}</Markdown>
      </div>

      {/* New QA button */}
      <div className="flex justify-center pb-8">
        <button
          onClick={onNewQA}
          className="px-6 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          View Another Report
        </button>
      </div>
    </div>
  )
}
