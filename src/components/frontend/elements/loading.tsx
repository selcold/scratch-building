// /src/components/frontend/elements/loading.tsx

export default function Loading() {
    return (
        <div className="fixed flex justify-center items-center bg-white w-full h-full" aria-label="loading">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
    );
}