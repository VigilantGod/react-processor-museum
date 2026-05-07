import Hero from "../components/Hero.jsx";
import {motion, useInView, useScroll, useTransform} from "motion/react";
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
        if(videoRef.current) {
            if (videoRef.current){
                if (isHeroInView){
                    videoRef.current.play();
                }else {
                    videoRef.current.pause();
                }
            }
        }
    }, [isHeroInView]);
    return (
        <div className="w-full relative ">
            <motion.div>

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
                                initial={{ opacity: 0 , y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 , ease: "ease-out" }}>
                            <Hero/>
                            </motion.div>
                        </motion.div>
                    </section>
                </section>

                <section className="relative z-10 min-h-screen bg-zinc-950/40 backdrop-blur-3xl pt-24 pb-32">
                    <div
                        className="max-w-7xl mx-autorounded-2xl text-white grid grid-cols-3 gap-6 px-6">
                        {
                            processors.map((processor) => (
                                <motion.div
                                    onClick={() => {
                                        setSearchParams({"processorId": processor.id});
                                    }}
                                    key={processor.id}
                                    className="p-4 bg-white/10  m-3 rounded-lg hover:scale-110 duration-300">
                                    <h3 className="text-2xl">{processor.title}</h3>
                                    <p>{processor.year}</p>
                                </motion.div>
                            ))
                        }
                    </div>
                </section>

            </motion.div>

        </div>
    );
}
export default HomePage;