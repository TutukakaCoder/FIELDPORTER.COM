'use client';

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 p-4'>
      <div className='bg-gray-800 rounded-lg p-8 max-w-md w-full text-center'>
        <h1 className='text-2xl font-bold text-white mb-4'>Something went wrong</h1>
        <p className='text-gray-300 mb-6'>We apologize for the inconvenience. Please try again.</p>
        <div className='space-y-4'>
          <button
            onClick={reset}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded'
          >
            Try again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className='w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded'
          >
            Return home
          </button>
        </div>
      </div>
    </div>
  );
}
