import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Note } from '../types/note'

type MarkdownPreviewProps = {
  note: Note
}

export function MarkdownPreview({ note }: MarkdownPreviewProps) {
  const hasContent = note.content.trim().length > 0

  return (
    <section className="min-h-[52dvh] bg-[#1d1d1d] lg:min-h-full">
      <header className="border-b border-zinc-800 bg-[#101010] px-5 py-4">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
          Preview
        </p>
      </header>

      {hasContent ? (
        <article className="mx-auto max-w-3xl px-6 py-8 font-mono text-zinc-300 sm:px-8">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="mb-6 border-b border-zinc-700 pb-5 text-3xl font-black text-[#00ff57]">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-4 mt-8 text-2xl font-black text-[#00ff57]">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-3 mt-6 text-xl font-black text-zinc-100">{children}</h3>
              ),
              p: ({ children }) => <p className="mb-5 leading-8 text-zinc-300">{children}</p>,
              ul: ({ children }) => (
                <ul className="mb-6 list-disc space-y-3 pl-7 leading-7">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 list-decimal space-y-3 pl-7 leading-7">{children}</ol>
              ),
              strong: ({ children }) => <strong className="font-black text-zinc-100">{children}</strong>,
              blockquote: ({ children }) => (
                <blockquote className="mb-6 border-l-4 border-[#00ff57] bg-[#112017] px-4 py-3 text-zinc-200">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const language = /language-(\w+)/.exec(className ?? '')?.[1]
                const code = String(children).replace(/\n$/, '')

                if (language) {
                  return (
                    <div className="mb-6 overflow-hidden border border-zinc-800 bg-[#090909]">
                      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
                        <span className="text-xs font-black uppercase text-[#00ff57]">
                          {language}
                        </span>
                        <span className="text-xs text-zinc-600">code</span>
                      </div>
                      <SyntaxHighlighter
                        customStyle={{
                          background: 'transparent',
                          margin: 0,
                          padding: '1rem',
                        }}
                        language={language}
                        PreTag="div"
                        style={oneDark}
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  )
                }

                return (
                  <code className="bg-[#111] px-1.5 py-0.5 text-sm text-[#00ff57]">
                    {children}
                  </code>
                )
              },
              a: ({ children, href }) => (
                <a
                  className="font-bold text-[#00ff57] underline underline-offset-4"
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
        <div className="m-6 border border-dashed border-zinc-800 bg-[#151515] p-6 font-mono text-sm text-zinc-500">
          当前笔记还没有内容，左侧输入 Markdown 后会在这里实时预览。
        </div>
      )}
    </section>
  )
}
