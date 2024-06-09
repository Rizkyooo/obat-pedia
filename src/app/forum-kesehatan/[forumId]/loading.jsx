import { Spinner } from "@nextui-org/react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <main className="h-screen flex justify-center items-center">
        <div className="hidden sm:block sm:w-1/5"></div>
        <div className="sm:w-4/5 flex justify-center items-center">
        <Spinner
          label="Loading"
          color="danger"
          size="md"
        />
        </div>
      </main>
    )
  }