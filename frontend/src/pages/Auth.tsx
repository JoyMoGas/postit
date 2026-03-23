import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login({ username: form.username, password: form.password });
      } else {
        await api.post('/register/', form);
        alert("Cuenta creada, ahora inicia sesión");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Error en la operación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0E7D5] selection:bg-[#3A352F] selection:text-[#F0E7D5]">
      <form onSubmit={handleSubmit} className="p-10 bg-[#FDFBFA] shadow-lg border border-[#E2D7C1] rounded-3xl w-96 transform transition-all">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-[#3A352F] tracking-tight">{isLogin ? 'Bienvenido' : 'Crear Cuenta'}</h2>
          <p className="text-[#8A8172] mt-2 text-sm">{isLogin ? 'Ingresa para continuar' : 'Únete a nuestra comunidad'}</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <input 
            className="w-full border border-[#E2D7C1] bg-[#FAF8F5] p-3 rounded-xl focus:border-[#D4A373] focus:ring-2 focus:ring-[#D4A373] outline-none transition-all placeholder:text-[#A8A196] text-[#3A352F]" 
            placeholder="Nombre de usuario" 
            onChange={e => setForm({...form, username: e.target.value})} 
          />
          {!isLogin && (
            <input 
              className="w-full border border-[#E2D7C1] bg-[#FAF8F5] p-3 rounded-xl focus:border-[#D4A373] focus:ring-2 focus:ring-[#D4A373] outline-none transition-all placeholder:text-[#A8A196] text-[#3A352F]" 
              placeholder="Correo electrónico" 
              onChange={e => setForm({...form, email: e.target.value})} 
            />
          )}
          <input 
            type="password" 
            className="w-full border border-[#E2D7C1] bg-[#FAF8F5] p-3 rounded-xl focus:border-[#D4A373] focus:ring-2 focus:ring-[#D4A373] outline-none transition-all placeholder:text-[#A8A196] text-[#3A352F]" 
            placeholder="Contraseña" 
            onChange={e => setForm({...form, password: e.target.value})} 
          />
        </div>

        <button disabled={loading} className="w-full bg-[#3A352F] text-[#F0E7D5] font-bold p-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:bg-[#2A251F] shadow-sm disabled:opacity-70 disabled:pointer-events-none flex justify-center items-center">
          {loading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (isLogin ? 'Entrar' : 'Registrarme')}
        </button>
        
        <p onClick={() => setIsLogin(!isLogin)} className="text-sm mt-6 cursor-pointer text-[#8A8172] hover:text-[#3A352F] text-center font-medium transition-colors">
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </p>
      </form>
    </div>
  );
};