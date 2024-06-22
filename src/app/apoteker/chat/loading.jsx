import { Spinner } from "@nextui-org/react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <main className="h-screen w-full flex justify-start items-center">
        <Spinner
          label="Loading"
          color="danger"
          size="xl"
        />
      </main>
    )
  }