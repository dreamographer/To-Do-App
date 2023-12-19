import { ChangeEvent, FormEvent, useState } from "react"
import {v4 as uuidv4} from 'uuid'
import toast from "react-hot-toast"
 type note = {
        id: string;
        name: string;
        status: string;
    }
interface Props{
    tasks: note[],
    setTasks: React.Dispatch<React.SetStateAction<note[]>>
}
function AddNote({tasks,setTasks}:Props){
     const [task,setTask]=useState({
        id:'',
        name:'',
        status:'todo'
     }) 
    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const id = uuidv4()
        setTask({ ...task, id: id, name: e.target.value })
     }   
    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault()
        if (task.name.length<3) {
            return toast.error('Task must have at least 3 charcters')
        }
        if (task.name.length > 10) {
            return toast.error('Task can have maximum 10 character')
        }
        // add the condition for max length
        console.log("new"+tasks);
        setTasks((prevTasks) => [...prevTasks, task])
        toast.success('Note added Successfully')
        setTask({
            id: '',
            name: '',
            status: 'todo'
        })
    }
    return(
        <>
        <label htmlFor="note">Add Tasks</label>
        <form className=" items-center mt-5"  onSubmit={handleSubmit}>
            <div className="">
            <input type="text" className="border bg-slate-100 rounded-md h-10 px-3"
            value={task.name} 
            name="note" id="note" onChange={handleChange}/>
            <button type="submit" className="bg-blue-300 h-10 rounded-md px-3 ml-3">Add</button>
            </div>
        </form>
        </>
       
    )
}
export default AddNote