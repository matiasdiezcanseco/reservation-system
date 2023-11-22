"use client";

import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div>
        <Button
          variant="destructive"
          onClick={() => {
            alert("Hello");
          }}
        >
          Alert me
        </Button>
      </div>
    </main>
  );
}
