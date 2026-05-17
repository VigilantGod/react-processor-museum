import Hero from "../components/Hero";
import {motion, useScroll, useTransform} from "motion/react";
import BentoCard from "../components/BentoCard";
import {useEffect, useRef} from "react";
import type {ProcessorData} from "../App";


interface ProcessorPageProps {
    activeProcessor: ProcessorData;
    processors: ProcessorData[];
}

const ProcessorView = ({activeProcessor, processors}:ProcessorPageProps) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [activeProcessor]);

    const currentYear:number = parseInt(activeProcessor.year);

    const years:number[] = [];
    processors.map(processor => {
        years.push(parseInt(processor.year));
    })

    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

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
            className="relative bg-black text-black w-full h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-proximity scroll-smooth"
            ref={scrollContainer}>
            <motion.div
                style={{opacity: heroOpacity}}
                className={"absolute top-0 left-0 w-full z-50 py-4 px-6 pointer-events-none"}>
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
            <section className="relative h-[100dvh] w-full z-0 snap-start">
                <div className="sticky h-[100dvh] top-0 w-full flex items-center justify-center overflow-hidden">
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
            </section>

            <section className="relative z-10 h-[120vh] bg-zinc-100 w-full flex flex-col p-2 snap-start  items-center">
                <div className="sticky top-0 h-[100dvh] w-full  flex flex-col max-w-4xl ">
                    <div>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            className="text-sm md:text-base font-bold tracking-[0.2em] uppercase items-center mb-2 md:mb-2">
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
                        className="w-full min-h-0 flex-1 grid grid-cols-2 grid-rows-5 content-start place-content-center relative p-1 gap-2 overflow-auto md:overflow-hidden
                                md:grid-cols-4 md:grid-rows-4 "
                        variants={bentoGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: false}}>
                        <BentoCard title="Released Year" content={activeProcessor.year}
                                   className="col-span-1 md:col-span-2 md:col-start-1"/>
                        <BentoCard title="Architecture" content={
                            <div>
                                <h1 className="text-xl md:text-4xl">
                                    {activeProcessor.architecture}
                                </h1>
                            </div>}
                                   className="col-span-1 md:col-span-2 md:col-start-3 md:row-start-1 md:row-end-3"/>
                        <BentoCard title="Clock Speed" content={activeProcessor.clockSpeed}
                                   className="col-span-2 md:col-start-1 md:row-start-2 md:row-end-4"/>
                        <BentoCard title="Form Factor" content={activeProcessor.formFactor}
                                   className="col-span-2 "/>
                        <BentoCard title="Transistor Count" content={activeProcessor.transistors}
                                   className="col-span-1"/>
                        <BentoCard title="Previous Model" content={activeProcessor.previousModel}
                                   className="col-span-1 md:col-span-2"/>
                        <BentoCard title="Performance Increase" className="w-full col-span-2 md:col-span-1" content={
                            <div className="">
                                {`x${activeProcessor.performanceMultiplier}`}
                            </div>
                        }
                        />
                    </motion.div>
                </div>
            </section>

            <section className="relative z-20 w-full min-h-screen bg-zinc-100 snap-proximity">
                <div  className="h-[1px] w-full invisible snap-start snap-always"/>
                <div className="max-w-3xl mx-auto px-6 relative" >
                    <div className="top-0 w-full ">
                <motion.h2
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    className={`text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r ${activeProcessor.colors.from} ${activeProcessor.colors.via} ${activeProcessor.colors.to}`}>
                    Story Behind the Silicon.
                </motion.h2>
                    </div>
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
                </div>
            </section>


            <section>

            </section>
        </div>
    );
}
export default ProcessorView;