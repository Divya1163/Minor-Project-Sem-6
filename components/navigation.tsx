'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, BarChart3, Brain, Database } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-primary/20 bg-gradient-to-r from-card/90 via-card/80 to-popover/90 backdrop-blur-xl shadow-lg shadow-primary/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:text-accent transition-colors duration-200 group">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 group-hover:from-primary/40 group-hover:to-accent/40 transition-all">
            <Brain className="w-5 h-5 text-accent" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">ComfortAI</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 py-2 px-3 rounded-lg ${
              isActive('/') 
                ? 'text-accent bg-accent/10 shadow-md shadow-accent/20' 
                : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
            }`}
          >
            <Activity className="w-4 h-4" />
            Predictor
          </Link>
          <Link
            href="/model-performance"
            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 py-2 px-3 rounded-lg ${
              isActive('/model-performance') 
                ? 'text-accent bg-accent/10 shadow-md shadow-accent/20' 
                : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
            }`}
          >
            <Brain className="w-4 h-4" />
            ML Model
          </Link>
          <Link
            href="/dataset-comparison"
            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 py-2 px-3 rounded-lg ${
              isActive('/dataset-comparison') 
                ? 'text-accent bg-accent/10 shadow-md shadow-accent/20' 
                : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
            }`}
          >
            <Database className="w-4 h-4" />
            Dataset
          </Link>
          <Link
            href="/analytics"
            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 py-2 px-3 rounded-lg ${
              isActive('/analytics') 
                ? 'text-accent bg-accent/10 shadow-md shadow-accent/20' 
                : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </Link>
        </div>
      </div>
    </nav>
  );
}
