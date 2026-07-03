import TopBar from "@/src/app/(client)/(web)/(components)/(layout)/TopBar";
import Navbar from "@/src/app/(client)/(web)/(components)/(layout)/Navbar";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar scrolls away, Navbar sticks */}
      <TopBar />
      <Navbar />
      <main className="grow">{children}</main>
    </div>
  );
}
