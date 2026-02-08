export default function TrackCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 flex items-center gap-4 animate-pulse">
      <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-2 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}
