export default function Loading() {
  return (
    <main className="px-8 py-12">
      <section className="w-full max-w-7xl mx-auto">
        <div className="mb-6 h-6 w-40 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="h-4 w-2/3 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
              <div className="mt-2 h-4 w-1/3 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
              <div className="mt-4 h-5 w-1/4 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


