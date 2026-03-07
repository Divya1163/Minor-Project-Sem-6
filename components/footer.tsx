'use client';

import Link from 'next/link';
import { Github, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">ComfortAI</h3>
            <p className="text-sm text-muted-foreground">Thermal comfort prediction powered by machine learning</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Navigation</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                  Predictor
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-muted-foreground hover:text-accent transition-colors">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Information</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 ComfortAI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
