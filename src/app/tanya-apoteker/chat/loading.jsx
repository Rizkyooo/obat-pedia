import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
      <main className="h-screen w-full flex justify-center items-center">
        <Spinner
          label="Loading"
          color="danger"
          size="xl"
        />
      </main>
    )
  }