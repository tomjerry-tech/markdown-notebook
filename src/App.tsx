import { MarkdownPreview } from './components/MarkdownPreview'
import { NoteEditor } from './components/NoteEditor'
import { NoteList } from './components/NoteList'
import type { Note } from './types/note'

const demoNotes: Note[] = [
  {
    id: 'note-1',
    title: '项目开发计划',
    content:
      '# Markdown 笔记应用\n\n这是一个用于练习 React、TypeScript、Markdown 和 Git 的笔记项目。\n\n```ts\nconst app = \"Markdown Notebook\";\n```',
    createdAt: '2026-07-02T12:00:00.000Z',
    updatedAt: '2026-07-02T12:30:00.000Z',
  },
  {
    id: 'note-2',
    title: 'Git 学习记录',
    content:
      '记录 git status、git add、git commit、git push 的使用流程。',
    createdAt: '2026-07-02T12:10:00.000Z',
    updatedAt: '2026-07-02T12:35:00.000Z',
  },
]

const selectedNote = demoNotes[0]

function App() {
  return (
    <main className="min-h-dvh bg-[#f6f7f4] text-slate-950">
      <div className="mx-auto grid min-h-dvh max-w-7xl grid-cols-1 gap-0 border-x border-slate-200 bg-white lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="flex min-h-dvh flex-col border-b border-slate-200 bg-slate-50 lg:border-b-0 lg:border-r">
          <NoteList notes={demoNotes} selectedNoteId={selectedNote.id} />
          <NoteEditor note={selectedNote} />
        </aside>

        <MarkdownPreview note={selectedNote} />
      </div>
    </main>
  )
}

export default App
