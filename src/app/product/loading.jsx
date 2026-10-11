
export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f7f8f3] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="h-5 w-40 rounded bg-neutral-200" />

        <div className="mt-6 rounded-3xl bg-white p-6">
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="h-32 w-32 rounded-2xl bg-neutral-200" />
            <div className="flex-1 space-y-4">
              <div className="h-4 w-32 rounded bg-neutral-200" />
              <div className="h-9 w-2/3 rounded bg-neutral-200" />
              <div className="h-4 w-full rounded bg-neutral-200" />
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-28 rounded-2xl bg-neutral-200" />
          ))}
        </div>

        <div className="mt-8 h-72 rounded-2xl bg-neutral-200" />
      </div>
    </main>
  );
}
