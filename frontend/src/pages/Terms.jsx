import { motion } from "framer-motion";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <p className="text-lg text-justify">{children}</p>
  </div>
);

const Terms = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 pb-20"
    >
      <h1 className="text-4xl font-bold text-center mb-6">Terms and Conditions</h1>

      <Section>
        Welcome to <strong>Cactus</strong>! These terms and conditions outline the rules and regulations for the use of the 
        Cactus educational virtual clothing store. Please read them carefully before using our website. By accessing 
        and using this website, you agree to the following terms.
      </Section>

      <Section title="Test Mode Disclaimer">
        <strong>Cactus</strong> is an educational project, and all services provided on this website, including 
        product listings, payment processes, and user data, are purely for testing and educational purposes only. 
        No actual transactions will occur, and any products or services shown are not for sale.
      </Section>

      <Section title="User Responsibilities">
        As a user of the <strong>Cactus</strong> website, you agree to use the site solely for educational 
        purposes. You are responsible for ensuring that your actions on this website are ethical and in line 
        with the intended educational scope of the platform. Any misuse of the platform or its resources, 
        including the submission of false payment details or inappropriate content, will result in immediate 
        suspension from the site.
      </Section>

      <Section title="Intellectual Property">
        All content provided on <strong>Cactus</strong> is for educational and demonstration purposes. The 
        intellectual property, such as logos, designs, and text, remains the property of their respective 
        owners. You may not copy, reproduce, or distribute any of this content without explicit permission 
        from the content owners.
      </Section>

      <Section title="Limitation of Liability">
        In no event shall <strong>Cactus</strong> be held liable for any damages or losses arising from the 
        use of this educational website. This includes, without limitation, any errors or omissions in any 
        content, or any loss or damage incurred as a result of using the website. All use of the website is 
        at the user’s own risk.
      </Section>

      <Section title="Changes to Terms">
        <strong>Cactus</strong> reserves the right to modify these terms and conditions at any time. Any changes 
        will be reflected on this page. By continuing to use the website, you agree to abide by the most current 
        version of the terms.
      </Section>

      <Section title="Contact Information">
        If you have any questions about these terms, please contact us at <strong><a href="mailto:support@cactus.com" className="text-emerald-400 hover:text-emerald-300">support@cactus.com</a></strong>.
      </Section>

      <p className="text-lg font-semibold text-justify mb-20">
        Thank you for being a part of <strong>Cactus</strong> and understanding the educational nature of this project.
      </p>
    </motion.div>
  );
};

export default Terms;
