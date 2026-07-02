function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-7xl gap-6 px-6 py-6">
        <aside className="flex w-96 flex-col gap-4 border-r border-slate-200 pr-6">
          <header>
            <p className="text-sm font-medium text-slate-500">Markdown Notebook</p>
            <h1 className="mt-1 text-2xl font-semibold">我的笔记</h1>
          </header>

          <button
            type="button"
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white"
          >
            新建笔记
          </button>

          <input
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
            placeholder="搜索标题或内容"
            type="search"
          />

          <div className="rounded-md border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
            暂无笔记列表
          </div>

          <input
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
            placeholder="笔记标题"
            type="text"
          />

          <textarea
            className="min-h-72 resize-none rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm outline-none focus:border-slate-500"
            placeholder="输入 Markdown 内容"
          />
        </aside>

        <section className="flex-1 rounded-md bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">实时预览</h2>
          <div className="mt-6 rounded-md border border-dashed border-slate-300 p-6 text-sm text-slate-500">
            Markdown 预览将在这里显示
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
