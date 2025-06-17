import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart, DollarSign, Percent, Award } from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import VideoPlayer from '../components/VideoPlayer';
import BenefitCard from '../components/BenefitCard';
import Testimonial from '../components/Testimonial';
import CountdownTimer from '../components/CountdownTimer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Set end date to 3 days from now for countdown timer
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  
  const handleCTAClick = () => {
    navigate('/offer');
  };
  
  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1A2744] to-[#2A3754] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
                Protect Your Future With <span className="text-[#D4AF37]">Gold & Silver</span>
              </h1>
              <p className="text-xl opacity-90 mb-6 leading-relaxed">
                Discover how precious metal stacking can safeguard your wealth against inflation and economic uncertainty.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button onClick={handleCTAClick} type="primary">
                  Get Your Free Guide
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <VideoPlayer 
                thumbnailUrl="https://live.staticflickr.com/65535/54545553563_5272406a7e.jpg"
                videoUrl="https://www.youtube.com/embed/HyQRnKmqVmM?si=uWSad-lO3-IlUt5K&controls=1&rel=0&modestbranding=1&playsinline=1"
                title="Gold and Silver Guide"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2744] mb-4">
              Why Stack Gold & Silver?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Precious metals have been the ultimate store of value for over 5,000 years. 
              Here's why they're essential in today's economy:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<img src="/logo.png" alt="Legacy Wealth Builders" className="h-10 w-10" />}
              title="Inflation Protection"
              description="Physical gold and silver have historically maintained their purchasing power during periods of high inflation, unlike paper currency."
              delay={0}
            />
            <BenefitCard 
              icon={<TrendingUp size={40} />}
              title="Wealth Preservation"
              description="Precious metals act as a shield against economic uncertainty and market volatility, preserving your wealth for generations."
              delay={1}
            />
            <BenefitCard 
              icon={<BarChart size={40} />}
              title="Portfolio Balance"
              description="Adding gold and silver to your holdings reduces overall risk through diversification away from paper assets."
              delay={2}
            />
            <BenefitCard 
              icon={<DollarSign size={40} />}
              title="Direct Ownership"
              description="Physical metals aren't someone else's liability - unlike stocks and bonds that depend on promises from issuers."
              delay={3}
            />
            <BenefitCard 
              icon={<Percent size={40} />}
              title="Tax Benefits"
              description="Certain precious metal holdings offer significant tax advantages compared to other assets."
              delay={4}
            />
            <BenefitCard 
              icon={<Award size={40} />}
              title="Tangible Asset"
              description="Unlike digital assets, precious metals are physical assets you can hold, store, and access independently of financial systems."
              delay={5}
            />
          </div>
          
          <div className="text-center mt-12">
            <Button onClick={handleCTAClick} type="primary">
              Get Your Free Guide
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2744] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands who have protected their wealth with precious metals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              quote="I started stacking silver coins just before inflation hit hard. My metals have retained value while my cash savings eroded. Best decision I ever made."
              author="Michael T."
              role="Retired Teacher"
              avatarUrl="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              delay={0}
            />
            <Testimonial 
              quote="The free guide helped me understand how to start building my precious metals collection. I appreciate the straightforward advice without the usual sales pressure."
              author="Sarah J."
              role="Business Owner"
              avatarUrl="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              delay={1}
            />
            <Testimonial 
              quote="After researching the historical performance of gold during economic downturns, I now keep 15% of my wealth in precious metals."
              author="David W."
              role="Financial Analyst"
              avatarUrl="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              delay={2}
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-[#1A2744] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Limited Time Offer: <span className="text-[#D4AF37]">Free Guide</span>
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Our comprehensive guide reveals:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
              <div className="flex items-start">
                <div className="text-[#D4AF37] mr-3 mt-1">✓</div>
                <p>Historical performance of gold and silver during economic crises</p>
              </div>
              <div className="flex items-start">
                <div className="text-[#D4AF37] mr-3 mt-1">✓</div>
                <p>How to start stacking with as little as $100</p>
              </div>
              <div className="flex items-start">
                <div className="text-[#D4AF37] mr-3 mt-1">✓</div>
                <p>Best storage solutions to keep your metals safe</p>
              </div>
              <div className="flex items-start">
                <div className="text-[#D4AF37] mr-3 mt-1">✓</div>
                <p>Tax-advantaged ways to own precious metals</p>
              </div>
            </div>
            
            <p className="mb-8">This offer expires in:</p>
            <div className="mb-8">
              <CountdownTimer endDate={endDate} />
            </div>
            
            <Button onClick={handleCTAClick} type="primary" className="text-lg py-4 px-8">
              Get Your Free Guide Now
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;