import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://ugcportfolio-dqvc.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Get response as text first to debug
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      // Try to parse as JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }

      setIsSuccess(true);
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="contact" className="bg-[#FAF8F5] py-24 px-6 md:px-20">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-serif text-[#7E6956] mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-lg text-[#9B8B7E] mb-8">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="px-8 py-3 bg-[#C4A88A] text-white rounded-full hover:bg-[#B8A08D] transition-colors font-medium"
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-[#FAF8F5] py-24 px-6 md:px-20">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#7E6956] mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg text-[#9B8B7E]">
            Have a project in mind? Send me a message and let's create something amazing!
          </p>
        </div>

        <motion.div 
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="flex items-center gap-2 text-[#7E6956] mb-2">
                <User className="w-5 h-5 text-[#C4A88A]" />
                <span>Your Name</span>
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                  errors.name 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-[#E5D5C4] focus:border-[#C4A88A]'
                } bg-[#FAF8F5]`}
                placeholder="Enter your name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-[#7E6956] mb-2">
                <Mail className="w-5 h-5 text-[#C4A88A]" />
                <span>Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                  errors.email 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-[#E5D5C4] focus:border-[#C4A88A]'
                } bg-[#FAF8F5]`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="flex items-center gap-2 text-[#7E6956] mb-2">
                <MessageSquare className="w-5 h-5 text-[#C4A88A]" />
                <span>Your Message</span>
              </label>
              <textarea
                id="message"
                rows={6}
                {...register('message', { 
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' }
                })}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none resize-none ${
                  errors.message 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-[#E5D5C4] focus:border-[#C4A88A]'
                } bg-[#FAF8F5]`}
                placeholder="Tell me about your project..."
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              disabled={isSubmitting}
              className="w-full bg-[#C4A88A] hover:bg-[#B8A08D] disabled:bg-[#D4C4B0] disabled:cursor-not-allowed text-white py-4 px-8 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[#9B8B7E]">
            © 2026 Shanemel Asuncion. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
