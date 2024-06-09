
import ForumItem from "@/components/forumItem";
import { Button } from "@nextui-org/react";


export default function Forum(){
    return (
      <main className="min-h-screen bg-gray-100">
          <div className=" flex flex-col justify-center items-center gap-2">
            <ForumItem />
            <ForumItem />
            <ForumItem />
            <ForumItem />
            <ForumItem />
            <Button size="sm" className="mt-4" color="danger" variant="ghost">
              Load More
            </Button>
          </div>
      </main>
    );
}
