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

    const currentYear = activeProcessor.year;

    const years = [];
    processors.forEach(processor => {
        years.push(processor.year);
    })

    const scrollContainer = useRef(null);

    const {scrollY} = useScroll({container:scrollContainer});

    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 300], [1, 0.85]);
    const heroY = useTransform(scrollY, [0, 300], [1, -50]);

    const bentoGrid = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.4
            }
        }
    }

    return (
        <div className="relative bg-black text-black flex-col justify-center overflow-scroll h-screen w-full snap-y snap-mandatory"
        ref={scrollContainer}>
            <div className={"fixed top-0 left-0 w-full z-50 flex gap-4"}>
                <motion.ul className="flex justify-between">
                    {
                        processors.map(processor => {
                            if (activeProcessor.year === processor.year) {
                                return (
                                    <motion.li key={processor.id} className="text-zinc-200 opacity-100 text-xl">
                                        {processor.year}
                                    </motion.li>
                                )
                            }else{
                                return (<motion.li key={processor.id} className="text-zinc-50 opacity-50">
                                    {processor.year}
                                </motion.li>)
                            }
                        })
                    }
                </motion.ul>


            </div>
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
            </section>
            <section className="h-screen snap-center">

            </section>

            <section className="relative z-10">
                <section className="h-screen snap-center">
                <motion.div
                    className="w-full min-h-screen grid grid-cols-2 relative bg-zinc-100 p-4 gap-4 "
                    variants={bentoGrid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: false}}>
                    <div className="max-w-4xl text-center flex flex-col justify-center items-center">
                        <h2 className="text-xl tracking-widest uppercase font-semibold"> Summary </h2>
                    </div>
                    <BentoCard title="Released Year" content={activeProcessor.year} className="col-span-2"/>
                    <BentoCard title="Architecture" content={activeProcessor.architecture}/>
                    <BentoCard title="Clock Speed" content={activeProcessor.clockSpeed}/>
                    <BentoCard title="Form Factor" content={activeProcessor.formFactor}/>
                    <BentoCard title="Transistor Count" content={activeProcessor.transistors}/>
                </motion.div>
            </section>
                <section className="h-screen snap-center">
                <motion.div className="bg-zinc-200 w-screen min-h-screen">
                    <div
                        className="max-w-4xl min-h-screen mx-auto text-center text-2xl space-y-3 flex flex-col  items-center sm:text-4xl md:text-5xl pt-5 pl-4 pr-4 col-span-2 shadow-2xl">
                        <h2 className="text-xl tracking-widest uppercase font-semibold">Description</h2>
                        <p className="px-2 py-2">{activeProcessor.description}</p>
                    </div>
                </motion.div>
                </section>
            </section>

            <section>

            </section>
        </div>
    );
}
export default ProcessorView;