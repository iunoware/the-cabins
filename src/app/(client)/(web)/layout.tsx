import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import FloatingContact from "./(components)/FloatingContact";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar scrolls away, Navbar sticks */}
      <TopBar />
      <Navbar />
      <main className="grow">{children}</main>
      <FloatingContact />
    </div>
  );
}
