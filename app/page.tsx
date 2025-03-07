"use client";

import Dashboard from "@/components/Dashboard";
import Image from "next/image";
import agentforceRobot from "@/lib/images/agentforce-robot.png";
import agentforceStanding from "@/lib/images/agentforce-standing.png";
import { motion } from "framer-motion";

console.log("Framer motion imported:", motion);

export default function Home() {
  return (
    <div className="relative">
      <main className="flex w-full">
        <motion.div
          className="fixed left-10 top-1/2 -translate-y-1/2 mt-24"
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={agentforceStanding}
            alt="agentforce standing"
            width={250}
            height={250}
            className="object-contain scale-x-[-1]"
            priority
          />
        </motion.div>
        <motion.div
          className="fixed right-10 top-1/4 -translate-y-1/2"
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1.5,
          }}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={agentforceRobot}
            alt="Agentforce Robot"
            width={450}
            height={450}
            className="object-contain "
            priority
          />
        </motion.div>
        <div className="w-[2000px]">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
