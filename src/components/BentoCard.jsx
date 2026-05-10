import {motion} from "motion/react";

const BentoCard = ({className, title, content}) => {

    const cardAnimation = {
        hidden : {
            opacity: 0,
            scale:0
        },
        visible : {
            opacity: 1,
            scale:1,
            transition: {
                duration: 0.2,
            }
        }

    }
    return (
        <div className={`bg-zinc-100 rounded-2xl p-2.5 hover:scale-110 duration-300 shadow-xl ${className}`}>
            <motion.div
                variants={cardAnimation}
                className="h-full w-full flex flex-col justify-center">

                <h1 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{title}</h1>
                <div className="grow flex flex-col justify-center text-3xl font-light text-zinc-900">
                    {content}
                </div>
            </motion.div>
        </div>
    )
}
export default BentoCard;