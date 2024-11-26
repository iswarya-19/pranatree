export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white">
      <h2 className="text-4xl font-bold text-cyan-400 animate-bounce mb-4">
        Loading...
      </h2>
      <p className="text-lg text-gray-300 italic">
        Hopefully not for too long!
      </p>
      <div className="flex space-x-2 mt-8">
        <div className="h-4 w-4 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="h-4 w-4 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
        <div className="h-4 w-4 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
      </div>
    </main>
  );
}
