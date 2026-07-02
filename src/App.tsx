import { useMemo, useState } from 'react'
import { MarkdownPreview } from './components/MarkdownPreview'
import { NoteEditor } from './components/NoteEditor'
import { NoteList } from './components/NoteList'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Note } from './types/note'

const STORAGE_KEY = 'markdown-notes'

const initialNotes: Note[] = [
  {
    id: 'note-1',
    title: '项目开发计划',
    content:
      '# Markdown 笔记应用\n\n这是一个用于练习 React、TypeScript、Markdown 和 Git 的笔记项目。\n\n- 支持创建笔记\n- 支持实时编辑\n- 支持 Markdown 预览\n\n> 第五步会把这段内容渲染成真正的 Markdown。\n\n```ts\nconst app = "Markdown Notebook";\n```',
    createdAt: '2026-07-02T12:00:00.000Z',
    updatedAt: '2026-07-02T12:30:00.000Z',
  },
  {
    id: 'note-2',
    title: 'Git 学习记录',
    content: '记录 git status、git add、git commit、git push 的使用流程。',
    createdAt: '2026-07-02T12:10:00.000Z',
    updatedAt: '2026-07-02T12:35:00.000Z',
  },
]

function createEmptyNote(): Note {
  const now = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    title: '未命名笔记',
    content: '',
    createdAt: now,
    updatedAt: now,
  }
}

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>(STORAGE_KEY, initialNotes)
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) ?? notes[0],
    [notes, selectedNoteId],
  )

  const filteredNotes = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    if (!keyword) {
      return notes
    }

    return notes.filter((note) => {
      const title = note.title.toLowerCase()
      const content = note.content.toLowerCase()

      return title.includes(keyword) || content.includes(keyword)
    })
  }, [notes, searchQuery])

  function handleCreateNote() {
    const newNote = createEmptyNote()

    setNotes((currentNotes) => [newNote, ...currentNotes])
    setSelectedNoteId(newNote.id)
    setSearchQuery('')
  }

  function handleUpdateNote(noteId: string, updates: Pick<Note, 'title' | 'content'>) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    )
  }

  function handleDeleteNote(noteId: string) {
    const noteToDelete = notes.find((note) => note.id === noteId)

    if (!noteToDelete) {
      return
    }

    const shouldDelete = window.confirm(`确定要删除“${noteToDelete.title || '未命名笔记'}”吗？`)

    if (!shouldDelete) {
      return
    }

    const remainingNotes = notes.filter((note) => note.id !== noteId)

    setNotes(remainingNotes)

    if (selectedNoteId === noteId) {
      setSelectedNoteId(remainingNotes[0]?.id)
    }
  }

  return (
    <main className="min-h-dvh bg-[#f6f7f4] text-slate-950">
      <div className="mx-auto grid min-h-dvh max-w-7xl grid-cols-1 gap-0 border-x border-slate-200 bg-white lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="flex min-h-dvh flex-col border-b border-slate-200 bg-slate-50 lg:border-b-0 lg:border-r">
          <NoteList
            notes={filteredNotes}
            onCreateNote={handleCreateNote}
            onSearchQueryChange={setSearchQuery}
            onSelectNote={setSelectedNoteId}
            searchQuery={searchQuery}
            selectedNoteId={selectedNote?.id}
            totalNoteCount={notes.length}
          />
          {selectedNote ? (
            <NoteEditor
              note={selectedNote}
              onDeleteNote={handleDeleteNote}
              onUpdateNote={handleUpdateNote}
            />
          ) : (
            <div className="p-5 text-sm text-slate-500">还没有可编辑的笔记。</div>
          )}
        </aside>

        {selectedNote ? (
          <MarkdownPreview note={selectedNote} />
        ) : (
          <section className="min-h-dvh bg-white p-6 text-sm text-slate-500 lg:p-8">
            还没有可预览的笔记。
          </section>
        )}
      </div>
    </main>
  )
}

export default App
