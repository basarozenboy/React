import SideNav from "@/app/ui/dashboard/sidenav";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <nav className="p-4">
            <ThemeToggle />
          </nav>
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
