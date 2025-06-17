export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-fieldporter-black'>
      <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-glass max-w-md w-full mx-4'>
        <div className='text-center'>
          <div className='relative mx-auto w-16 h-16 mb-6'>
            <div className='animate-spin rounded-full h-16 w-16 border-2 border-white/20 border-t-fieldporter-blue' />
          </div>
          <h2 className='text-heading-lg font-semibold text-white mb-2'>Loading</h2>
          <p className='text-body-md text-white/70'>Preparing your experience...</p>
        </div>
      </div>
    </div>
  );
}
