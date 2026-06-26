import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.15),_transparent_30%),#020617] text-slate-100">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Real-Time Support Chat</p>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">Connect customers and support agents instantly.</h1>
            <p className="max-w-2xl text-lg text-slate-400">A modern support chat platform built with a production-ready MERN stack, real-time socket messaging, admin tools, and responsive UI.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">
                Get Started
              </Link>
              <Link to="/login" className="rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-900">
                Login
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-2xl">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-100">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Support Chat Preview</p>
              <div className="mt-6 space-y-5">
                <div className="rounded-3xl bg-slate-950 p-5 shadow-inner">
                  <p className="text-sm text-slate-400">Start a conversation, upload files, and get instant help.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950 p-5">
                    <p className="text-sm text-slate-400">Real-time messaging</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950 p-5">
                    <p className="text-sm text-slate-400">Admin dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
