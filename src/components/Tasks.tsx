import { ChangeEvent, useState } from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";

type note = {
    id: string;
    name: string;
    status: string;
}
interface Props {
    tasks: note[],
    setTasks: React.Dispatch<React.SetStateAction<note[]>>,
    task: {
        id: string;
        name: string;
        status: string;
    }

}
const Tasks = ({ task, tasks, setTasks }: Props)=>{
    const[edit,setEdit]=useState(false)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item:{id:task.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    
    const handleEdit = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        const mTask = tasks.map((ts) => ts.id == id ? { ...ts, name:e.target.value  } : ts)
        setTasks(()=>mTask)
        // toast("Task updated", { icon: '👏' })
        // setEdit(false)
    }
    const handleRemove=(id:string)=>{
        // if(tasks.map((ts)=>(ts.status=='closed'&&ts.id==id)?true:false)){
        //     const fTask = tasks.filter((ts) => ts.id != id)
        //     setTasks(()=>fTask)
        //     return
        // }
        // const mTask = tasks.map((ts) => ts.id == id ? { ...ts, status: 'closed' } : ts)
        const fTask = tasks.filter((ts) => ts.id != id)
            setTasks(()=>fTask)
            console.log(tasks);
            
        // setTasks(()=>mTask)
 
        toast("Task closed",{icon:'👏'})
    }
    return(
            <div ref={drag} className={`relative p-4 mt-8 ${isDragging?'opacity-25':'opacity-100'} shadow-md cursor-grab flex justify-between`}>
            {edit ? <input type="text" defaultValue={task.name} onChange={(e) => handleEdit(task.id,e)}/>:<p>{task.name}</p>}
                <button className="opacity-50" onClick={()=>handleRemove(task.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            <button onClick={() => setEdit(!edit)}>edit</button>
    </div>
    )
}

export default Tasks