import { AuthProvider } from "@/contexts/auth-context";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black">
        {/* NO HEADER OR FOOTER - Clean portal experience */}
        {children}
      </div>
    </AuthProvider>
  );
}
