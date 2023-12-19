import { useEffect, useState } from "react"
import AddNote from "./components/AddNote"
import ListNote from "./components/ListNotes"
import { Toaster } from "react-hot-toast";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend';
function App(){
    type note ={
        id: string;
        name: string;
        status: string;
    }
    const [tasks, setTasks] = useState<note[]>(()=>{
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    console.log(tasks);
    useEffect(() => {
        console.log("trigger");
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const Backend = isMobile ? TouchBackend : HTML5Backend; 
    return(
        <DndProvider backend={Backend}>
        <div className="pt-5 w-screen" >
            <Toaster
                    position="bottom-left"
                    reverseOrder={false}></Toaster>
            <div className="flex  justify-center">
            <h1 className="text-3xl text-center font-medium">DO-IT</h1>
            </div>
            <div className="pt-10 text-center md:static bg-white z-50 sticky bottom-0 right-8"  >
            <AddNote tasks={tasks} setTasks={setTasks}></AddNote>
            </div>
            <div className="flex justify-center ">

            <ListNote tasks={tasks} setTasks={setTasks}></ListNote>
            </div>
           
        </div>
        </DndProvider>
    )
}

export default App