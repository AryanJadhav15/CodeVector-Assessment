function DashboardLayout({ children }) {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {children}
      </div>
    </main>
  );
}

export default DashboardLayout;
