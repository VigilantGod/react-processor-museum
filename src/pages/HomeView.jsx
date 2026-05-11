import Hero from "../components/Hero.jsx";
import {motion, useInView, useScroll, useTransform, AnimatePresence} from "motion/react";
import processors from "../data/processors.json";
import backgroundVideo from "../assets/landing-page-video.mp4";
import {useEffect, useRef} from "react";

const HomePage = ({setSearchParams}) => {

    const scrollContainer = useRef(null);

    const {scrollY} = useScroll({container: scrollContainer});

    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 300], [1, 0.85]);
    const heroY = useTransform(scrollY, [0, 300], [0, -50]);

    const videoRef = useRef(null);
    const heroRef = useRef(null);

    const isHeroInView = useInView(heroRef, {margin: "-100px"});

    useEffect(() => {
        if (videoRef.current) {
            if (videoRef.current) {
                if (isHeroInView) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            }
        }
    }, [isHeroInView]);
    return (
        <AnimatePresence mode="wait">
            <div
                ref={scrollContainer}
                className="w-full relative h-screen overflow-scroll snap-y snap-mandatory">
                <div>
                    <section className="h-screen snap-center">
                        <section>
                            <div className="relative">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="fixed top-0 left-0 w-full h-screen object-cover -z-10">
                                    <source src={backgroundVideo} type="video/mp4"/>
                                </video>
                            </div>
                            <section
                                ref={heroRef}
                                className="h-screen w-full flex- items-center justify-center top-0 -z-10">
                                <motion.div
                                    style={{opacity: heroOpacity, scale: heroScale, y: heroY}}>
                                    <motion.div
                                        initial={{opacity: 0, y: 40}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.8}}>
                                        <Hero/>
                                    </motion.div>
                                </motion.div>
                            </section>
                        </section>
                    </section>

                    <section className="relative z-10 min-h-screen bg-zinc-100 pb-32 snap-start">
                        <div className="">
                            <h1 className="text-sm font-bold tracking-[0.2em] px-4 py-2 text-center">Faculty of Computing Archive</h1>
                        </div>
                        <div className="flex">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">The artifacts of modern computing.</h2>

                        </div>
                        <div
                            className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 px-6 mt-16 pb-32">

                            {
                                processors.map((processor) => (
                                    <motion.div
                                        initial={{opacity:0,y:40}}
                                        whileInView={{opacity:1,y:0}}
                                        whileTap={{scale: 0.85, y: 1}}
                                        transition={{type: "spring", stiffness: 300, damping: 20,duration:0.6}}
                                        viewport={{once:false}}
                                        key={processor.id}
                                        className="group cursor-pointer flex flex-col items-center text-center"
                                        onClick={() => {

                                            setSearchParams({"processorId": processor.id});
                                        }}>
                                        <motion.div className="w-full aspect-[4/3] flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110">
                                            <img src={`/public/${processor.id}.png`}
                                                 className="max-h-56 object-contain drop-shadow-2xl"
                                                 alt={""}/>
                                        </motion.div>

                                        <p className="text-sm font-bold tracking-widest text-zinc-400">{processor.year}</p>
                                        <div className={`h-1 w-12 mt-6 rounded-full bg-linear-to-r ${processor.colors.from} ${processor.colors.via} ${processor.colors.to}`} />
                                        <h1 className="text-2xl font-bold text-zinc-900 px-4">{processor.title}</h1>


                                    </motion.div>
                                ))
                            }
                        </div>
                    </section>

                </div>

            </div>
        </AnimatePresence>
    );
}
export default HomePage;