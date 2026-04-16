import { useEffect, useState } from 'react'

interface Props {
  gistId: string
  onLoaded: (markdown: string) => void
  onError: () => void
}

export function GistLoader({ gistId, onLoaded, onError }: Props) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGist() {
      try {
        const res = await fetch(`https://api.github.com/gists/${gistId}`)
        if (!res.ok) {
          throw new Error(res.status === 404 ? 'Gist not found' : `GitHub API error (${res.status})`)
        }
        const data = await res.json()
        const files = data.files || {}
        // Find the first .md file, or fall back to the first file
        const mdFile = Object.values(files).find(
          (f: unknown) => (f as { filename: string }).filename.endsWith('.md'),
        ) || Object.values(files)[0]

        if (!mdFile) {
          throw new Error('Gist contains no files')
        }

        const content = (mdFile as { content: string }).content
        if (!content) {
          throw new Error('Gist file is empty')
        }

        onLoaded(content)
      } catch (err) {
        setError((err as Error).message)
      }
    }

    fetchGist()
  }, [gistId, onLoaded])

  if (error) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-red-800 mb-1">Failed to load report</h2>
          <p className="text-sm text-red-600">{error}</p>
          <p className="text-xs text-red-400 mt-2 font-mono">Gist ID: {gistId}</p>
        </div>
        <button
          onClick={onError}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Go to manual input
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto text-center space-y-3 py-12">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-sm text-slate-500">Loading report from GitHub Gist...</p>
    </div>
  )
}
