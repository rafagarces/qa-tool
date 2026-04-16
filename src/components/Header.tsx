export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">QA</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 leading-tight">
              Design System QA
            </h1>
            <p className="text-xs text-slate-500">Report viewer</p>
          </div>
        </div>
        <div className="text-xs text-slate-400">
          Generate reports with{' '}
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono">
            /qa-design-system
          </code>
        </div>
      </div>
    </header>
  )
}
