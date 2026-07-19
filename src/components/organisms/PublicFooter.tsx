import React from 'react';
import { Instagram, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Viviana Nath</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Ajudando mulheres a conquistarem um corpo saudável e forte através de
              treinos personalizados e acompanhamento profissional.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/viviananath"
                className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5551999999999"
                className="bg-green-600 p-2 rounded-full hover:bg-green-700 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@viviananath.com"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-pink-400" />
                <span className="text-gray-300">(51) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-pink-400" />
                <span className="text-gray-300">contato@viviananath.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-pink-400 mt-1" />
                <span className="text-gray-300">Porto Alegre, RS<br />Atendimento Presencial</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Personal Training</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Consultoria Online</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Planos Personalizados</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Acompanhamento Nutricional</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Viviana Nath Personal Trainer. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
