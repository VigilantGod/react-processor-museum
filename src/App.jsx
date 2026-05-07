import {useState} from 'react'
import Hero from "./components/Hero.jsx";
import ProcessorView from "./pages/ProcessorView.jsx";
import {useSearchParams} from "react-router-dom";
import processors from "./data/processors.json";
import HomePage from "./pages/HomeView.jsx";


function App() {
    const [searchParams, setSearchParams] = useSearchParams();

    const activeProcessorId = searchParams.get("processorId");

    const activeProcessor = processors.find(p => p.id === activeProcessorId);


    return (
        <div className="min-h-screen w-full text-zinc-950 flex flex-col">
            {!activeProcessor ?
                (
                    <HomePage setSearchParams={setSearchParams} />
                ) : (
                    <ProcessorView/>
                )
            }
        </div>
    )
}

export default App
