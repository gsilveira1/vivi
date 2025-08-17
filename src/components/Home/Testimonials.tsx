import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      age: 35,
      location: "Porto Alegre, RS",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      text: "Em 6 meses com a Viviana, perdi 15kg e ganhei muito mais força e autoestima. O acompanhamento é incrível!",
      result: "Perdeu 15kg em 6 meses"
    },
    {
      id: 2,
      name: "Ana Costa",
      age: 28,
      location: "São Paulo, SP (Online)",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      text: "A consultoria online da Vivi mudou minha vida. Mesmo à distância, sinto que tenho todo o suporte necessário.",
      result: "Ganhou 8kg de massa magra"
    },
    {
      id: 3,
      name: "Carla Mendes",
      age: 42,
      location: "Canoas, RS",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      text: "Após os 40, achei que seria impossível ter resultados. A Viviana provou que eu estava errada!",
      result: "Melhorou condicionamento em 80%"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transformações <span className="text-pink-600">Reais</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como outras mulheres transformaram suas vidas com o acompanhamento da Viviana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-2xl p-6 relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-pink-200" />
              
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.age} anos • {testimonial.location}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              
              <div className="bg-pink-100 rounded-lg p-3">
                <p className="text-sm font-semibold text-pink-800">Resultado:</p>
                <p className="text-pink-700">{testimonial.result}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 mr-2 fill-current" />
            <span className="font-semibold">4.9/5 estrelas • Mais de 200 avaliações</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;