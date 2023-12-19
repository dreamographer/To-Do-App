import { useEffect, useState } from "react";
import Section from "./Section";

type note = {
    id: string;
    name: string;
    status: string;
}
interface Props {
    tasks: note[],
    setTasks: React.Dispatch<React.SetStateAction<note[]>>,
}
function ListNote({ tasks, setTasks }: Props) {
    const [todos, setTodos] = useState<note[]>([])
    const [closed, setClosed] = useState<note[]>([])
    useEffect(() => {
        const fTodos = tasks.filter(task => task.status == 'todo')
        const fClosed = tasks.filter(task => task.status == 'closed')
        setTodos(()=>fTodos)
        setClosed(()=>fClosed)
    },[tasks])
    const stautuses = ['todo', 'closed']
    return (

        <div className="flex gap-32 justify-center">
            {stautuses.map((status, i) =>
                <Section key={i} status={status} tasks={tasks} setTodos={setTodos} setClosed={setClosed}  setTasks={setTasks} todos={todos} closed={closed}></Section>
            )}
        </div>

    )
}
export default ListNote