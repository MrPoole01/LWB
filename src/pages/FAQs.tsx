import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HelpCircle, Plus, Minus, TrendingUp, Shield, DollarSign, BarChart } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg shadow-lg overflow-hidden mb-4"
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-medium text-[#1A2744] pr-4">{question}</h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <Minus size={24} className="text-[#D4AF37]" />
          ) : (
            <Plus size={24} className="text-[#D4AF37]" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-700 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQs: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "Getting Started",
      icon: <TrendingUp size={24} />,
      questions: [
        {
          question: "What is precious metal stacking?",
          answer: "Precious metal stacking refers to the practice of systematically accumulating physical gold and silver over time as a wealth preservation strategy. Unlike trading or speculation, stacking focuses on building a long-term position in precious metals to protect against inflation, currency devaluation, and economic uncertainty."
        },
        {
          question: "How much should I invest in precious metals?",
          answer: "Financial experts typically recommend allocating 5-20% of your investment portfolio to precious metals, depending on your risk tolerance and investment goals. Many stackers start small with fractional ounces or smaller denominations and gradually build their position over time. It's important to only invest what you can afford to hold long-term."
        },
        {
          question: "Should I buy gold or silver first?",
          answer: "Both gold and silver have their advantages. Gold is more stable and acts as a store of value, while silver is more affordable for beginners and has industrial demand. Many stackers choose to hold both metals in their portfolio. Silver often provides a good entry point due to its lower price per ounce, allowing you to start with smaller investments."
        }
      ]
    },
    {
      category: "Investment Concerns",
      icon: <Shield size={24} />,
      questions: [
        {
          question: "Is it safe to invest in precious metals?",
          answer: "Physical precious metals are considered one of the safest asset classes historically. Unlike stocks or bonds, they're tangible assets that aren't dependent on any company's performance or government's promise. However, like all investments, precious metals can fluctuate in value and should be part of a diversified portfolio."
        },
        {
          question: "What are the risks of precious metal investing?",
          answer: "The main risks include price volatility, storage and insurance costs, liquidity concerns, and the opportunity cost of not investing in yield-generating assets. Additionally, precious metals don't produce income like dividends or interest. However, these risks are often outweighed by their role as portfolio insurance during economic uncertainty."
        },
        {
          question: "How do I avoid scams when buying precious metals?",
          answer: "Always buy from reputable dealers with established track records. Verify their credentials, read reviews, and ensure they offer transparent pricing. Be wary of high-pressure sales tactics, unrealistic promises, or deals that seem too good to be true. Stick to well-known bullion products and avoid rare or collectible coins unless you're an expert."
        }
      ]
    },
    {
      category: "Practical Questions",
      icon: <DollarSign size={24} />,
      questions: [
        {
          question: "Where should I store my precious metals?",
          answer: "You have several options: home storage (in a high-quality safe), bank safety deposit boxes, or professional storage facilities. Each has pros and cons regarding cost, accessibility, and security. Many stackers use a combination of storage methods. Consider insurance coverage regardless of your chosen storage method."
        },
        {
          question: "What forms of gold and silver should I buy?",
          answer: "For beginners, we recommend government-minted coins (like American Eagles or Canadian Maples) and popular bullion bars from reputable mints. These are easily recognizable, have good liquidity, and carry lower premiums. Avoid rare or collectible coins unless you're an experienced collector, as they carry higher premiums and require specialized knowledge."
        },
        {
          question: "When is the best time to buy precious metals?",
          answer: "The best approach is dollar-cost averaging - making regular purchases over time rather than trying to time the market. This strategy helps smooth out price fluctuations. However, many stackers increase their purchases during market uncertainties or when precious metal prices are relatively low compared to historical averages."
        }
      ]
    },
    {
      category: "Market and Economics",
      icon: <BarChart size={24} />,
      questions: [
        {
          question: "Why do precious metal prices fluctuate?",
          answer: "Precious metal prices are influenced by various factors including inflation rates, currency strength (especially the US dollar), geopolitical events, supply and demand dynamics, interest rates, and overall economic sentiment. During times of uncertainty, precious metals often see increased demand as safe-haven assets."
        },
        {
          question: "How do precious metals protect against inflation?",
          answer: "Historically, precious metals have maintained their purchasing power over long periods. When currency loses value due to inflation, the price of gold and silver typically rises to reflect the decreased purchasing power of that currency. This makes precious metals an effective hedge against the erosion of wealth caused by inflation."
        },
        {
          question: "What's the difference between paper gold/silver and physical metals?",
          answer: "Paper gold/silver refers to financial instruments that track precious metal prices without physical ownership (like ETFs or futures contracts). Physical metals mean owning actual coins or bars. While paper instruments offer convenience and liquidity, physical ownership provides true portfolio insurance and eliminates counterparty risk."
        }
      ]
    }
  ];

  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1A2744] to-[#2A3754] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <HelpCircle size={60} className="text-[#D4AF37]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Get answers to common questions about precious metal investing and wealth protection strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center mb-8">
                <div className="text-[#D4AF37] mr-4">
                  {category.icon}
                </div>
                <h2 className="text-3xl font-serif font-bold text-[#1A2744]">
                  {category.category}
                </h2>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex; // Unique index across all categories
                  return (
                    <FAQItem
                      key={globalIndex}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openItems.includes(globalIndex)}
                      onToggle={() => toggleItem(globalIndex)}
                      delay={questionIndex * 0.1}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Still Have Questions Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gradient-to-r from-[#1A2744] to-[#2A3754] text-white rounded-lg p-8 text-center"
          >
            <HelpCircle size={48} className="text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold mb-4">Still Have Questions?</h3>
            <p className="text-lg opacity-90 mb-6">
              Can't find the answer you're looking for? Our team is here to help you understand 
              precious metal investing and how it can fit into your wealth protection strategy.
            </p>
            <a
              href="mailto:info@lw-builders.com"
              className="inline-block bg-[#D4AF37] text-[#1A2744] px-8 py-3 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQs; 