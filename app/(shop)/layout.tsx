import Footer from "../components/layouts/footer";
import SupabaseListener from "../components/supabase-listener";
import ToasterContext from "../contexts/ToasterContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* @ts-expect-error next version of TS will fix this */}
      <SupabaseListener />
      <ToasterContext />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
