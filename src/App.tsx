import { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { LandingPage } from './components/LandingPage'
import { ReportView } from './components/ReportView'
import { GistLoader } from './components/GistLoader'

type View = 'landing' | 'loading-gist' | 'report'

function App() {
  const [view, setView] = useState<View>('landing')
  const [report, setReport] = useState<string | null>(null)
  const [gistId, setGistId] = useState<string | null>(null)

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
    setView('landing')
  }

  const handleBackToHome = useCallback(() => {
    setReport(null)
    setGistId(null)
    setView('landing')
    window.history.replaceState({}, '', window.location.pathname)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header showHome={view === 'report'} onHome={handleBackToHome} />
      <main>
        {view === 'loading-gist' && gistId && (
          <GistLoader
            gistId={gistId}
            onLoaded={handleGistLoaded}
            onError={handleGistError}
          />
        )}
        {view === 'landing' && <LandingPage />}
        {view === 'report' && report && (
          <ReportView report={report} onNewQA={handleBackToHome} />
        )}
      </main>
    </div>
  )
}

export default App
