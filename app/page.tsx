"use client";

import { useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import Image from "next/image";
import agentforceRobot from "@/lib/images/agentforce-robot.png";
import { motion } from "framer-motion";

console.log("Framer motion imported:", motion);

export default function Home() {

  return (
    <div className="relative">
      <main className="flex w-full">
        <motion.div
          className="fixed left-10 top-1/3 -translate-y-1/2"
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
            src={agentforceRobot}
            alt="Agentforce Robot"
            width={450}
            height={450}
            className="object-contain"
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
