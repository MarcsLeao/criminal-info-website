export function InfoSkeleton() {
    
    return (
        <main className='flex h-screen animate-pulse'>
            <aside className='hidden md:flex flex-col justify-start gap-4 items-center p-5 min-w-[250px] h-full bg-zinc-950 text-white'>
                <div className='w-full'>
                    <div className='h-4 w-24 bg-zinc-700 rounded'></div>
                </div>

                {[...Array(2)].map((_, i) => (
                    <div key={i} className='w-full h-10 bg-zinc-800 rounded-lg'></div>
                ))}

                <div className='border-t border-zinc-500 py-5 w-full mt-auto'>
                    <div className='w-full h-10 bg-zinc-800 rounded-lg' />
                </div>
            </aside>

            <section className='w-full flex flex-col'>
                <div className='p-5 flex justify-start items-center gap-4 border-b-2'>
                    {[...Array(2)].map((_, i) => (
                        <div key={i}>
                            <div className='h-4 w-20 bg-zinc-400/60 rounded mb-1' />
                            <div className='h-10 w-48 bg-zinc-400/30 rounded' />
                        </div>
                    ))}

                    <div className='ml-auto mt-4'>
                        <div className='h-9 w-24 bg-zinc-400/30 rounded' />
                    </div>
                </div>

                <div className='p-5 h-full overflow-hidden overflow-y-auto'>
                    <div className='space-y-2'>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className='w-full h-6 bg-zinc-400/40 rounded' />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
