import type { Note } from '../types/note'

type NoteEditorProps = {
  note: Note
  onUpdateNote: (noteId: string, updates: Pick<Note, 'title' | 'content'>) => void
  onDeleteNote: (noteId: string) => void
}

export function NoteEditor({ note, onUpdateNote, onDeleteNote }: NoteEditorProps) {
  function handleTitleChange(title: string) {
    onUpdateNote(note.id, {
      title,
      content: note.content,
    })
  }

  function handleContentChange(content: string) {
    onUpdateNote(note.id, {
      title: note.title,
      content,
    })
  }

  return (
    <section className="flex min-h-[52dvh] flex-col border-b border-zinc-800 bg-[#171717] lg:min-h-full lg:border-b-0 lg:border-r">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-[#101010] px-5 py-4">
        <input
          aria-label="笔记标题"
          className="min-w-0 flex-1 bg-transparent font-mono text-xl font-black text-zinc-200 outline-none placeholder:text-zinc-600 focus:text-[#00ff57]"
          onChange={(event) => handleTitleChange(event.target.value)}
          placeholder="未命名笔记"
          type="text"
          value={note.title}
        />
        <button
          className="min-h-9 border border-zinc-800 px-4 font-mono text-xs font-bold text-zinc-300 transition hover:border-red-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
          onClick={() => onDeleteNote(note.id)}
          type="button"
        >
          删除
        </button>
      </header>

      <textarea
        aria-label="Markdown 内容"
        className="min-h-[420px] flex-1 resize-none bg-[#1b1b1b] px-5 py-6 font-mono text-sm leading-7 text-zinc-300 outline-none placeholder:text-zinc-600 focus:bg-[#1d1d1d] lg:min-h-0"
        onChange={(event) => handleContentChange(event.target.value)}
        placeholder="输入 Markdown 内容..."
        spellCheck={false}
        value={note.content}
      />

      <footer className="flex items-center justify-between border-t border-zinc-800 bg-[#101010] px-5 py-3 font-mono text-xs text-zinc-500">
        <span>UTF-8 · Markdown</span>
        <span>已保存</span>
      </footer>
    </section>
  )
}
