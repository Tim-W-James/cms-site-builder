import AlertBanner from "components/AlertBanner";

const Layout = ({
  preview,
  loading,
  children,
}: {
  preview: boolean;
  loading?: boolean;
  children: React.ReactNode;
}) => (
  <div className="min-h-screen">
    <AlertBanner loading={loading} preview={preview} />
    <main>{children}</main>
  </div>
);
export default Layout;
