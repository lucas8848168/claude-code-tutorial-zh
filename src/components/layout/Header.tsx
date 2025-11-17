import { Link } from 'react-router-dom'
import { ThemeToggle } from '../ui/ThemeToggle'
import { SearchBar } from '../navigation/SearchBar'

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-900 dark:text-gray-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
          
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Claude Code 教程
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4 flex-1 md:flex-none md:ml-8">
          <div className="hidden md:block flex-1 md:flex-none md:w-64">
            <SearchBar />
          </div>
          <div className="md:hidden">
            <SearchBar />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
