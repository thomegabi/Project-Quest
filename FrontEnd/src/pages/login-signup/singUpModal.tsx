import { Key, Mail, Phone, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { api } from "../../../lib/axios"
import { useNavigate } from "react-router-dom"

interface SignUpModalProps {
  closeSignUpModal: () => void,
}

export function SignUpModal({ closeSignUpModal }: SignUpModalProps){
  const navigate = useNavigate()

  async function createUser(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData(event.currentTarget)
  

    const email = data.get('email')?.toString()
    const password = data.get('password')?.toString()
    const phone = BigInt(data.get('phone')?.toString() || 0).toString()

    console.log(email, password, phone)

    try{
      const response = await api.post('/signup', {
        email,
        password,
        phone,
      }
    )

    sessionStorage.setItem('token', response.data.token)
      
      navigate('/home')
    }catch(err){
      alert('Dados incorretos')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-50 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex-col w-full text-center ">Criar conta</h2>
            <button type="button" onClick={closeSignUpModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>
          <p className="text-zinc-700 text-sm">
            Coloque seu <span className="font-semibold text-zinc-900">Email</span>, <span className="font-semibold text-zinc-900">Senha</span> e <span className="font-semibold text-zinc-900">Telefone</span>
          </p>
        </div>

        <form onSubmit={createUser} className="space-y-3">
          <div className="h-14 px-5 bg-zinc-200 border rounded-lg flex items-center gap-2.5">
            <Mail className="text-zinc-400 size-5"/>
            <input 
              type="email"
              name="email" 
              placeholder="Seu Email" 
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>

          <div className="h-14 px-5 bg-zinc-200  border rounded-lg flex items-center gap-2.5">
            <Key className="text-zinc-400 size-5"/>
            <input 
              type="password" 
              name="password" 
              placeholder="Sua senha" 
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>

          <div className="h-14 px-5 bg-zinc-200  border rounded-lg flex items-center gap-2.5">
            <Phone className="text-zinc-400 size-5"/>
            <input 
              type="tel"
              name="phone" 
              placeholder="Seu telefone/celular" 
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>

          <Button type="submit" variant="primary" size="full">
            Criar
          </Button>
        </form>
      </div>
    </div>
  )
}