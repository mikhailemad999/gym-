import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-base text-text-primary antialiased">
      {/* Top Header */}
      <Topbar />

      {/* Aside Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <main className="w-full pt-16 bg-surface-base min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
