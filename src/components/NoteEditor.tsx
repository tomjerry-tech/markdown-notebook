import type { Note } from '../types/note'

type NoteEditorProps = {
  note: Note
}

export function NoteEditor({ note }: NoteEditorProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col gap-4 p-5">
      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="note-title">
          标题
        </label>
        <input
          className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          defaultValue={note.title}
          id="note-title"
          type="text"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <label className="block text-sm font-medium text-slate-700" htmlFor="note-content">
          Markdown 内容
        </label>
        <textarea
          className="mt-2 min-h-80 flex-1 resize-none rounded-md border border-slate-300 bg-white px-3 py-3 font-mono text-sm leading-6 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
          defaultValue={note.content}
          id="note-content"
          spellCheck={false}
        />
      </div>

      <button
        type="button"
        className="min-h-11 rounded-md border border-red-200 px-4 text-sm font-medium text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
      >
        删除当前笔记
      </button>
    </section>
  )
}
