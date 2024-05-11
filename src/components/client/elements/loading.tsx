// /src/components/frontend/elements/loading.tsx

export default function Loading() {
  return (
    <div
      className="flex justify-center items-center bg-neutral-50 dark:bg-neutral-950 w-screen h-screen m-auto"
      aria-label="loading"
    >
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  );
}
