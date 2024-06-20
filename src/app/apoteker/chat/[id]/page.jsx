import Chat from "../components/chat"
export default function Page({params}) {
  return (
    <div className=" w-full">
       <Chat id={params?.id}/>
    </div>
  )
}
