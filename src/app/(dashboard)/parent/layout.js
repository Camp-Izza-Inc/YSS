import Navbar from "@/components";
export default function YouthDashboardLayout({ children }) {
  return (
    <main>
      <Navbar account_type="parent" />
      <section className="md:absolute md:left-[15rem] left-0 w-full md:w-[calc(100%-15rem)] p-3">
        {children}
      </section>
    </main>
  );
}
