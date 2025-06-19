import { Spinner } from "@heroui/react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <main className="h-screen w-full flex justify-center items-center">
        <Spinner
          label="Loading"
                                color="primary"
          size="xl"
        />
      </main>
    )
  }