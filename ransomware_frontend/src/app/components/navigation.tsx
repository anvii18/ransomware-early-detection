import { Shield } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
}

export function Navigation({ currentPage, onNavigate, isLoggedIn, onLogin }: NavigationProps) {
  return (
    <nav className="bg-slate-950/50 border-b border-slate-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span className="font-semibold text-white">SecureShield</span>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('about')}
                className={`text-sm transition-colors ${
                  currentPage === 'about' 
                    ? 'text-cyan-400' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                About
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`text-sm transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'text-cyan-400' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => onNavigate('pricing')}
                className={`text-sm transition-colors ${
                  currentPage === 'pricing' 
                    ? 'text-cyan-400' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pricing
              </button>
              <button
                className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
              >
                Contact
              </button>
              <button
                className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
              >
                More
              </button>
            </div>
          </div>
          <button
            onClick={onLogin}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm rounded-md transition-colors"
          >
            {isLoggedIn ? 'Account' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
}