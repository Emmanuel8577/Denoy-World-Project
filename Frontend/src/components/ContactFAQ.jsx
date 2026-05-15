import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is your typical project turnaround time?",
    answer: "For standard development and localization projects, we typically deliver a first milestone within 2-4 weeks. Larger enterprise solutions depend on scope."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, we provide ongoing maintenance and technical support for all our digital products to ensure they scale effectively."
  },
  {
    question: "How do you handle indigenous language accuracy?",
    answer: "We work with certified native linguists and cultural consultants to ensure every message is not just translated, but culturally resonated."
  }
];

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif font-black text-slate-900 mb-16 text-center">Frequently ask Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 last:border-0">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-8 flex items-center justify-between text-left group"
                >
                  <span className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </span>
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-slate-500 font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;