import { useDrag, useDrop } from "react-dnd";
import Header from "./Header";
import Tasks from "./Tasks";
import toast from "react-hot-toast";

type note = {
    id: string;
    name: string;
    status: string;
}
interface Props {
    status: string,
    tasks: note[],
    setTasks: React.Dispatch<React.SetStateAction<note[]>>,
    todos: note[],
    closed: note[],
    setClosed: React.Dispatch<React.SetStateAction<note[]>>,
    setTodos: React.Dispatch<React.SetStateAction<note[]>>
}
const Section = ({ status, tasks, setTasks, todos, closed }: Props) => {
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "task",
            drop: (item:{id:string}) => addItemToSection(item.id),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
    )
    let text = "ToDO"
    let bg = 'bg-orange-500'
    let tasksToMap = todos
    if (status == 'closed') {
        text = "closed"
        bg = 'bg-green-500'
        tasksToMap = closed
    }
    
    const addItemToSection = (id: string) => {
        setTasks((prevTasks) => prevTasks.map(ts => ts.id === id ? {...ts, status} : ts));
        toast('task status changed', { icon: '👏' })
    }
    return (
        <div ref={drop}  >
            <Header text={text} bg={bg} count={tasksToMap.length}></Header>
            {tasksToMap.length > 0 && tasksToMap.map((task) => 
            <Tasks key={task.id} task={task} tasks={tasks} setTasks={setTasks}></Tasks>)}
            <div className="mt-5">

            </div>
        </div>
    )
}

export default Section