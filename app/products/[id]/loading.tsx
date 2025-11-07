export default function Loading() {
  return (
    <main className="px-8 py-12">
      <section className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="aspect-square w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-zinc-800 animate-pulse" />
        <div className="flex flex-col gap-4">
          <div className="h-7 w-2/3 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
          <div className="h-5 w-1/3 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
          <div className="h-24 w-full bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
        </div>
      </section>
    </main>
  );
}


