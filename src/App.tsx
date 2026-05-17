import ProcessorView from "./pages/ProcessorView";
import {useSearchParams} from "react-router-dom";
import processors from "./data/processors.json";
import HomePage from "./pages/HomeView";

export interface ProcessorData {
    id: string;
    title: string;
    year: string;
    architecture: string;
    clockSpeed: string;
    transistors: string;
    formFactor: string;
    colors: {
        from: string;
        via: string;
        to: string;
    }
    previousModel: string;
    performanceMultiplier: number;
    description:
        {
            title: string;
            content: string;
        }[];
}

function App() {
    const [searchParams, setSearchParams] = useSearchParams();

    const activeProcessorId:string | null = searchParams.get("processorId") ?? null;

    const activeProcessor:ProcessorData | undefined = processors.find(p => p.id === activeProcessorId);


    return (
        <div className="min-h-screen w-full text-zinc-950 flex flex-col">
            {!activeProcessor ?
                (
                    <HomePage setSearchParams={setSearchParams} />
                ) : (
                    <ProcessorView activeProcessor={activeProcessor} processors={processors} />
                )
            }
        </div>
    )
}

export default App

