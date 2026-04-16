interface Props {
  showHome?: boolean
  onHome?: () => void
}

export function Header({ showHome, onHome }: Props) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={onHome}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">QA</span>
          </div>
          <div className="text-left">
            <h1 className="text-lg font-semibold text-slate-900 leading-tight">
              Design System QA
            </h1>
          </div>
        </button>
        {showHome && (
          <button
            onClick={onHome}
            className="px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Back to home
          </button>
        )}
      </div>
    </header>
  )
}
