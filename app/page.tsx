import Dashboard from "@/components/Dashboard";
import Image from "next/image";
import agentforceRobot from "@/lib/images/agentforce-robot.png";

export default function Home() {
  return (
    <div className="relative">
      <main className="flex w-full">
        <div className="fixed left-10 top-1/2 -translate-y-1/2">
          <Image
            src={agentforceRobot}
            alt="Agentforce Robot"
            width={450}
            height={450}
            className="object-contain"
          />
        </div>
        <div className="w-[2000px]">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
