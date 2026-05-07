const Hero = ({processor}) => {

    const displayData = processor || {
        title: "Processor Archive: Faculty of Computing",
        colors: {
            from: "from-sky-400",
            via: "via-sky-300",
            to: "to-white"
        }
    }

    const {title,colors} = displayData;
    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <h1 className={`text-center px-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${colors.from} ${colors.via} ${colors.to} font-sans`}>{title}</h1>
        </div>
    );
}

export default Hero;