import { Button } from "./button"

interface ConfirmationModalProps{
  closeConfirmation: () => void,
  onConfirm: () => void,
  description: string | null
}


export function ConfirmationModal({ closeConfirmation, onConfirm, description }: ConfirmationModalProps){


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center font-spartan">
      <div className="w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-50 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between flex-col">
            <h2 className="text-lg font-semibold flex-col w-full text-center ">Tem certeza que deseja fazer isso?</h2>
            {description ? (
              <p className="text-center">{description}</p>
            ) : (
              <p>Essa ação não pode ser desfeita</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="primary" size="full" onClick={onConfirm}>Confirmar</Button>
          <Button variant="terciary" size="full" onClick={closeConfirmation}>Cancelar</Button>
        </div>
      </div>
    </div>
  )
}