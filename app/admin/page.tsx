"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Стартовые данные
const initialServices = [
  { id: 1, name: "Групповые тренировки", desc: "Эффективные занятия в группах под руководством опытных тренеров" },
  { id: 2, name: "Персональные тренировки", desc: "Индивидуальный подход к каждому клиенту" },
  { id: 3, name: "Кардио зона", desc: "Современное оборудование для кардио тренировок" },
  { id: 4, name: "Фитнес-тестирование", desc: "Профессиональная оценка физической формы" },
];
const initialPlans = [
  { id: 1, name: "Базовый", price: 2000, options: ["Доступ к тренажерному залу", "Групповые тренировки", "Консультация тренера"] },
  { id: 2, name: "Стандарт", price: 3500, options: ["Все опции базового", "Персональные тренировки", "Фитнес-тестирование"] },
  { id: 3, name: "Премиум", price: 5000, options: ["Все опции стандарта", "Неограниченные персональные тренировки", "Индивидуальная программа питания"] },
];
const initialTrainers = [
  { id: 1, name: "Александр Петров", spec: "Силовые тренировки", photo: "" },
  { id: 2, name: "Мария Иванова", spec: "Функциональный тренинг", photo: "" },
  { id: 3, name: "Дмитрий Смирнов", spec: "Кроссфит", photo: "" },
  { id: 4, name: "Елена Соколова", spec: "Йога и стретчинг", photo: "" },
];

