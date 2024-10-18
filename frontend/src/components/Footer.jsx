import React from "react";

const Footer = () => {
  const socialLinks = [
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
  ];

  const storeLocations = [
    {
      name: "Mumbai",
      url: "https://www.google.com/maps/search/?api=1&query=Phoenix+Marketcity,+Lal+Bahadur+Shastri+Marg,+Patelwadi,+Kurla,+Kurla+West,+Kurla,+Mumbai,+Maharashtra+400070",
    },
    {
      name: "Pune",
      url: "https://www.google.com/maps/search/?api=1&query=Phoenix+Marketcity+Pune,+207,+Nagar+Rd,+Clover+Park,+Viman+Nagar,+Pune,+Maharashtra+411014",
    },
  ];

  const legalLinks = [{ name: "Terms of Service", url: "/terms" }];

  const quickLinks = [
    { name: "About Us", url: "/aboutus" },
    { name: "Services", url: "/services" },
    { name: "Privacy Policy", url: "/privacy" },
  ];

  const FooterLink = ({ href, children }) => (
    <li className="mb-2">
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : "_self"}
        rel={href.startsWith("http") ? "noopener noreferrer" : ""}
        className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline hover:scale-105 transform"
      >
        {children}
      </a>
    </li>
  );

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 hover:scale-105 transform transition duration-300">
              CACTUS
            </h3>
            <p className="text-gray-400">Fashion That Grows With You.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 hover:scale-105 transform transition duration-300">
              Contact Us
            </h4>
            <address className="not-italic">
              <ul>
                <li className="text-gray-400">
                  Email:{" "}
                  <a
                    href="mailto:support@cactus.com"
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    support@cactus.com
                  </a>
                </li>
                <li className="text-gray-400">Phone: +1 234 567 890</li>
                <li className="text-gray-400">
                  Address: 123 Main Street, Mumbai, India
                </li>
              </ul>
            </address>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 hover:scale-105 transform transition duration-300">
              Quick Links
            </h4>
            <ul>
              {quickLinks.map((link) => (
                <FooterLink key={link.url} href={link.url}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 hover:scale-105 transform transition duration-300">
              Follow Us
            </h4>
            <ul>
              {socialLinks.map((social) => (
                <FooterLink key={social.url} href={social.url}>
                  {social.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 hover:scale-105 transform transition duration-300">
              Store Locator
            </h4>
            <ul>
              {storeLocations.map((location) => (
                <FooterLink key={location.url} href={location.url}>
                  {location.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 hover:scale-105 transform transition duration-300">
              Legal
            </h4>
            <ul>
              {legalLinks.map((legal) => (
                <FooterLink key={legal.url} href={legal.url}>
                  {legal.name}
                </FooterLink>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Cactus. All rights reserved.</p>
          <img
            src="/logo-stripe.png"
            alt="Stripe Payment"
            className="h-16 mt-4 md:mt-0 hover:scale-110 transform transition duration-300"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
