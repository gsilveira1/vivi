import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Instagram, Clock, Send, Check } from 'lucide-react';
import { ContactForm } from '../../types';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'ambos'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      interest: 'ambos'
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Vamos Conversar <span className="text-pink-600">Sobre Seus Objetivos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entre em contato para agendar uma conversa gratuita e descobrir 
            como posso te ajudar a alcançar seus objetivos.
          </p>
        </div>
      </section>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <Check className="h-5 w-5 mr-2" />
          Mensagem enviada! Entrarei em contato em breve.
        </div>
      )}

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Entre em Contato
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-gray-600">(51) 99999-9999</p>
                    <a 
                      href="https://wa.me/5551999999999" 
                      className="text-pink-600 hover:text-pink-700 text-sm"
                    >
                      Enviar mensagem →
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">E-mail</h3>
                    <p className="text-gray-600">contato@viviananath.com</p>
                    <a 
                      href="mailto:contato@viviananath.com" 
                      className="text-pink-600 hover:text-pink-700 text-sm"
                    >
                      Enviar e-mail →
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Localização</h3>
                    <p className="text-gray-600">Porto Alegre, RS</p>
                    <p className="text-gray-500 text-sm">Atendimento presencial na região Sul</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Horário de Atendimento</h3>
                    <p className="text-gray-600">Segunda a Sexta: 6:00 - 20:00</p>
                    <p className="text-gray-600">Sábado: 7:00 - 12:00</p>
                    <p className="text-gray-500 text-sm">Consultorias online com horários flexíveis</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Me Siga nas Redes</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com/viviananath" 
                    className="bg-pink-600 p-3 rounded-lg text-white hover:bg-pink-700 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://wa.me/5551999999999" 
                    className="bg-green-600 p-3 rounded-lg text-white hover:bg-green-700 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                    Interesse *
                  </label>
                  <select
                    id="interest"
                    required
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value as ContactForm['interest'] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="presencial">Aulas Presenciais</option>
                    <option value="online">Consultoria Online</option>
                    <option value="ambos">Ambos</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Conte-me sobre seus objetivos e como posso te ajudar..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-4">
                Respondo todas as mensagens em até 24 horas. Para urgências, use o WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Localização</h2>
            <p className="text-xl text-gray-600">
              Aulas presenciais na região Sul do Brasil
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Porto Alegre, RS</h3>
              <p className="text-gray-600">
                Atendimento presencial em academias e estúdios parceiros
              </p>
              <p className="text-gray-600">
                Entre em contato para mais detalhes sobre localização
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;