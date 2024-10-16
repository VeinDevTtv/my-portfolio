import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Briefcase, Rocket, ChevronRight, Mail } from 'lucide-react';
import Skills from './Skills';
import { useThemeLanguage } from '../ThemeLanguageContext';
import ThemeLanguageControls from './ThemeLanguageControls';
import PasswordGenerator from './PasswordGenerator';
import TicTacToe from './TicTacToe';
import ChessGame from './ChessGame';
import EnhancedContactForm from './EnhancedContactForm';
import AnimatedCodeBlock from './AnimatedCode';
import InteractiveCodeDemo from './InteractiveCodeDemo';


const translations = {
  en: {
    welcome: "Welcome to My Portfolio",
    name: "I'm Abdelkarim Ait Bourich",
    aboutMe: "About Me",
    aboutText1: "As a first-year student at De Anza College with aspirations to transfer to UC Berkeley, I'm embarking on an exciting journey in the world of technology and game development. My passion for problem-solving drives me to tackle difficult challenges head-on, often working tirelessly for days and nights to find innovative solutions.",
    aboutText2: "My proudest achievement to date is a game server project that I collaborated on with friends for two years. This endeavor not only helped us learn numerous new skills and generate some income but also forged friendships that will last a lifetime. This experience has fueled my ambition to become a senior game developer and, ultimately, create my own game engine and start a company.",
    aboutText3: "Currently, I'm channeling my energy into a personal project called \"Evolve.\" My ultimate goal is to create something that profoundly impacts people's lives, pushing the boundaries of what's possible in game development and beyond. With each line of code and every problem solved, I'm one step closer to turning these aspirations into reality."
  },
  fr: {
    welcome: "Bienvenue dans Mon Portfolio",
    name: "Je suis Abdelkarim Ait Bourich",
    aboutMe: "À Propos de Moi",
    aboutText1: "En tant qu'étudiant de première année à De Anza College avec l'aspiration de transférer à UC Berkeley, je m'embarque dans un voyage passionnant dans le monde de la technologie et du développement de jeux. Ma passion pour la résolution de problèmes me pousse à relever des défis difficiles de front, travaillant souvent sans relâche jour et nuit pour trouver des solutions innovantes.",
    aboutText2: "Ma plus grande réussite à ce jour est un projet de serveur de jeu sur lequel j'ai collaboré avec des amis pendant deux ans. Cette entreprise nous a non seulement aidés à acquérir de nombreuses nouvelles compétences et à générer des revenus, mais a également forgé des amitiés qui dureront toute une vie. Cette expérience a alimenté mon ambition de devenir un développeur de jeux senior et, à terme, de créer mon propre moteur de jeu et de lancer une entreprise.",
    aboutText3: "Actuellement, je canalise mon énergie dans un projet personnel appelé \"Evolve\". Mon objectif ultime est de créer quelque chose qui ait un impact profond sur la vie des gens, en repoussant les limites du possible dans le développement de jeux et au-delà. Avec chaque ligne de code et chaque problème résolu, je me rapproche un peu plus de la réalisation de ces aspirations."
  },
  es: {
    welcome: "Bienvenido a Mi Portafolio",
    name: "Soy Abdelkarim Ait Bourich",
    aboutMe: "Sobre Mí",
    aboutText1: "Como estudiante de primer año en De Anza College con aspiraciones de transferirme a UC Berkeley, estoy embarcándome en un emocionante viaje en el mundo de la tecnología y el desarrollo de juegos. Mi pasión por resolver problemas me impulsa a enfrentar desafíos difíciles de frente, trabajando incansablemente días y noches para encontrar soluciones innovadoras.",
    aboutText2: "Mi logro más orgulloso hasta la fecha es un proyecto de servidor de juegos en el que colaboré con amigos durante dos años. Este esfuerzo no solo nos ayudó a aprender numerosas habilidades nuevas y generar algunos ingresos, sino que también forjó amistades que durarán toda la vida. Esta experiencia ha alimentado mi ambición de convertirme en un desarrollador de juegos senior y, en última instancia, crear mi propio motor de juegos y comenzar una empresa.",
    aboutText3: "Actualmente, estoy canalizando mi energía en un proyecto personal llamado \"Evolve\". Mi objetivo final es crear algo que impacte profundamente la vida de las personas, empujando los límites de lo posible en el desarrollo de juegos y más allá. Con cada línea de código y cada problema resuelto, estoy un paso más cerca de convertir estas aspiraciones en realidad."
  },
  zh: {
    welcome: "欢迎来到我的作品集",
    name: "我是阿卜杜勒卡里姆·艾特·布里奇",
    aboutMe: "关于我",
    aboutText1: "作为德安扎学院的一年级学生，我立志转学至加州大学伯克利分校，正在踏上一段激动人心的科技和游戏开发之旅。我对解决问题的热情驱使我直面困难挑战，经常日以继夜地工作，寻找创新解决方案。",
    aboutText2: "到目前为止，我最自豪的成就是与朋友合作两年的游戏服务器项目。这项努力不仅帮助我们学习了许多新技能并创造了一些收入，还建立了将持续一生的友谊。这段经历激发了我成为高级游戏开发者的雄心，并最终创建自己的游戏引擎和公司。",
    aboutText3: "目前，我正将精力集中在一个名为\"进化\"的个人项目上。我的最终目标是创造一些能深刻影响人们生活的东西，推动游戏开发及其他领域的可能性边界。每一行代码，每一个解决的问题，都让我离实现这些抱负更近一步。"
  },
  ja: {
    welcome: "ポートフォリオへようこそ",
    name: "アブデルカリム・アイト・ブーリッチです",
    aboutMe: "私について",
    aboutText1: "カリフォルニア大学バークレー校への編入を目指すDeAnzaカレッジの1年生として、技術とゲーム開発の世界で刺激的な旅を始めています。問題解決への情熱が、困難な課題に正面から取り組み、しばしば昼夜を問わず革新的な解決策を見つけるよう駆り立てています。",
    aboutText2: "これまでの最も誇らしい成果は、友人たちと2年間協力して取り組んだゲームサーバープロジェクトです。この取り組みは、多くの新しいスキルを学び、収入を得ただけでなく、一生続く友情を築きました。この経験が、シニアゲーム開発者になり、最終的に自分のゲームエンジンを作成し、会社を立ち上げるという野心を掻き立てました。",
    aboutText3: "現在、「Evolve」と呼ばれる個人プロジェクトにエネルギーを注いでいます。私の最終目標は、人々の生活に深い影響を与えるものを作り出し、ゲーム開発とその他の分野で可能性の境界を押し広げることです。コードを一行書くごとに、問題を一つ解決するごとに、これらの願望を現実にする一歩近づいています。"
  }
};

