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
    title: 'Vibe Coding 学习笔记',
    content: `# Vibe Coding 学习笔记

## 什么是 Vibe Coding?

Vibe Coding 是一种利用 AI 辅助编程的新型开发方式。通过与 AI 对话，快速实现功能，大幅提升开发效率。

## 核心优势

- **快速开发**：从想法到实现，只需几分钟
- **降低门槛**：不需要精通所有技术细节
- **持续学习**：在实践中学习新技术

## 开发流程

1. 明确需求
2. 编写 PRD 文档
3. 与 AI 对话开发
4. 测试和优化

\`\`\`ts
const workflow = ["plan", "code", "review", "ship"];
\`\`\``,
    createdAt: '2026-07-02T12:00:00.000Z',
    updatedAt: '2026-07-02T12:30:00.000Z',
  },
  {
    id: 'note-2',
    title: 'React Hooks 最佳实践',
    content: '记录 useState、useMemo、useEffect 和自定义 Hook 的使用方式。',
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
    <main className="min-h-dvh bg-[#050505] p-0 text-zinc-200 sm:p-5">
      <div className="mx-auto grid min-h-dvh max-w-[1500px] grid-cols-1 overflow-hidden border border-zinc-800 bg-[#0b0b0b] shadow-2xl shadow-black/60 lg:min-h-[calc(100dvh-40px)] lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="flex min-h-[48dvh] flex-col border-b border-zinc-800 bg-[#0b0c0c] lg:min-h-full lg:border-b-0 lg:border-r">
          <NoteList
            notes={filteredNotes}
            onCreateNote={handleCreateNote}
            onSearchQueryChange={setSearchQuery}
            onSelectNote={setSelectedNoteId}
            searchQuery={searchQuery}
            selectedNoteId={selectedNote?.id}
            totalNoteCount={notes.length}
          />
        </aside>

        <section className="grid min-h-[52dvh] grid-cols-1 lg:min-h-full lg:grid-cols-2">
          {selectedNote ? (
            <>
              <NoteEditor
                note={selectedNote}
                onDeleteNote={handleDeleteNote}
                onUpdateNote={handleUpdateNote}
              />
              <MarkdownPreview note={selectedNote} />
            </>
          ) : (
            <div className="col-span-full flex items-center justify-center bg-[#151515] p-8 text-sm text-zinc-500">
              还没有可编辑的笔记。
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
