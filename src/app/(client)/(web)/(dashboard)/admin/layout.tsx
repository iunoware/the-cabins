// import TopBar from "@/src/components/TopBar";
// import Navbar from "@/src/components/Navbar";
// import Footer from "@/src/components/Footer";
// import FloatingButtons from "@/src/components/FloatingButtons";
import Sidebar from "./(components)/Sidebar";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f9fafb] text-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
