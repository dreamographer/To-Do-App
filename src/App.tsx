import { useEffect, useState } from "react"
import AddNote from "./components/AddNote"
import ListNote from "./components/ListNotes"
import { Toaster } from "react-hot-toast";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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
    return(
        <DndProvider backend={HTML5Backend}>
        <div className="mt-10">
            <Toaster></Toaster>
            <h1 className="text-3xl text-center font-medium">DO-IT</h1>
            <div className="mt-10 text-center"  >
            <AddNote tasks={tasks} setTasks={setTasks}></AddNote>
            </div>
            <ListNote tasks={tasks} setTasks={setTasks}></ListNote>
           
        </div>
        </DndProvider>
    )
}

export default App