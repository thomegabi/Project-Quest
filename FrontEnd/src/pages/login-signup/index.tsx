import {  useState } from "react";
import { Button } from "../../components/button";
import { SignUpModal } from "./singUpModal";
import { LoginModal } from "./loginModal";


export function LoginSignupPage(){

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);



  function openLoginModal(){
    setLoginModalOpen(true);
  }

  function closeLoginModal(){
    setLoginModalOpen(false);
  }

  function openSingUpModal(){
    setSignUpModalOpen(true);
  }

  function closeSignUpModal(){
    setSignUpModalOpen(false);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-96 w-full px-6 text-center ">
        <div className="flex flex-col items-center justify-center gap-3">
          <img className="size-96" src="/bonfire.svg" alt="Logo OBS Observatório de Chapecó" />
        </div>
        <div className="flex items-center flex-col w-full gap-3">
        
          <Button onClick={openSingUpModal} variant="primary" size="full">Criar Conta</Button>

          <Button onClick={openLoginModal} variant="secondary" size="full">Login</Button>
        
        </div>
      </div>

      {isSignUpModalOpen && (
        <SignUpModal
          closeSignUpModal={closeSignUpModal}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal
          closeLoginModal={closeLoginModal}
        />
      )}

    </div>
  )
}