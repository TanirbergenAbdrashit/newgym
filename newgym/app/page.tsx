import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { 
  UserGroupIcon, 
  ClockIcon, 
  HeartIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">PowerFit Gym</h1>
          <p className="text-xl md:text-2xl mb-8">Достигайте своих целей вместе с нами</p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            Записаться
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <UserGroupIcon className="w-12 h-12 text-red-600" />,
                title: "Групповые тренировки",
                description: "Эффективные занятия в группах под руководством опытных тренеров"
              },
              {
                icon: <ClockIcon className="w-12 h-12 text-red-600" />,
                title: "Персональные тренировки",
                description: "Индивидуальный подход к каждому клиенту"
              },
              {
                icon: <HeartIcon className="w-12 h-12 text-red-600" />,
                title: "Кардио зона",
                description: "Современное оборудование для кардио тренировок"
              },
              {
                icon: <SparklesIcon className="w-12 h-12 text-red-600" />,
                title: "Фитнес-тестирование",
                description: "Профессиональная оценка физической формы"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Абонементы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Базовый",
                price: "2000",
                features: ["Доступ к тренажерному залу", "Групповые тренировки", "Консультация тренера"]
              },
              {
                name: "Стандарт",
                price: "3500",
                features: ["Все опции базового", "Персональные тренировки", "Фитнес-тестирование"]
              },
              {
                name: "Премиум",
                price: "5000",
                features: ["Все опции стандарта", "Неограниченные персональные тренировки", "Индивидуальная программа питания"]
              }
            ].map((plan, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold text-red-600 mb-6">{plan.price} ₽/мес</p>
                <ul className="mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">{feature}</li>
                  ))}
                </ul>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                  Купить
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Наши тренеры</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Александр Петров",
                specialization: "Силовые тренировки",
                image: "/trainer1.jpg"
              },
              {
                name: "Мария Иванова",
                specialization: "Функциональный тренинг",
                image: "/trainer2.jpg"
              },
              {
                name: "Дмитрий Смирнов",
                specialization: "Кроссфит",
                image: "/trainer3.jpg"
              },
              {
                name: "Елена Соколова",
                specialization: "Йога и стретчинг",
                image: "/trainer4.jpg"
              }
            ].map((trainer, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
                  <p className="text-gray-600">{trainer.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Отзывы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Иван К.",
                rating: 5,
                text: "Отличный зал с современным оборудованием. Тренеры профессионалы своего дела!"
              },
              {
                name: "Анна М.",
                rating: 5,
                text: "Занимаюсь уже год, вижу отличные результаты. Спасибо тренерам за поддержку!"
              },
              {
                name: "Сергей П.",
                rating: 4,
                text: "Хороший зал, удобное расположение. Есть все необходимое для тренировок."
              }
            ].map((review, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{review.text}</p>
                <p className="font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Свяжитесь с нами</h3>
              <div className="space-y-4">
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Адрес:</span>
                  ул. Примерная, 123
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Телефон:</span>
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Email:</span>
                  info@powerfit.ru
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="h-64 bg-gray-200 rounded-lg">
                {/* Здесь будет карта */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Карта будет здесь
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">PowerFit Gym</h2>
              <p className="text-gray-400 mt-2">Ваш путь к здоровому телу</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2024 PowerFit Gym. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 