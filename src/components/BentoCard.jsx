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
        <div className={`bg-zinc-100 rounded-3xl p-6 hover:scale-110 duration-300 shadow-2xl ${className}`}>
            <motion.div
                variants={cardAnimation}>
                <h2 className="pb-6">{title}</h2>
                <div className="text-2xl pb-4">
                    {content}
                </div>
            </motion.div>
        </div>
    )
}
export default BentoCard;