const LandingPage: React.FC = () => {
  const { theme, language } = useThemeLanguage();
  const targetRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [showTicTacToe, setShowTicTacToe] = useState(false);
  const [showChessGame, setShowChessGame] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [showGamesDropdown, setShowGamesDropdown] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const codeSnippet = `
const drawOrbits = (numSegments) => {
  onMount(() => {
    const canvas = Ref.getContext("2d");
    const angleIncrement = 360 / numSegments;
    const segmentCount = segments.length;
    canvas?.clearRect(0, 0, Ref.width, Ref.height);
    const calculateOrbitRadius = level => level * calculateOrbitSpeed() + numSegments * 3.75;

    const calculateOrbitSpeed = () => {
      const baseSpeed = (9 - segmentCount) * 7.5;
      return (segmentCount + 1) * (baseSpeed / segmentCount);
    };

    const drawOrbits = () => {
      if (canvas) {
        segments.forEach((segment, index) => {
          const orbitRadius = calculateOrbitRadius(index);
          segment.orbs.forEach(orb => {
            const renderAngle = orb.renderAngle ?? orb.index * angleIncrement;
            const x = Ref.width / 2 + orbitRadius * Math.cos(renderAngle * Math.PI / 180);
            const y = Ref.height / 2 + orbitRadius * Math.sin(renderAngle * Math.PI / 180);
            canvas.beginPath();
            canvas.arc(x, y, orb.radius, 0, Math.PI * 2);
            canvas.fillStyle = orb.color;
            canvas.fill();
            canvas.lineWidth = 1;
            canvas.strokeStyle = "rgba(0, 0, 0, 0.05)";
            canvas.stroke();
            canvas.closePath();
          });
        });
      }
    }
  });
};`;

  return (
    <div ref={targetRef} className={`min-h-[200vh] ${theme === 'dark' ? 'bg-sky-900 text-sky-100' : 'bg-sky-50 text-sky-900'}`}>
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 ${theme === 'dark' ? 'bg-sky-400' : 'bg-sky-600'} origin-left z-40`}
        style={{ scaleX }}
      />
      <ThemeLanguageControls />
      
      {/* Tools and Games Dropdowns */}
      <div className="fixed top-4 left-4 z-50 flex space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowToolsDropdown(!showToolsDropdown)}
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-sky-700 hover:bg-sky-600' : 'bg-sky-200 hover:bg-sky-300'}`}
          >
            Tools <ChevronDown className="inline-block ml-1" size={16} />
          </button>
          {showToolsDropdown && (
            <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg ${theme === 'dark' ? 'bg-sky-800' : 'bg-sky-100'}`}>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowPasswordGenerator(true);
                    setShowToolsDropdown(false);
                  }}
                  className={`block px-4 py-2 text-sm w-full text-left ${theme === 'dark' ? 'hover:bg-sky-700' : 'hover:bg-sky-200'}`}
                >
                  Password Generator <ChevronRight className="inline-block float-right" size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowGamesDropdown(!showGamesDropdown)}
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-sky-700 hover:bg-sky-600' : 'bg-sky-200 hover:bg-sky-300'}`}
          >
            Games <ChevronDown className="inline-block ml-1" size={16} />
          </button>
          {showGamesDropdown && (
            <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg ${theme === 'dark' ? 'bg-sky-800' : 'bg-sky-100'}`}>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowTicTacToe(true);
                    setShowGamesDropdown(false);
                  }}
                  className={`block px-4 py-2 text-sm w-full text-left ${theme === 'dark' ? 'hover:bg-sky-700' : 'hover:bg-sky-200'}`}
                >
                  Tic Tac Toe <ChevronRight className="inline-block float-right" size={16} />
                </button>
                <button
                  onClick={() => {
                    setShowChessGame(true);
                    setShowGamesDropdown(false);
                  }}
                  className={`block px-4 py-2 text-sm w-full text-left ${theme === 'dark' ? 'hover:bg-sky-700' : 'hover:bg-sky-200'}`}
                >
                  Chess <ChevronRight className="inline-block float-right" size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-sky-300 to-sky-500' : 'bg-gradient-to-r from-sky-500 to-sky-700'}`}>
            {translations[language].welcome}
          </h1>
          <motion.h2 
            className={`text-2xl md:text-3xl ${theme === 'dark' ? 'text-sky-300' : 'text-sky-700'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {translations[language].name}
          </motion.h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 z-10"
        >
          <ChevronDown size={48} className={`animate-bounce ${theme === 'dark' ? 'text-sky-300' : 'text-sky-500'}`} />
        </motion.div>
      </div>
      
      <motion.div 
        className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16"
        style={{ opacity, y }}
      >
        <div className="max-w-3xl">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-sky-200' : 'text-sky-800'}`}>
            {translations[language].aboutMe}
          </h2>
          <div className="space-y-6 text-lg">
            {[
              { icon: Code, text: translations[language].aboutText1 },
              { icon: Briefcase, text: translations[language].aboutText2 },
              { icon: Rocket, text: translations[language].aboutText3 }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`flex items-start space-x-4 p-4 rounded-lg transition-shadow duration-300 ease-in-out ${
                  theme === 'dark' 
                    ? hoverIndex === index ? 'bg-sky-800' : 'bg-sky-900'
                    : hoverIndex === index ? 'bg-sky-100' : 'bg-sky-50'
                }`}
                style={{
                  boxShadow: hoverIndex === index ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
                }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <item.icon className={`flex-shrink-0 ${theme === 'dark' ? 'text-sky-400' : 'text-sky-600'}`} size={24} />
                <p className={theme === 'dark' ? 'text-sky-100' : 'text-sky-800'}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <Skills />

      {/* Code Snippet Section */}
      <section className="py-16 bg-sky-50 dark:bg-sky-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-sky-900 dark:text-sky-100">Sample Code</h2>
          <AnimatedCodeBlock code={codeSnippet} language="typescript" />
        </div>
      </section>

      {/* Contact Form Button */}
      <motion.button
        onClick={() => setShowContactForm(true)}
        className={`fixed bottom-4 right-4 px-4 py-2 rounded-full z-50 ${
          theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white shadow-md flex items-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="mr-2" size={20} /> Contact Me
      </motion.button>

      {/* Code Snippet Section */}
      <section className="py-16 bg-sky-50 dark:bg-sky-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-sky-900 dark:text-sky-100">Interactive Code Demo</h2>
          <InteractiveCodeDemo />
        </div>
      </section>

      {/* Modals */}
      {showPasswordGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-sky-900 p-6 rounded-lg max-w-md w-full">
            <button
              onClick={() => setShowPasswordGenerator(false)}
              className="float-right text-2xl hover:text-sky-500 transition-colors"
            >
              &times;
            </button>
            <PasswordGenerator />
          </div>
        </div>
      )}

      {showTicTacToe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-sky-900 p-6 rounded-lg max-w-md w-full">
            <button
              onClick={() => setShowTicTacToe(false)}
              className="float-right text-2xl hover:text-sky-500 transition-colors"
            >
              &times;
            </button>
            <TicTacToe />
          </div>
        </div>
      )}

      {showChessGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-sky-900 p-6 rounded-lg max-w-2xl w-full">
            <button
              onClick={() => setShowChessGame(false)}
              className="float-right text-2xl hover:text-sky-500 transition-colors"
            >
              &times;
            </button>
            <ChessGame />
          </div>
        </div>
      )}

    {/* Contact Form Modal */}
    <AnimatePresence>
        {showPasswordGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white dark:bg-sky-900 p-6 rounded-lg max-w-md w-full">
              <button
                onClick={() => setShowPasswordGenerator(false)}
                className="float-right text-2xl hover:text-sky-500 transition-colors"
              >
                &times;
              </button>
              <PasswordGenerator />
            </div>
          </motion.div>
        )}

        {showTicTacToe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white dark:bg-sky-900 p-6 rounded-lg max-w-md w-full">
              <button
                onClick={() => setShowTicTacToe(false)}
                className="float-right text-2xl hover:text-sky-500 transition-colors"
              >
                &times;
              </button>
              <TicTacToe />
            </div>
          </motion.div>
        )}

        {showChessGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white dark:bg-sky-900 p-6 rounded-lg max-w-2xl w-full">
              <button
                onClick={() => setShowChessGame(false)}
                className="float-right text-2xl hover:text-sky-500 transition-colors"
              >
                &times;
              </button>
              <ChessGame />
            </div>
          </motion.div>
        )}

        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <EnhancedContactForm onClose={() => setShowContactForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;