import React from 'react';
import { Youtube, Twitter, Linkedin, Github, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: 'Features', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-red-500/10">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 py-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <Youtube className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold text-white">TubeMind<span className="text-red-500">.ai</span></span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-gray-400 hover:text-red-400 transition-colors duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-4 sm:space-y-0 pt-6 border-t border-red-500/10">
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <span>© {currentYear} TubeMind.ai. Made with</span>
            <Heart className="w-4 h-4 text-red-500 inline mx-1" />
            <span>in San Francisco</span>
          </div>
        </div>
      </div>
    </footer>
  );
};