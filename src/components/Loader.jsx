const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <div className="flex items-center gap-3 rounded-3xl bg-slate-900 px-6 py-5 shadow-2xl">
        <div className="h-4 w-4 animate-pulse rounded-full bg-blue-500" />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
