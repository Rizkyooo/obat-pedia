'use client'
import DetailForum from "@/components/detailForum"
export default function page({params}) {
  return (
    <main className="min-h-screen">
        <div className="flex flex-col gap-2">
        <DetailForum/>
        </div>

    </main>
  )
}
