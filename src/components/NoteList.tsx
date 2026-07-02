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

function getNoteSize(note: Note) {
  const bytes = new Blob([note.title, note.content]).size

  if (bytes < 1024) {
    return `${bytes} B`
  }

  return `${(bytes / 1024).toFixed(1)} KB`
}

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
    <section className="flex min-h-0 flex-1 flex-col">
      <header className="border-b border-zinc-800 px-5 py-6">
        <p className="font-mono text-sm font-black uppercase tracking-[0.18em] text-[#00ff57]">
          Markdown Notes
        </p>
        <p className="mt-2 text-xs text-zinc-500">鱼皮的笔记本 · {totalNoteCount} 条</p>
      </header>

      <div className="border-b border-zinc-800 px-4 py-5">
        <label className="sr-only" htmlFor="note-search">
          搜索笔记
        </label>
        <input
          className="h-11 w-full border border-zinc-800 bg-[#181818] px-4 font-mono text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 hover:border-zinc-700 focus:border-[#00ff57] focus:ring-1 focus:ring-[#00ff57]"
          id="note-search"
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="搜索笔记..."
          type="search"
          value={searchQuery}
        />
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-2 py-4" aria-label="笔记列表">
        {notes.map((note) => {
          const isSelected = note.id === selectedNoteId

          return (
            <button
              aria-pressed={isSelected}
              className={[
                'w-full border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[#00ff57] focus:ring-offset-2 focus:ring-offset-black',
                isSelected
                  ? 'border-[#00ff57] bg-[#1b241d] shadow-[0_0_0_1px_rgba(0,255,87,0.25)]'
                  : 'border-transparent bg-transparent hover:border-zinc-800 hover:bg-[#151515]',
              ].join(' ')}
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              type="button"
            >
              <span className="block truncate font-mono text-sm font-bold text-zinc-200">
                {note.title || '未命名笔记'}
              </span>
              <span className="mt-3 block font-mono text-xs text-zinc-500">
                {getNoteSize(note)} · {dateFormatter.format(new Date(note.updatedAt))}
              </span>
            </button>
          )
        })}

        {notes.length === 0 ? (
          <div className="border border-dashed border-zinc-800 bg-[#111] p-4 text-sm text-zinc-500">
            {isSearching ? '没有找到匹配的笔记。' : '还没有笔记，点击“新建笔记”开始。'}
          </div>
        ) : null}
      </div>

      <div className="border-t border-zinc-800 p-4">
        <button
          className="min-h-12 w-full bg-[#00ff57] px-4 font-mono text-sm font-black text-black transition hover:bg-[#32ff7a] active:bg-[#00d648] focus:outline-none focus:ring-2 focus:ring-[#00ff57] focus:ring-offset-2 focus:ring-offset-black"
          onClick={onCreateNote}
          type="button"
        >
          + 新建笔记
        </button>
      </div>
    </section>
  )
}
