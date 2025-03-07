/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Image from "next/image";
import mulesoftLogo from "@/lib/images/mulesoft-logo.png";
import agentforceLogo from "@/lib/images/agentforce-agent-astro.png";
import agentforceRobot from "@/lib/images/agentforce-robot.png";

// import mulesoftLogoLight from "@/lib/images/mulesoft-light.png";
// import { buttonVariants } from "@/components/ui/button";
// import AuthButton from "@/components/AuthButton";

const Navbar = async () => {
  return (
    <header className="bg-mulesoft sticky w-full top-0 z-10 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-start h-28">
          <Image
            src={agentforceLogo}
            alt="AgentForce Logo"
            width={70}
            height={70}
            className="object-contain"
          />
          {/* </Link> */}
          {/* Add navigation items here if needed */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
