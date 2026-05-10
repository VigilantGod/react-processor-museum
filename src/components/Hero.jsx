const Hero = ({processor ,className}) => {

    const displayData = processor || {
        title: "Processor Archive: Faculty of Computing",
        colors: {
            from: "from-blue-500",
            via: "via-sky-300",
            to: "to-white"
        }
    }

    const {title,colors} = displayData;
    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <h1 className={`text-center text-shadow-2xl text-shadow-white px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold bg-clip-text text-transparent bg-linear-to-r ${colors.from} ${colors.via} ${colors.to} font-sans`}>{title}</h1>
        </div>
    );
}

export default Hero;