import ReactMarkdown from 'react-markdown'
import type { Note } from '../types/note'

type MarkdownPreviewProps = {
  note: Note
}

export function MarkdownPreview({ note }: MarkdownPreviewProps) {
  const hasContent = note.content.trim().length > 0

  return (
    <section className="min-h-dvh bg-white p-6 lg:p-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-sm font-medium text-slate-500">实时预览</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            {note.title || '未命名笔记'}
          </h2>
        </div>
        <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Markdown
        </span>
      </div>

      {hasContent ? (
        <article className="mx-auto mt-8 max-w-3xl text-slate-800">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="mb-5 text-3xl font-semibold text-slate-950">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-4 mt-8 text-2xl font-semibold text-slate-950">
                  {children}
                </h2>
              ),
              p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
              ul: ({ children }) => (
                <ul className="mb-5 list-disc space-y-2 pl-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-5 list-decimal space-y-2 pl-6">{children}</ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="mb-5 border-l-4 border-cyan-600 bg-cyan-50 px-4 py-3 text-slate-700">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-900">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="mb-5 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm leading-6 text-slate-100">
                  {children}
                </pre>
              ),
              a: ({ children, href }) => (
                <a
                  className="font-medium text-cyan-700 underline underline-offset-4"
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {children}
                </a>
              ),
            }}
          >
            {note.content}
          </ReactMarkdown>
        </article>
      ) : (
        <div className="mx-auto mt-8 max-w-3xl rounded-md border border-dashed border-slate-300 p-6 text-sm text-slate-500">
          当前笔记还没有内容，左侧输入 Markdown 后会在这里实时预览。
        </div>
      )}
    </section>
  )
}
