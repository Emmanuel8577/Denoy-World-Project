import React from "react";
import ContactHero from "../components/ContactHero";
import ContactCTA from "../components/ContactCTA";
import ContactFAQ from "../components/ContactFAQ";

const ContactPage = () => {
  return (
    <div className="bg-white">
      {/* Dark Animated Hero */}
      <ContactHero />
      
      {/* Main Channels (Light background) */}
      <ContactCTA />
      
      {/* Clean FAQ Section */}
      <ContactFAQ />
    </div>
  );
};

export default ContactPage;