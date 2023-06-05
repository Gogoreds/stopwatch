import Image from "next/image";
import Link from "next/link";

import Stopwatch from "@/components/Stopwatch";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-cyan-100">
      <Stopwatch />
    </main>
  );
}
