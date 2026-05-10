import Hero from "../components/Hero.jsx";
import {motion, useInView, useScroll, useTransform, AnimatePresence} from "motion/react";
import processors from "../data/processors.json";
import backgroundVideo from "../assets/landing-page-video.mp4";
import {useEffect, useRef} from "react";

const HomePage = ({setSearchParams}) => {

    const {scrollY} = useScroll();

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
        <div className="w-full relative h-screen overflow-scroll snap-y snap-mandatory">
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

                <section className="relative z-10 min-h-screen bg-zinc-200 pb-32 snap-start">
                    <h1 className="tracking-widest font-semibold text-center text-2xl mt-4">Collected Artifacts</h1>
                    <div
                        className="max-w-7xl mx-autorounded-2xl text-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2 px-2">

                        {
                            processors.map((processor) => (
                                    <motion.div
                                        whileTap={{scale: 0.85, y: 1}}
                                        transition={{type: "spring", stiffness: 300, damping: 20}}
                                        onClick={() => {

                                            setSearchParams({"processorId": processor.id});
                                        }}
                                        key={processor.id}
                                        className="p-4 bg-zinc-100 shadow-2xl  m-3 rounded-lg hover:scale-110 duration-300">
                                        <h3 className="text-2xl">{processor.title}</h3>
                                        <p>{processor.year}</p>
                                    </motion.div>
                            ))
                        }
                    </div>
                </section>

            </div>

        </div>
    );
}
export default HomePage;