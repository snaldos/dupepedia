// src/app/search/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-700"></div>
      <p className="ml-4 text-gray-500">Loading...</p>
    </div>
  );
}
