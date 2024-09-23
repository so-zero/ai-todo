import { ConvexClientProvider } from "../ConvexClientProvider";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <ConvexClientProvider session={session}>{children}</ConvexClientProvider>
  );
}
