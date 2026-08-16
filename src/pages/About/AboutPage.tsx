import React from 'react';
import { Award, Users, Heart, Target, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const achievements = [
    { icon: Award, title: "CREF Ativo", description: "Registro profissional ativo" },
    { icon: Users, title: "500+ Alunas", description: "Mulheres transformadas" },
    { icon: Heart, title: "5 Anos", description: "De experiência" },
    { icon: Target, title: "95%", description: "Taxa de sucesso" }
  ];

  const methodology = [
    "Avaliação física completa e anamnese detalhada",
    "Criação de treino 100% personalizado aos seus objetivos",
    "Acompanhamento nutricional básico incluído",
    "Monitoramento semanal de evolução",
    "Ajustes constantes baseados nos resultados",
    "Suporte emocional e motivacional"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                OLÁ, EU SOU A <span className="text-pink-600">VIVIANA NATH</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">

                SOU PERSONAL TRAINER ESPECIALIZADA EM TREINO INTELIGENTE
                PARA MULHERES ACIMA DOS 30 ANOS QUE BUSCAM FORÇA, ESTÉTICA
                E SAÚDE COM EQUILÍBRIO E RESULTADOS SUSTENTÁVEIS. MEU
                OBJETIVO É MOSTRAR QUE É POSSÍVEL CONQUISTAR UM CORPO
                BONITO E SAUDÁVEL ENQUANTO SE EQUILIBRA A ROTINA DA VIDA
                REAL, COMO TRABALHO E FAMÍLIA, COM TREINOS ADAPTADOS ÀS
                NECESSIDADES DE CADA ALUNA.
                COM MAIS DE 10 ANOS DE EXPERIÊNCIA EM MUSCULAÇÃO E
                CONDICIONAMENTO FÍSICO, E 5 ANOS ATUANDO COMO PERSONAL
                TRAINER, OFEREÇO ATENDIMENTOS PRESENCIAIS E ON-LINE COM
                FOCO EM SAÚDE, BEM-ESTAR E OBJETIVOS ESTÉTICOS, SEMPRE DE
                FORMA CONSCIENTE E ALINHADA ÀS METAS INDIVIDUAIS. PARA MIM, O
                EXERCÍCIO FÍSICO É MAIS DO QUE UMA ATIVIDADE — É UMA
                FERRAMENTA PODEROSA PARA GARANTIR QUALIDADE DE VIDA,
                AUTONOMIA E AUTOCONFIANÇA EM TODAS AS FASES DA VIDA.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105"
              >
                Vamos Conversar
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Viviana Nath"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section >

      {/* Stats */}
      < section className="py-16 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section >

      {/* Story */}
      < section className="py-20 bg-gray-50" >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Minha História</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Sempre fui apaixonada por movimento e bem-estar, mas minha jornada no fitness começou
              quando percebi que muitas mulheres, assim como eu, lutavam com questões de autoestima
              e relacionamento com o próprio corpo.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Após me formar em Educação Física e me especializar em treinamento funcional e
              musculação feminina, dediquei minha carreira a criar um ambiente seguro e acolhedor
              onde as mulheres pudessem se reconectar com sua força.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Hoje, com mais de 5 anos de experiência e centenas de vidas transformadas, meu foco
              continua sendo o mesmo: ajudar cada mulher a descobrir que ela é capaz de muito mais
              do que imagina.
            </p>
          </div>
        </div>
      </section >

      {/* Methodology */}
      < section className="py-20 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Minha Metodologia</h2>
              <p className="text-lg text-gray-600 mb-8">
                Desenvolvi um método único que combina ciência do exercício, psicologia esportiva
                e muito cuidado humano. Cada aluna é única, e por isso cada programa é único.
              </p>
              <ul className="space-y-4">
                {methodology.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Metodologia de treinamento"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section >

      {/* Certifications */}
      < section className="py-20 bg-gray-50" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Formação e Certificações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="h-8 w-8 text-pink-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Educação Física</h3>
              <p className="text-gray-600">Bacharelado - UFRGS</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="h-8 w-8 text-pink-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Treinamento Funcional</h3>
              <p className="text-gray-600">Especialização Avançada</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="h-8 w-8 text-pink-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Musculação Feminina</h3>
              <p className="text-gray-600">Curso de Especialização</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="h-8 w-8 text-pink-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Nutrição Esportiva</h3>
              <p className="text-gray-600">Curso Complementar</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="h-8 w-8 text-pink-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">CREF Ativo</h3>
              <p className="text-gray-600">Registro Profissional</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award className="h-8 w-8 text-pink-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Primeiros Socorros</h3>
              <p className="text-gray-600">Certificação Atualizada</p>
            </div>
          </div>
        </div>
      </section >

      {/* CTA */}
      < section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500" >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronta para Começar Sua Transformação?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Vamos juntas nessa jornada de autoconhecimento e fortalecimento
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('plans')}
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all"
            >
              Ver Planos
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-pink-600 transition-all"
            >
              Falar Comigo
            </button>
          </div>
        </div>
      </section >
    </div >
  );
};

export default AboutPage;