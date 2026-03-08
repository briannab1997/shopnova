import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function Layout() {
  useScrollProgress();

  return (
    <>
      <div id="scroll-progress" />
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
