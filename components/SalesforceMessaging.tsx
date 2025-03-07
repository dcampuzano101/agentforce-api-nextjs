"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Script from "next/script";

declare global {
  interface Window {
    embeddedservice_bootstrap: {
      settings: {
        language: string;
        enableUserInputForConversationWithBot: boolean;
        targetElement: Element | null;
      };
      init: (
        orgId: string,
        eswConfigDevName: string,
        baseCoreURL: string,
        settings: { scrt2URL: string }
      ) => void;
      utilAPI: {
        launchChat: () => void;
        sendMessage: (message: string) => void;
      };
    };
    initEmbeddedMessaging: () => void;
  }
}

export default function SalesforceMessaging() {
  useEffect(() => {
    // Define the initialization function
    window.initEmbeddedMessaging = function () {
      try {
        window.embeddedservice_bootstrap.settings.language = "en_US";

        window.embeddedservice_bootstrap.init(
          "00DHr00000EijWr",
          "SDO_Messaging_for_Web",
          "https://dcampuzano-241210-56-demo.my.site.com/ESWSDOMessagingforWeb1733858881745",
          {
            scrt2URL:
              "https://dcampuzano-241210-56-demo.my.salesforce-scrt.com",
          }
        );

        // Add event listener for when messaging is ready
        window.addEventListener("onEmbeddedMessagingReady", () => {
          console.log("Embedded messaging is ready");
        });
      } catch (err) {
        console.error("Error loading Embedded Messaging: ", err);
      }
    };
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <Script
          src="https://dcampuzano-241210-56-demo.my.site.com/ESWSDOMessagingforWeb1733858881745/assets/js/bootstrap.min.js"
          onLoad={() => window.initEmbeddedMessaging()}
          strategy="lazyOnload"
        />
      </CardContent>
    </Card>
  );
}
