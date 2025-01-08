import React from 'react';
import { Head } from '@inertiajs/react';
import Header from './Header';
import Features from './Features';
import Stats from './Stats';
import News from './News';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <Head>
        <title>IFCSA - International Financial Commission Supervisory Authority</title>
        <meta 
          name="description" 
          content="International Financial Commission Supervisory Authority - Protecting traders' interests and ensuring fair practices in the financial markets" 
        />
      </Head>

      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  International Financial Commission Supervisory Authority
                </h1>
                <p className="text-xl mb-8">
                  Protecting traders' interests and ensuring fair practices in the financial markets
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/check-your-broker"
                    className="inline-block bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Check Your Broker
                  </a>
                  <a
                    href="/apply-for-membership"
                    className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
                  >
                    Apply for Membership
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <Features />

          {/* Stats Section */}
          <Stats />

          {/* News Section */}
          <News />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home; 