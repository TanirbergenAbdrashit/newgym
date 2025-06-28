"use client";
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { 
  UserGroupIcon, 
  ClockIcon, 
  HeartIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const defaultServices = [
  { name: "Групповые тренировки", desc: "Эффективные занятия в группах под руководством опытных тренеров" },
  { name: "Персональные тренировки", desc: "Индивидуальный подход к каждому клиенту" },
  { name: "Кардио зона", desc: "Современное оборудование для кардио тренировок" },
  { name: "Фитнес-тестирование", desc: "Профессиональная оценка физической формы" },
];
const defaultPlans = [
  { name: "Базовый", price: "2000", features: ["Доступ к тренажерному залу", "Групповые тренировки", "Консультация тренера"] },
  { name: "Стандарт", price: "3500", features: ["Все опции базового", "Персональные тренировки", "Фитнес-тестирование"] },
  { name: "Премиум", price: "5000", features: ["Все опции стандарта", "Неограниченные персональные тренировки", "Индивидуальная программа питания"] },
];
const defaultTrainers = [
  { name: "Александр Петров", specialization: "Силовые тренировки", image: "" },
  { name: "Мария Иванова", specialization: "Функциональный тренинг", image: "" },
  { name: "Дмитрий Смирнов", specialization: "Кроссфит", image: "" },
  { name: "Елена Соколова", specialization: "Йога и стретчинг", image: "" },
];

export default function Home() {
  const [services, setServices] = useState(defaultServices);
  const [plans, setPlans] = useState(defaultPlans);
  const [trainers, setTrainers] = useState(defaultTrainers);
  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState({
    address: "ул. Примерная, 123",
    phone: "+7 (999) 123-45-67",
    email: "info@powerfit.ru"
  });
  const [intro, setIntro] = useState({
    title: 'PowerFit Gym',
    subtitle: 'Достигайте своих целей вместе с нами',
    button: 'Записаться',
    bg: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const s = localStorage.getItem('services');
      if (s) setServices(JSON.parse(s));
      const p = localStorage.getItem('plans');
      if (p) setPlans(JSON.parse(p).map((pl:any) => ({ name: pl.name, price: pl.price, features: pl.options || pl.features })));
      const t = localStorage.getItem('trainers');
      if (t) setTrainers(JSON.parse(t).map((tr:any) => ({ name: tr.name, specialization: tr.spec || tr.specialization, image: tr.photo || tr.image })));
      const r = localStorage.getItem('reviews');
      if (r) setReviews(JSON.parse(r));
      const c = localStorage.getItem('contacts');
      if (c) setContacts(JSON.parse(c));
      const introLS = localStorage.getItem('intro');
      if (introLS) setIntro(JSON.parse(introLS));
    }
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white" style={intro.bg ? {backgroundImage: `url(${intro.bg})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}>
        <div className="container mx-auto px-4 text-center bg-black/40 rounded-xl py-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{intro.title}</h1>
          <p className="text-xl md:text-2xl mb-8">{intro.subtitle}</p>
          <button 
            onClick={() => window.open('https://wa.me/qr/4EUA262CS6ZJC1', '_blank')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            {intro.button}
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">
                  <UserGroupIcon className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.desc}</p>
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
            {plans.map((plan, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold text-red-600 mb-6">{plan.price} ₽/мес</p>
                <ul className="mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">{feature}</li>
                  ))}
                </ul>
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
            {trainers.map((trainer, index) => (
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
            {reviews.map((review, index) => (
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
                  {contacts.address}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Телефон:</span>
                  {contacts.phone}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Email:</span>
                  {contacts.email}
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://2gis.kz/almaty/geo/70030076130021037/76.905016%2C43.213377?m=76.908349%2C43.222299%2F14.25"
                  title="Карта PowerFit Gym"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 256, borderRadius: 12 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы начать?</h2>
          <p className="text-xl mb-8">Присоединяйтесь к нам и достигайте своих целей!</p>
          <button 
            onClick={() => window.open('https://wa.me/qr/4EUA262CS6ZJC1', '_blank')}
            className="bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            Записаться сейчас
          </button>
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