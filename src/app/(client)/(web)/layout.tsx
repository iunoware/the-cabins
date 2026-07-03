import TopBar from "@/src/app/(client)/(web)/(components)/(layout)/TopBar";
import Navbar from "@/src/app/(client)/(web)/(components)/(layout)/Navbar";
import Footer from "@/src/components/Footer";
import FloatingButtons from "@/src/components/FloatingButtons";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar scrolls away, Navbar sticks */}
      <TopBar />
      <Navbar />
      <FloatingButtons />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
