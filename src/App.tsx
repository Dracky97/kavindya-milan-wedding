/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Heart, ChevronDown, Send } from 'lucide-react';
import backgroundImage from './background.jpg';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', phone: '', attending: 'yes', guests: '1' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby5h0kGcPGi5XUxwnuY5MiaKNSy9eP4WBX1j6_kkKi7LZ4LS2G0KZb0vcDgxJc7T-ar/exec';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      // The Apps Script predates the email → phone field change, so the number
      // is sent under every parameter name the script might read.
      const params = new URLSearchParams({
        name: rsvpForm.name,
        phone: rsvpForm.phone,
        email: rsvpForm.phone,
        contact: rsvpForm.phone,
        mobile: rsvpForm.phone,
        attending: rsvpForm.attending,
        guests: rsvpForm.guests,
        timestamp: new Date().toISOString(),
      });
      await fetch(`${RSVP_SCRIPT_URL}?${params}`, { mode: 'no-cors' });
      setIsSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const bgImageUrl = backgroundImage;

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-900">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('${bgImageUrl}')`,
        }}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center w-full px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="glass-panel p-10 md:p-16 rounded-[3rem] max-w-3xl w-full mx-auto relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-light"
            >
              Together with their families
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 leading-none"
            >
              Kavindya <br className="md:hidden" />
              <span className="text-4xl md:text-6xl italic text-white/80 mx-4 font-light">&amp;</span> 
              <br className="md:hidden" />
              Milan
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-lg md:text-xl tracking-widest font-light mb-10"
            >
              Invite you to celebrate their wedding
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-lg font-serif"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 opacity-70" />
                <span>September 24, 2026</span>
              </div>
              <div className="hidden md:block w-1 h-1 bg-white/50 rounded-full" />
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 opacity-70" />
                <span>Polhena Grand Resort & Banquet, Matara</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.a 
            href="#details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-10 glass-button p-4 rounded-full"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.a>
        </section>

        {/* Details Section */}
        <section id="details" className="min-h-screen flex items-center justify-center w-full px-4 py-20">
          <div className="max-w-5xl w-full grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-10 rounded-[2.5rem] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-white/80" />
              </div>
              <h2 className="font-serif text-4xl mb-2">Date</h2>
              <p className="text-white/70 tracking-widest text-sm uppercase mb-8">Saturday</p>
              
              <h3 className="text-xl font-medium mb-2">September 24, 2026</h3>
              <p className="text-white/80 font-light leading-relaxed mb-6">
                Join us for a day of love<br />
                and celebration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-panel p-10 rounded-[2.5rem] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white/80" />
              </div>
              <h2 className="font-serif text-4xl mb-2">Time</h2>
              <p className="text-white/70 tracking-widest text-sm uppercase mb-8">Schedule</p>
              
              <h3 className="text-xl font-medium mb-2">11:00 AM - 04:00PM</h3>
              <p className="text-white/80 font-light leading-relaxed mb-6">
                10:00 PM - Poruwa<br />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-panel p-10 rounded-[2.5rem] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white/80" />
              </div>
              <h2 className="font-serif text-4xl mb-2">Venue</h2>
              <p className="text-white/70 tracking-widest text-sm uppercase mb-8">Location</p>
              
              <h3 className="text-xl font-medium mb-2">Polhena Grand Resort & Banquet</h3>
              <p className="text-white/80 font-light leading-relaxed mb-6">
                Matara<br />
              </p>
              
              <a href="#" className="glass-button px-6 py-3 text-sm tracking-wider uppercase mt-auto">
                View Map
              </a>
            </motion.div>
          </div>
        </section>

        {/* Story / Quote Section */}
        <section id="story" className="py-32 px-4 w-full flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass-panel p-12 md:p-20 rounded-[3rem] max-w-4xl text-center"
          >
            <Heart className="w-10 h-10 mx-auto mb-8 opacity-50" />
            <h2 className="font-serif text-3xl md:text-5xl leading-relaxed font-light italic">
              "Whatever our souls are made of, his and mine are the same."
            </h2>
            <p className="mt-8 text-white/60 tracking-widest uppercase text-sm">Milan</p>
          </motion.div>
        </section>

        {/* RSVP Section */}
        <section id="rsvp" className="min-h-screen flex items-center justify-center w-full px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-16 rounded-[3rem] max-w-2xl w-full"
          >
            <div className="text-center mb-10">
              <h2 className="font-serif text-5xl mb-4">RSVP</h2>
              <p className="text-white/80 font-light tracking-wide">Kindly respond by September 1st, 2026</p>
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-serif mb-4">Thank You!</h3>
                <p className="text-white/80 font-light">We have received your response.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm tracking-widest uppercase text-white/80 ml-4">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={rsvpForm.name}
                    onChange={e => setRsvpForm({...rsvpForm, name: e.target.value})}
                    className="glass-input w-full px-6 py-4 rounded-full text-lg"
                    placeholder="Your Name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm tracking-widest uppercase text-white/80 ml-4">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={rsvpForm.phone}
                    onChange={e => setRsvpForm({...rsvpForm, phone: e.target.value})}
                    className="glass-input w-full px-6 py-4 rounded-full text-lg"
                    placeholder="+94 77 123 4567"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm tracking-widest uppercase text-white/80 ml-4">Attending?</label>
                    <select 
                      value={rsvpForm.attending}
                      onChange={e => setRsvpForm({...rsvpForm, attending: e.target.value})}
                      className="glass-input w-full px-6 py-4 rounded-full text-lg appearance-none cursor-pointer"
                    >
                      <option value="yes" className="text-black">Joyfully Accept</option>
                      <option value="no" className="text-black">Regretfully Decline</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm tracking-widest uppercase text-white/80 ml-4">Guests</label>
                    <select 
                      value={rsvpForm.guests}
                      onChange={e => setRsvpForm({...rsvpForm, guests: e.target.value})}
                      className="glass-input w-full px-6 py-4 rounded-full text-lg appearance-none cursor-pointer"
                    >
                      <option value="1" className="text-black">1 Person</option>
                      <option value="2" className="text-black">2 People</option>
                      <option value="3" className="text-black">3 People</option>
                      <option value="4" className="text-black">4 People</option>
                    </select>
                  </div>
                </div>

                {submitError && (
                  <p className="text-center text-red-300 text-sm tracking-wide">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glass-button w-full py-5 rounded-full text-lg tracking-widest uppercase font-medium mt-8 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send RSVP'}</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="w-full py-10 text-center glass-panel rounded-none border-x-0 border-b-0 mt-20">
          <p className="font-serif text-2xl mb-2">Kavindya &amp; Milan</p>
          <p className="text-white/50 text-sm tracking-widest uppercase">September 24, 2026</p>
        </footer>

      </div>
    </div>
  );
}
