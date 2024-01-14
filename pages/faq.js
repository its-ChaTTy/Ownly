import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import FAQ from '@/components/FAQ/FAQ';


export default function faq() {

  return (
    <div>
      <Navbar />
      <FAQ />
      <Footer />
    </div>
  );
}