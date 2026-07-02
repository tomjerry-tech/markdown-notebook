import type { Note } from '../types/note'

type NoteListProps = {
  notes: Note[]
  selectedNoteId?: string
  searchQuery: string
  totalNoteCount: number
  onCreateNote: () => void
  onSearchQueryChange: (query: string) => void
  onSelectNote: (noteId: string) => void
}

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})

export function NoteList({
  notes,
  selectedNoteId,
  searchQuery,
  totalNoteCount,
  onCreateNote,
  onSearchQueryChange,
  onSelectNote,
}: NoteListProps) {
  const isSearching = searchQuery.trim().length > 0

  return (
    <section className="border-b border-slate-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-cyan-700">
            Markdown Notebook
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">我的笔记</h1>
          <p className="mt-1 text-xs text-slate-500">共 {totalNoteCount} 条笔记</p>
        </div>

        <button
          className="min-h-11 rounded-md bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          onClick={onCreateNote}
          type="button"
        >
          新建
        </button>
      </div>

      <label className="mt-5 block text-sm font-medium text-slate-700" htmlFor="note-search">
        搜索笔记
      </label>
      <input
        className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
        id="note-search"
        onChange={(event) => onSearchQueryChange(event.target.value)}
        placeholder="输入标题或内容关键词"
        type="search"
        value={searchQuery}
      />

      <div className="mt-5 space-y-2" aria-label="笔记列表">
        {notes.map((note) => {
          const isSelected = note.id === selectedNoteId

          return (
            <button
              aria-pressed={isSelected}
              className={[
                'w-full rounded-md border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2',
                isSelected
                  ? 'border-cyan-600 bg-cyan-50'
                  : 'border-slate-200 bg-white hover:border-slate-300',
              ].join(' ')}
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              type="button"
            >
              <span className="block truncate text-sm font-semibold text-slate-950">
                {note.title || '未命名笔记'}
              </span>
              <span className="mt-1 block truncate text-xs text-slate-500">
                {note.content || '空白笔记'}
              </span>
              <span className="mt-3 block text-xs text-slate-400">
                {dateFormatter.format(new Date(note.updatedAt))}
              </span>
            </button>
          )
        })}

        {notes.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
            {isSearching ? '没有找到匹配的笔记。' : '还没有笔记，点击“新建”开始。'}
          </div>
        ) : null}
      </div>
    </section>
  )
}
