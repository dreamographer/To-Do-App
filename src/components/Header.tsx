
interface Props{
    text:string,
    bg:string,
    count:number
}
const Header=({text,bg,count}:Props)=>{
    return(
        <div className={`${bg} flex items-center h-12 gap-5 mt-5  w-60 rounded-lg px-5 uppercase  text-sm text-white `}>
            <div>
            {text}
            </div>
            <div className="bg-white text-black w-5 flex justify-center h-5 rounded-full">
            {count}
            </div>
        </div>
    )
}
export default Header