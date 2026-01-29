import { ExpenseDashboard } from "../components/ExpenseDashboard";
import { FileUploader } from "../components/FileUploader";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-purple-50 font-sans text-zinc-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
        <header className="flex flex-col gap-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-white px-3 py-1 text-sm text-purple-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-purple-600" />
            Prototype
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            CFO Agent
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600">
            Auto‑PCG categorization with confidence governance—upload receipts and
            visualize spend distribution.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-950">Receipts</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Drag and drop receipts (PDF/JPG/PNG) to begin ingestion.
            </p>
            <div className="mt-4">
              <FileUploader />
            </div>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-950">
              Expense Dashboard
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Donut chart overview of expenses by category.
            </p>
            <div className="mt-4">
              <ExpenseDashboard />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
