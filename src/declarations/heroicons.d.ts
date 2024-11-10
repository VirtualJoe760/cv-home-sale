// src/declarations/heroicons.d.ts

declare module "@heroicons/react/outline" {
    import { ComponentType, SVGProps } from "react";
    const content: {
      [icon: string]: ComponentType<SVGProps<SVGSVGElement>>;
    };
    export = content;
  }
  