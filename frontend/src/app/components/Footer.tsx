import { Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { RiInstagramFill, RiYoutubeFill } from 'react-icons/ri';

const socials = [
  { icon: Mail, href: 'mailto:lei.ugc.ca@gmail.com', label: 'Email' },
  { icon: FaTiktok, href: 'https://tiktok.com/@mami.and.reyn', label: 'TikTok' },
  { icon: RiInstagramFill, href: 'https://instagram.com/lei.ugc.ca', label: 'Instagram' },
  { icon: RiYoutubeFill, href: 'https://youtube.com/@lei.ugc.ca', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-[#221D17] py-14 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2 text-sm tracking-[0.15em] text-white font-medium">
          <span className="w-2 h-2 rounded-full bg-[#B5623F]" />
          SHANEMEL ASUNCION
        </div>

        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={social.label}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#B5623F] transition-colors"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <p className="text-white/50 text-sm">
          © 2026 Shanemel Asuncion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
