
export default function HeroPage(){
    return (
        <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] h-[500px] bg-[url('/hero-pg-bg.png')]">
        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-[hsla(0,0%,0%,0.75)]">
            <div className="flex h-full items-center justify-center">
                <div className="px-6 text-center text-white md:px-12">
                    <h1 className="mt-6 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                        MTC Scheduler <br/>
                    </h1>
                    <h4 className="mt-6 mb-16 text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl">
                        Created by Arjun Venat and Teodor Hellgren
                    </h4>
                </div>
            </div>
        </div>
        </div>
    );
}