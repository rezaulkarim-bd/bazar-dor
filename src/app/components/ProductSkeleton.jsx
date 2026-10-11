export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-200 rounded-xl"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
              <div className="h-3 bg-neutral-200 rounded w-1/3"></div>
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 flex justify-between items-center">
            <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}