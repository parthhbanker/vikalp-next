import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand/5 via-white to-brand/10">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-24 h-24 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Search className="w-12 h-12 text-brand" />
        </div>
        
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-brand mb-6">
          404
        </h1>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg sm:text-xl text-muted mb-8 max-w-xl mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-brand hover:bg-brand-dark text-white font-medium rounded-lg transition-all">
            <Home size={20} className="mr-2" />
            Back to Home
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-border hover:border-brand text-foreground font-medium rounded-lg transition-all">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
