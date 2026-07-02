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
        <h1 className="text-3xl font-semibold text-slate-950">Markdown 笔记应用</h1>
        <p className="mt-4 leading-7">
          右侧区域用于展示 Markdown 渲染后的效果。后续会接入 react-markdown，
          让这里跟随左侧编辑器实时更新。
        </p>

        <blockquote className="mt-6 border-l-4 border-cyan-600 bg-cyan-50 px-4 py-3 text-sm leading-6 text-slate-700">
          当前阶段先完成页面布局，下一步再接入笔记状态管理。
        </blockquote>

        <pre className="mt-6 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-100">
          <code>{'const app = "Markdown Notebook";'}</code>
        </pre>
      </article>
    </section>
  )
}
