interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="p-4 md:p-8 lg:p-16">
      {children}
    </div>
  );
}; 