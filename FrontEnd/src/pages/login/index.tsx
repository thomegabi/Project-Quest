import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await api.post('/login', { email, password });
      console.log('Resposta do login:', response.data);

      sessionStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Entrar
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/signup" className="text-sm text-indigo-400 hover:text-indigo-300">
            Não tem uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
} 