function loadLS(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}
function saveLS(key, value) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default function AdminPage() {
  // Авторизация
  const [authed, setAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Данные
  const [services, setServices] = useState(initialServices);
  const [plans, setPlans] = useState(initialPlans);
  const [trainers, setTrainers] = useState(initialTrainers);
  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState(() => loadLS('contacts', {
    address: "ул. Примерная, 123",
    phone: "+7 (999) 123-45-67",
    email: "info@powerfit.ru"
  }));
  const [intro, setIntro] = useState(() => loadLS('intro', {
    title: 'PowerFit Gym',
    subtitle: 'Достигайте своих целей вместе с нами',
    button: 'Записаться',
    bg: ''
  }));

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('admin_token');
    if (token) setAuthed(true);
    
    // Загружаем данные из localStorage
    setServices(loadLS('services', initialServices));
    setPlans(loadLS('plans', initialPlans));
    setTrainers(loadLS('trainers', initialTrainers));
    setReviews(loadLS('reviews', []));
    setContacts(loadLS('contacts', {
      address: "ул. Примерная, 123",
      phone: "+7 (999) 123-45-67",
      email: "info@powerfit.ru"
    }));
    setIntro(loadLS('intro', {
      title: 'PowerFit Gym',
      subtitle: 'Достигайте своих целей вместе с нами',
      button: 'Записаться',
      bg: ''
    }));
  }, []);

  useEffect(() => { if (mounted) saveLS('services', services); }, [services, mounted]);
  useEffect(() => { if (mounted) saveLS('plans', plans); }, [plans, mounted]);
  useEffect(() => { if (mounted) saveLS('trainers', trainers); }, [trainers, mounted]);
  useEffect(() => { if (mounted) saveLS('reviews', reviews); }, [reviews, mounted]);
  useEffect(() => { if (mounted) saveLS('contacts', contacts); }, [contacts, mounted]);
  useEffect(() => { if (mounted) saveLS('intro', intro); }, [intro, mounted]);

  // --- Авторизация ---
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === "admin@gym.ru" && password === "123456") {
      localStorage.setItem('admin_token', '1');
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Неверный email или пароль");
    }
  }
  function handleLogout() {
    localStorage.removeItem('admin_token');
    setAuthed(false);
  }

  // --- CRUD для услуг ---
  const [editService, setEditService] = useState<any>(null);
  const [newService, setNewService] = useState({ name: "", desc: "" });

  function addService() {
    if (!newService.name.trim() || !newService.desc.trim()) return;
    setServices([...services, { ...newService, id: Date.now() }]);
    setNewService({ name: "", desc: "" });
  }
  function updateService() {
    setServices(services.map(s => s.id === editService.id ? editService : s));
    setEditService(null);
  }
  function deleteService(id: number) {
    setServices(services.filter(s => s.id !== id));
  }

  // --- CRUD для абонементов ---
  const [editPlan, setEditPlan] = useState<any>(null);
  const [newPlan, setNewPlan] = useState({ name: "", price: "", options: "" });

  function addPlan() {
    if (!newPlan.name.trim() || !newPlan.price) return;
    setPlans([...plans, { id: Date.now(), name: newPlan.name, price: Number(newPlan.price), options: newPlan.options.split(',').map(o=>o.trim()).filter(Boolean) }]);
    setNewPlan({ name: "", price: "", options: "" });
  }
  function updatePlan() {
    setPlans(plans.map(p => p.id === editPlan.id ? editPlan : p));
    setEditPlan(null);
  }
  function deletePlan(id: number) {
    setPlans(plans.filter(p => p.id !== id));
  }

  // --- CRUD для тренеров ---
  const [editTrainer, setEditTrainer] = useState<any>(null);
  const [newTrainer, setNewTrainer] = useState({ name: "", spec: "", photo: "" });
  const photoInputRef = useRef<HTMLInputElement>(null);
  const newPhotoInputRef = useRef<HTMLInputElement>(null);

  function addTrainer() {
    if (!newTrainer.name.trim() || !newTrainer.spec.trim()) return;
    setTrainers([...trainers, { ...newTrainer, id: Date.now() }]);
    setNewTrainer({ name: "", spec: "", photo: "" });
    if (newPhotoInputRef.current) newPhotoInputRef.current.value = "";
  }
  function updateTrainer() {
    setTrainers(trainers.map(t => t.id === editTrainer.id ? editTrainer : t));
    setEditTrainer(null);
  }
  function deleteTrainer(id: number) {
    setTrainers(trainers.filter(t => t.id !== id));
  }
  function handleTrainerPhotoChange(e: React.ChangeEvent<HTMLInputElement>, isNew = false) {
    const file = e.target.files?.[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      if (isNew) {
        setNewTrainer({ ...newTrainer, photo: photoUrl });
      } else {
        setEditTrainer({ ...editTrainer, photo: photoUrl });
      }
    }
  }

  // --- CRUD для отзывов (только картинки) ---
  const [newReview, setNewReview] = useState<{file?: File, author?: string}>({});
  function addReview(e: React.FormEvent) {
    e.preventDefault();
    if (!newReview.file) return;
    setReviews([...reviews, { id: Date.now(), url: URL.createObjectURL(newReview.file), author: newReview.author }]);
    setNewReview({});
  }
  function deleteReview(id: number) {
    setReviews(reviews.filter(r => r.id !== id));
  }

  // Быстрая навигация
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    plans: useRef<HTMLDivElement>(null),
    trainers: useRef<HTMLDivElement>(null),
    reviews: useRef<HTMLDivElement>(null),
    contacts: useRef<HTMLDivElement>(null),
  };
  const scrollToSection = (key: keyof typeof sectionRefs) => {
    sectionRefs[key].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // --- UI ---
  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Загрузка...</div>;
  }
  
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">Вход в админ-панель</h2>
          <input type="email" className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Пароль" value={password} onChange={e=>setPassword(e.target.value)} required />
          {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold">Войти</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Панель быстрого доступа */}
      <nav className="flex gap-2 mb-6 sticky top-0 z-40 bg-gray-50 py-2 px-2 rounded shadow">
        <button onClick={()=>scrollToSection('intro')} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Интро</button>
        <button onClick={()=>scrollToSection('services')} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Услуги</button>
        <button onClick={()=>scrollToSection('plans')} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Абонементы</button>
        <button onClick={()=>scrollToSection('trainers')} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Тренеры</button>
        <button onClick={()=>scrollToSection('reviews')} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Отзывы</button>
        <button onClick={()=>scrollToSection('contacts')} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Контакты</button>
      </nav>
      {/* Интро */}
      <section ref={sectionRefs.intro} className="mb-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">🎬 Интро (Hero)</h2>
        <div className="flex flex-col gap-3 max-w-xl">
          <input className="border px-2 py-1 rounded" placeholder="Заголовок" value={intro.title} onChange={e=>setIntro({...intro, title: e.target.value})} />
          <input className="border px-2 py-1 rounded" placeholder="Подзаголовок" value={intro.subtitle} onChange={e=>setIntro({...intro, subtitle: e.target.value})} />
          <input className="border px-2 py-1 rounded" placeholder="Текст кнопки" value={intro.button} onChange={e=>setIntro({...intro, button: e.target.value})} />
          <div className="flex items-center gap-2">
            <input className="border px-2 py-1 rounded flex-1" placeholder="URL фонового фото" value={intro.bg} onChange={e=>setIntro({...intro, bg: e.target.value})} />
            <label className="bg-gray-200 px-2 py-1 rounded cursor-pointer">
              <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setIntro({...intro, bg: url});
                }
              }} />
              Загрузить
            </label>
          </div>
          {intro.bg && <img src={intro.bg} alt="Фон" className="rounded w-full max-h-48 object-cover mt-2" />}
        </div>
      </section>
      {/* Услуги */}
      <section ref={sectionRefs.services} className="mb-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">🏋 Услуги</h2>
        <div className="space-y-2 mb-4">
          {services.map(s => (
            <div key={s.id} className="flex items-center gap-2 border-b py-2">
              {editService?.id === s.id ? (
                <>
                  <input className="border px-2 py-1 rounded mr-2" value={editService.name} onChange={e=>setEditService({...editService, name: e.target.value})} />
                  <input className="border px-2 py-1 rounded mr-2" value={editService.desc} onChange={e=>setEditService({...editService, desc: e.target.value})} />
                  <button className="text-green-600 mr-2" onClick={updateService}>Сохранить</button>
                  <button className="text-gray-500" onClick={()=>setEditService(null)}>Отмена</button>
                </>
              ) : (
                <>
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-gray-500 ml-2">{s.desc}</span>
                  <button className="text-blue-600 ml-2" onClick={()=>setEditService(s)}>Редактировать</button>
                  <button className="text-red-600 ml-2" onClick={()=>deleteService(s.id)}>Удалить</button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input className="border px-2 py-1 rounded" placeholder="Название" value={newService.name} onChange={e=>setNewService({...newService, name: e.target.value})} />
          <input className="border px-2 py-1 rounded" placeholder="Описание" value={newService.desc} onChange={e=>setNewService({...newService, desc: e.target.value})} />
          <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={addService}>Добавить</button>
        </div>
      </section>
      {/* Абонементы */}
      <section ref={sectionRefs.plans} className="mb-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">💳 Абонементы</h2>
        <div className="space-y-2 mb-4">
          {plans.map(p => (
            <div key={p.id} className="flex items-center gap-2 border-b py-2">
              {editPlan?.id === p.id ? (
                <>
                  <input className="border px-2 py-1 rounded mr-2" value={editPlan.name} onChange={e=>setEditPlan({...editPlan, name: e.target.value})} />
                  <input className="border px-2 py-1 rounded mr-2 w-24" type="number" value={editPlan.price} onChange={e=>setEditPlan({...editPlan, price: Number(e.target.value)})} />
                  <input className="border px-2 py-1 rounded mr-2" value={editPlan.options.join(', ')} onChange={e=>setEditPlan({...editPlan, options: e.target.value.split(',').map((o:string)=>o.trim()).filter(Boolean)})} placeholder="Опции через запятую" />
                  <button className="text-green-600 mr-2" onClick={updatePlan}>Сохранить</button>
                  <button className="text-gray-500" onClick={()=>setEditPlan(null)}>Отмена</button>
                </>
              ) : (
                <>
                  <span className="font-semibold">{p.name}</span>
                  <span className="ml-2">{p.price} ₽/мес</span>
                  <span className="text-gray-500 ml-2">[{p.options.join(', ')}]</span>
                  <button className="text-blue-600 ml-2" onClick={()=>setEditPlan(p)}>Редактировать</button>
                  <button className="text-red-600 ml-2" onClick={()=>deletePlan(p.id)}>Удалить</button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          <input className="border px-2 py-1 rounded" placeholder="Название" value={newPlan.name} onChange={e=>setNewPlan({...newPlan, name: e.target.value})} />
          <input className="border px-2 py-1 rounded w-24" type="number" placeholder="Цена" value={newPlan.price} onChange={e=>setNewPlan({...newPlan, price: e.target.value})} />
          <input className="border px-2 py-1 rounded" placeholder="Опции через запятую" value={newPlan.options} onChange={e=>setNewPlan({...newPlan, options: e.target.value})} />
          <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={addPlan}>Добавить</button>
        </div>
      </section>
      {/* Тренеры */}
      <section ref={sectionRefs.trainers} className="mb-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">🧑‍🏫 Тренеры</h2>
        <div className="space-y-2 mb-4">
          {trainers.map(t => (
            <div key={t.id} className="flex items-center gap-2 border-b py-2">
              {editTrainer?.id === t.id ? (
                <>
                  <input className="border px-2 py-1 rounded mr-2" value={editTrainer.name} onChange={e=>setEditTrainer({...editTrainer, name: e.target.value})} />
                  <input className="border px-2 py-1 rounded mr-2" value={editTrainer.spec} onChange={e=>setEditTrainer({...editTrainer, spec: e.target.value})} />
                  <input type="file" accept="image/*" onChange={e=>handleTrainerPhotoChange(e, false)} className="mr-2" />
                  {editTrainer.photo && editTrainer.photo !== "" && <Image src={editTrainer.photo} alt="Превью" width={40} height={40} className="rounded-full object-cover mr-2" />}
                  <button className="text-green-600 mr-2" onClick={updateTrainer}>Сохранить</button>
                  <button className="text-gray-500" onClick={()=>setEditTrainer(null)}>Отмена</button>
                </>
              ) : (
                <>
                  {t.photo && t.photo !== "" && <Image src={t.photo} alt={t.name} width={40} height={40} className="rounded-full object-cover mr-2" />}
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-gray-500 ml-2">{t.spec}</span>
                  <button className="text-blue-600 ml-2" onClick={()=>setEditTrainer(t)}>Редактировать</button>
                  <button className="text-red-600 ml-2" onClick={()=>deleteTrainer(t.id)}>Удалить</button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2 flex-wrap items-center">
          <input className="border px-2 py-1 rounded" placeholder="Имя" value={newTrainer.name} onChange={e=>setNewTrainer({...newTrainer, name: e.target.value})} />
          <input className="border px-2 py-1 rounded" placeholder="Специализация" value={newTrainer.spec} onChange={e=>setNewTrainer({...newTrainer, spec: e.target.value})} />
          <input type="file" accept="image/*" onChange={e=>handleTrainerPhotoChange(e, true)} className="border px-2 py-1 rounded" ref={newPhotoInputRef} />
          {newTrainer.photo && newTrainer.photo !== "" && <Image src={newTrainer.photo} alt="Превью" width={40} height={40} className="rounded-full object-cover" />}
          <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={addTrainer}>Добавить</button>
        </div>
      </section>
      {/* Отзывы */}
      <section ref={sectionRefs.reviews} className="mb-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">🖼️ Отзывы (только скриншоты)</h2>
        <form className="flex gap-2 mb-4 flex-wrap items-center" onSubmit={addReview}>
          <input type="file" accept="image/png,image/jpeg" onChange={e=>setNewReview(r=>({...r, file: e.target.files?.[0]}))} className="border px-2 py-1 rounded" />
          <input className="border px-2 py-1 rounded" placeholder="Автор (опционально)" value={newReview.author||""} onChange={e=>setNewReview(r=>({...r, author: e.target.value}))} />
          <button className="bg-green-600 text-white px-3 py-1 rounded" type="submit">Загрузить</button>
        </form>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reviews.map(r => (
            <div key={r.id} className="relative group">
              <Image src={r.url} alt={r.author||"Отзыв"} width={200} height={120} className="rounded object-cover w-full h-32" />
              {r.author && <div className="absolute bottom-1 left-1 bg-white/80 text-xs px-2 py-1 rounded">{r.author}</div>}
              <button className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100" onClick={()=>deleteReview(r.id)} title="Удалить">×</button>
            </div>
          ))}
        </div>
      </section>
      {/* Контакты */}
      <section ref={sectionRefs.contacts} className="mb-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">📞 Контакты</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20">Адрес:</span>
            <input 
              className="border px-2 py-1 rounded flex-1" 
              value={contacts.address} 
              onChange={e=>setContacts({...contacts, address: e.target.value})} 
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20">Телефон:</span>
            <input 
              className="border px-2 py-1 rounded flex-1" 
              value={contacts.phone} 
              onChange={e=>setContacts({...contacts, phone: e.target.value})} 
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20">Email:</span>
            <input 
              className="border px-2 py-1 rounded flex-1" 
              value={contacts.email} 
              onChange={e=>setContacts({...contacts, email: e.target.value})} 
            />
          </div>
        </div>
      </section>
    </div>
  );
} 