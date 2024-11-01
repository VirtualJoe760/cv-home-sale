import React, { ReactNode } from 'react';

// Define the Gutter component
interface GutterProps {
  children: ReactNode;
}

const Gutter: React.FC<GutterProps> = ({ children }) => {
  return <div className="container mx-auto px-4 lg:px-8">{children}</div>;
};

export default Gutter;
