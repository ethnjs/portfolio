export default function HeroSection() {
    return(
        <section 
            id="welcome"
            className="relative flex h-screen flex-col items-center justify-center text-center"
        >
            <h1 className="flex flex-col items-start p-0 m-0">
                <span className="font-bold text-[4rem] leading-[1.2] text-white">
                    hi my name is
                </span>
                <span className="font-citadel text-white leading-none text-[10rem] -mt-6">
                    Ethan Shih
                </span>
            </h1>

            <a
                href="#about"
                aria-label="Scroll down"
                className="scroll-down-arrow"
            />
        </section>
    )
}