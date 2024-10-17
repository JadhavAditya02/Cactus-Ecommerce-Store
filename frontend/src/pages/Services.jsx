import { motion } from 'framer-motion';

// ServiceCard component for reusability
const ServiceCard = ({ title, description, initialX }) => {
  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, x: initialX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        aria-label={`Service: ${title}`}
      >
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-lg">{description}</p>
      </motion.div>
    </div>
  );
};

const Services = () => {
  // Define services in an array for easier management
  const services = [
    {
      title: "Clothing Collection",
      description: "Explore a wide range of clothing options suitable for casual outings, formal events, and athletic activities. Our virtual store allows you to discover styles and trends with ease.",
      initialX: -50,
    },
    {
      title: "Fashion Exploration",
      description: "Get inspired by the latest trends, fashion tips, and virtual clothing lineups. We aim to offer an educational perspective on fashion and technology fusion.",
      initialX: -50,
    },
    {
      title: "Sustainability in Fashion",
      description: "Learn about the importance of sustainability in the fashion industry through our educational resources and how technology can drive more eco-friendly choices.",
      initialX: 50,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8"
    >
      <h1 className="text-4xl font-bold text-center mb-6">Our Services</h1>
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          initialX={service.initialX}
        />
      ))}
    </motion.div>
  );
};

export default Services;
