import React from 'react';

const FAQ_ITEMS = [
  { question: 'Posso trocar de plano depois?', answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Entre em contato para fazer a alteração.' },
  { question: 'Como funciona o pagamento?', answer: 'Aceitamos PIX para maior comodidade. O pagamento é feito mensalmente.' },
  { question: 'Preciso ter experiência prévia?', answer: 'Não! Atendo desde iniciantes até atletas avançados. Cada treino é adaptado ao seu nível atual.' },
  { question: 'E se eu não puder comparecer a uma aula?', answer: 'Para aulas presenciais, você pode cancelar até 4 horas antes. Para consultorias online, até 2 horas antes.' },
];

export const FAQSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Perguntas Frequentes</h2>
      <div className="space-y-6">
        {FAQ_ITEMS.map((faq, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
