import type { Note } from '../types/note'

type MarkdownPreviewProps = {
  note: Note
}

export function MarkdownPreview({ note }: MarkdownPreviewProps) {
  return (
    <section className="min-h-dvh bg-white p-6 lg:p-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-sm font-medium text-slate-500">实时预览</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">{note.title}</h2>
        </div>
        <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Preview
        </span>
      </div>

      <article className="mx-auto mt-8 max-w-3xl text-slate-800">
        <h1 className="text-3xl font-semibold text-slate-950">
          {note.title || '未命名笔记'}
        </h1>

        {note.content ? (
          <pre className="mt-6 whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-700">
            {note.content}
          </pre>
        ) : (
          <div className="mt-6 rounded-md border border-dashed border-slate-300 p-6 text-sm text-slate-500">
            当前笔记还没有内容。
          </div>
        )}

        <blockquote className="mt-6 border-l-4 border-cyan-600 bg-cyan-50 px-4 py-3 text-sm leading-6 text-slate-700">
          当前阶段已经接入 React state，可以新建笔记并切换当前选中的笔记。
        </blockquote>
      </article>
    </section>
  )
}
