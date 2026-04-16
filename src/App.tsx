import { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { ReportInput } from './components/ReportInput'
import { ReportView } from './components/ReportView'
import { GistLoader } from './components/GistLoader'

type View = 'input' | 'loading-gist' | 'report'

function App() {
  const [view, setView] = useState<View>('input')
  const [report, setReport] = useState<string | null>(null)
  const [gistId, setGistId] = useState<string | null>(null)

  // Check URL for ?gist= parameter on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const gist = params.get('gist')
    if (gist) {
      setGistId(gist)
      setView('loading-gist')
    }
  }, [])

  function handleGistLoaded(markdown: string) {
    setReport(markdown)
    setView('report')
  }

  function handleGistError() {
    setGistId(null)
    setView('input')
  }

  function handleReportSubmit(markdown: string) {
    setReport(markdown)
    setView('report')
  }

  const handleNewReport = useCallback(() => {
    setReport(null)
    setGistId(null)
    setView('input')
    // Clean the URL
    window.history.replaceState({}, '', window.location.pathname)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="px-4 pb-12 pt-6">
        {view === 'loading-gist' && gistId && (
          <GistLoader
            gistId={gistId}
            onLoaded={handleGistLoaded}
            onError={handleGistError}
          />
        )}
        {view === 'input' && (
          <ReportInput onReport={handleReportSubmit} />
        )}
        {view === 'report' && report && (
          <ReportView report={report} onNewQA={handleNewReport} />
        )}
      </main>
    </div>
  )
}

export default App
