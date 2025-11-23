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
      {/* Responsive margins: none on mobile, moderate on tablet, ~1.5" on large screens */}
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}
