import { Key, Mail, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { api } from "../../../lib/axios"
import { useNavigate } from "react-router-dom"

interface LoginModalProps {
  closeLoginModal: () => void,
}

export function LoginModal({ closeLoginModal}: LoginModalProps){
  const navigate = useNavigate()

  async function login(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData(event.currentTarget)
  

    const email = data.get('email')?.toString()
    const password = data.get('password')?.toString()

    console.log(email, password)

    try{
      const response = await api.post('/login', {
        email,
        password,
      })

      sessionStorage.setItem('token', response.data.token)

      navigate('/home')
    
    }catch{
      alert('Usuário ou senha incorretos, reveja seus dados')
    }
  }



  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex-col w-full text-center text-zinc-50">Login</h2>
            <button type="button" onClick={closeLoginModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>
          <p className="text-zinc-50 text-sm">
            Entre com seu <span className="font-semibold text-zinc-50">Email</span> e <span className="font-semibold text-zinc-50">Senha</span>
          </p>
        </div>

        <form onSubmit={login} className="space-y-3">
          <div className="h-14 px-5 bg-zinc-950 text-zinc-50 rounded-lg flex items-center gap-2.5">
            <Mail className="text-zinc-400 size-5"/>
            <input 
              type="email"
              name="email" 
              placeholder="Seu Email" 
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>

          <div className="h-14 px-5 bg-zinc-950 text-zinc-50 rounded-lg flex items-center gap-2.5">
            <Key className="text-zinc-400 size-5"/>
            <input 
              type="password" 
              name="password" 
              placeholder="Sua senha" 
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>

          <Button type="submit" variant="primary" size="full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}