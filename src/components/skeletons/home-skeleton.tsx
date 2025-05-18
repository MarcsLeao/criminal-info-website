export function HomeSkeleton() {
    
    return (
        <section className="bg-zinc-950 h-screen overflow-hidden">
            <main className="grid grid-cols-[2fr,1fr] h-screen animate-pulse">
                <div className="flex flex-col justify-between w-full gap-4 p-5">
                    <div className="flex flex-col justify-between w-full h-full gap-4 p-5">
                        <div className="h-4 w-40 bg-zinc-700 rounded" />

                        <div className="flex flex-col gap-4">
                            <div className="h-24 w-64 bg-zinc-700 rounded" />
                            <div className="h-4 w-80 bg-zinc-700 rounded" />
                            <div className="flex gap-4">
                                <div className="h-20 w-full bg-zinc-700 rounded" />
                                <div className="h-20 w-full bg-zinc-700 rounded" />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="h-10 w-24 bg-zinc-700 rounded-full" />
                            <div className="h-10 w-24 bg-zinc-700 rounded-full" />
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex h-full flex-col p-8 gap-4 justify-center items-center bg-white">
                    <div className="h-6 w-60 bg-zinc-300 rounded" />
                    <div className="h-4 w-40 bg-zinc-300 rounded mb-4" />
                    <div className="flex flex-col gap-4 w-full">
                        <div className="h-12 bg-zinc-300 rounded w-full" />
                        <div className="h-12 bg-zinc-300 rounded w-full" />
                        <div className="h-12 bg-zinc-300 rounded w-full mt-4" />
                    </div>
                </div>
            </main>
        </section>
    )
}
 