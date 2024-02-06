import React, { createContext, useState } from "react";

export const TestContext = createContext({} as any);

export function TestProvider({ children }: { children: any }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <TestContext.Provider value={{ isOpen }}>{children}</TestContext.Provider>
  );
}
