import Hero from "../components/Hero.jsx";
import {motion, useScroll, useTransform} from "motion/react";
import BentoCard from "../components/BentoCard.jsx";
import {useEffect, useRef} from "react";

const ProcessorView = ({activeProcessor, processors}) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [activeProcessor]);

    const currentYear = parseInt(activeProcessor.year);

    const years = [];
    processors.map(processor => {
        years.push(parseInt(processor.year));
    })

    const minYear = 1997;
    const maxYear = 2017;

    const timeLinePercentage = ((currentYear - minYear) / (maxYear - minYear)) * 100;


    const scrollContainer = useRef(null);

    const {scrollY} = useScroll({container: scrollContainer});

    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 300], [1, 0.85]);
    const heroY = useTransform(scrollY, [0, 300], [1, -50]);

    const bentoGrid = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div
            className="relative bg-black text-black overflow-scroll h-screen w-full snap-y snap-mandatory"
            ref={scrollContainer}>
            <motion.div
                style ={{opacity:heroOpacity}}
                className={"fixed top-0 left-0 w-full z-50 backdrop-blur-xl py-4 px-6 pointer-events-none"}>
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                    <span className="text-xs font-bold text-zinc-400 drop-shadow-md ">{minYear}</span>

                    <div className="relative flex-1 h-3 bg-zinc-200/60 rounded-full overflow-visible">
                        <motion.div
                            className={`absolute top-0 left-0 h-full rounded-full bg-linear-to-r ${activeProcessor.colors.from} ${activeProcessor.colors.via} ${activeProcessor.colors.to} `}
                            initial={{width: "0%"}}
                            animate={{width: `${timeLinePercentage}%`}}
                            transition={{duration: 1.2, ease: "easeOut", delay: 0.2}}/>
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 -ml-6 w-12 flex justify-center z-10"
                            initial={{left: "0%"}}
                            animate={{left: `${timeLinePercentage}%`}}
                            transition={{duration: 1.2, ease: "easeOut", delay: 0.2}}>
                            <motion.div
                                animate={{y: [0, -6, 0]}}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    repeatDelay: 4,
                                    ease: "easeInOut",
                                    delay: 0.2
                                }}
                                className="text-[10px] text-xs font-extrabold text-zinc-800 bg-white border border-zinc-200 px-2 py-1 rounded-full shadow-md">
                                {currentYear}
                            </motion.div>
                        </motion.div>

                        <div className="hidden md:block w-20"></div>

                    </div>
                    <span className="text-xs font-bold text-zinc-400">{maxYear}</span>
                </div>
            </motion.div>
            <section>
                <div className="relative flex justify-center">
                    <motion.div
                        className="fixed pointer-events-none min-h-screen w-full z-0 top-0 left-0 object-cover flex items-center justify-center"
                        style={{opacity: heroOpacity, scale: heroScale, y: heroY}}>
                        <motion.div
                            initial={{opacity: 0, y: 40}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.3}}
                        >
                            <Hero processor={activeProcessor}/>
                        </motion.div>
                    </motion.div>
                </div>
                <div className="max-w-4xl text-center flex flex-col justify-center items-center">
                    <h2 className="text-xl tracking-widest uppercase font-semibold"> Summary </h2>
                </div>
            </section>
            <section className="h-screen snap-center">

            </section>

            <section className="relative z-10 h-screen snap-center bg-zinc-100 flex flex-col p-2 pt-6 ">
                <div>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="text-sm md:text-base font-bold tracking-[0.2em] uppercase items-center mb-8">
                        Tech Specs
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.1}}
                        className={`text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r ${activeProcessor.colors.from} ${activeProcessor.colors.via} ${activeProcessor.colors.to}`}>
                        Power by the Numbers.
                    </motion.div>
                </div>
                <motion.div
                    className="w-full min-h-0 flex-1 grid grid-cols-2 grid-rows-5 content-start place-content-center relative p-1 gap-2 overflow-auto md:grid md:grid-cols-2 md:grid-rows-4 "
                    variants={bentoGrid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: false}}>
                    <BentoCard title="Released Year" content={activeProcessor.year}
                               className="col-span-1"/>
                    <BentoCard title="Architecture" content={
                        <div>
                            <h1 className="text-lg">
                                {activeProcessor.architecture}
                            </h1>
                        </div>}
                               className="col-span-1"/>
                    <BentoCard title="Clock Speed" content={activeProcessor.clockSpeed}
                               className="col-span-2"/>
                    <BentoCard title="Form Factor" content={activeProcessor.formFactor}
                               className="col-span-2"/>
                    <BentoCard title="Transistor Count" content={activeProcessor.transistors}
                               className="col-span-1"/>
                    <BentoCard title="Previous Model" content={activeProcessor.previousModel}
                               className="col-span-1"/>
                    <BentoCard title="Performance Increase" className="w-full col-span-2" content={
                        <div className="">
                            {`x${activeProcessor.performanceMultiplier}`}
                        </div>
                    }
                    />
                </motion.div>
            </section>

            <section className="relative z-10 w-full min-h-screen bg-zinc-50 snap-start">
                <div className="max-w-3xl mx-auto px-6 space-y-20"></div>
                <motion.h2
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    className={`text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r ${activeProcessor.colors.from} ${activeProcessor.colors.via} ${activeProcessor.colors.to}`}>
                    Story Behind the Silicon.
                </motion.h2>
                {
                    activeProcessor.description.map(section => {
                        return (
                            <motion.div key={section.title}
                                        initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: false, margin: "-100px"}}
                                        className="flex flex-col text-left px-2">
                                <h3 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-zinc-400 mb-4 ">{section.title}</h3>
                                <p className="text-lg text-zinc-800 leading-relaxed whitespace-pre-wrap font-medium mb-10">{section.content}</p>
                            </motion.div>
                        )
                    })
                }
            </section>


            <section>

            </section>
        </div>
    );
}
export default ProcessorView;