
export default function HeroPage(){
    return (
        <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] h-[500px] bg-[url('https://tecdn.b-cdn.net/img/new/standard/city/078.jpg')]">
        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-[hsla(0,0%,0%,0.75)]">
            <div className="flex h-full items-center justify-center">
                <div className="px-6 text-center text-white md:px-12">
                    <h1 className="mt-6 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                        MTC Scheduler <br/>
                    </h1>
                    <h4 className="mt-6 mb-16 text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl">
                        Created by Arjun Venat and Teodor Hellgren
                    </h4>
                    <a className="mb-2 inline-block rounded-full border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 md:mr-2 md:mb-0"
                       data-te-ripple-color="light" role="button">Get started</a>
                    <a className="inline-block rounded-full px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-20 hover:text-neutral-200 focus:text-neutral-200 focus:outline-none focus:ring-0 active:text-neutral-300"
                       data-te-ripple-color="light" role="button">Learn more</a>
                </div>
            </div>
        </div>
    </div>
    );
}