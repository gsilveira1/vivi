import React from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, MessageCircle } from 'lucide-react';
import { ContactInfoItem } from '../molecules/ContactInfoItem';

export const ContactInfoPanel: React.FC = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8">
      Entre em Contato
    </h2>

    <div className="space-y-6 mb-8">
      <ContactInfoItem
        icon={Phone}
        title="WhatsApp"
        lines={['(51) 99999-9999']}
        link={{ href: 'https://wa.me/5551999999999', label: 'Enviar mensagem →' }}
      />

      <ContactInfoItem
        icon={Mail}
        title="E-mail"
        lines={['contato@viviananath.com']}
        link={{ href: 'mailto:contato@viviananath.com', label: 'Enviar e-mail →' }}
      />

      <ContactInfoItem
        icon={MapPin}
        title="Localização"
        lines={['Porto Alegre, RS', 'Atendimento presencial na região Sul']}
      />

      <ContactInfoItem
        icon={Clock}
        title="Horário de Atendimento"
        lines={[
          'Segunda a Sexta: 6:00 - 20:00',
          'Sábado: 7:00 - 12:00',
          'Consultorias online com horários flexíveis',
        ]}
      />
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
);
