import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Card } from '@/components/UI/Card';

/**
 * NotFound - 404 Error Page
 * 
 * Friendly 404 page with helpful navigation
 */
export function NotFound() {
  return (
    <div className="container mx-auto p-6 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="p-12 max-w-2xl text-center space-y-6">
        {/* 404 Graphic */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-(--color-text) opacity-10">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-24 h-24 text-(--color-text-secondary)" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-(--color-text)">
            Page Not Found
          </h2>
          <p className="text-lg text-(--color-text-secondary)">
            Oops! The page you're looking for doesn't exist. 
            It might have been moved or deleted.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap pt-4">
          <Link 
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-(--color-bg-secondary) hover:bg-(--color-bg-tertiary) text-(--color-text) rounded-lg font-medium transition-colors border border-(--color-border)"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="pt-6 border-t border-(--color-border)">
          <p className="text-sm text-(--color-text-secondary) mb-3">
            Or try one of these:
          </p>
          <div className="flex gap-2 justify-center flex-wrap text-sm">
            <Link 
              to="/components" 
              className="text-blue-500 hover:underline"
            >
              Components
            </Link>
            <span className="text-(--color-text-secondary)">•</span>
            <Link 
              to="/themes" 
              className="text-blue-500 hover:underline"
            >
              Themes
            </Link>
            <span className="text-(--color-text-secondary)">•</span>
            <Link 
              to="/basic" 
              className="text-blue-500 hover:underline"
            >
              Multi-Step Nav
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
