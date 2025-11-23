interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export default function Layout({ children, maxWidth = 'lg', className = '' }: LayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-3xl',   // 768px - for forms and focused content
    md: 'max-w-5xl',   // 1024px - for regular pages
    lg: 'max-w-6xl',   // 1152px - for dashboards
    xl: 'max-w-7xl',   // 1280px - for home page
    full: 'max-w-full', // no restriction
  };

  return (
    <div className="min-h-screen bg-white">
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-6 py-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}
