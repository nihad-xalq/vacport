import { FC, ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return (
    // bg-gradient-to-br from-blue-50 via-white to-blue-100
    <main className="flex-1 px-3 py-8 bg-gray-50 min-h-screen max-h-screen h-screen overflow-y-auto">
      {children}
    </main>
  );
};

export default Main;
