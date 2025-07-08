import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import FloatingActionButton from '@/components/FloatingActionButton';
import PageTransition from '@/components/PageTransition';
import { 
  Home, 
  User, 
  Settings, 
  LogOut,
  MessageSquare,
  Search,
  Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';

const Layout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Match full path segment (so /profile matches /profile and /profile/edit, but not /profiled)
  const isActive = (path: string) => {
    const current = location.pathname;
    if (current === path) return true;
    // Only match if next char is / or end of string
    return current.startsWith(path + '/') && (path !== '/');
  };

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <header className="mobile-header bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/home" className="flex items-center space-x-2">

          <div className="w-8 h-8 rounded-lg overflow-hidden">
  <img
    src="https://res.cloudinary.com/dmz1x7at4/image/upload/cropped_circle_image-min_xiyyo5.png"
    alt="TeamFinder Logo"
    className="w-full h-full object-cover"
  />
</div>


            <span className="font-bold text-xl text-foreground">TeamFinder</span>
          </Link>

          <div className="flex items-center space-x-2">
            {/* Notification Bell Icon */}
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="touch-target relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </Link>
            {/* Search Icon */}
            <Link to="/search">
              <Button variant="ghost" size="icon" className="touch-target">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mobile-content mobile-scroll">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-t border-border/50 safe-area-bottom">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <Link to="/home">
              <Button
                variant="ghost"
                size="sm"
                className={`flex-col h-12 w-16 touch-target ${
                  isActive('/home') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="text-xs">Home</span>
              </Button>
            </Link>

            <Link to="/my-teams">
              <Button
                variant="ghost"
                size="sm"
                className={`flex-col h-12 w-16 touch-target ${
                  isActive('/my-teams') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs">My Teams</span>
              </Button>
            </Link>

            <Link to="/profile">
              <Button
                variant="ghost"
                size="sm"
                className={`flex-col h-12 w-16 touch-target ${
                  isActive('/profile') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <User className="h-5 w-5" />
                <span className="text-xs">Profile</span>
              </Button>
            </Link>

            <Link to="/settings">
              <Button
                variant="ghost"
                size="sm"
                className={`flex-col h-12 w-16 touch-target ${
                  isActive('/settings') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="text-xs">Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;