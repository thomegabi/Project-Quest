import { FormEvent } from "react"
import { api } from "../../../../../lib/axios"

interface CreateQuestModalProps {
  closeModal: () => void
}

export function CreateQuestModal({ closeModal }: CreateQuestModalProps) {
  async function createQuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log("Iniciando criação da quest")

    const formData = new FormData(event.currentTarget)

    const giver = formData.get('giver')?.toString()
    const type = formData.get('type')?.toString()
    const targetType = formData.get('targetType')?.toString()
    const description = formData.get('description')?.toString()
    const primaryObjective = formData.get('primaryObjective')?.toString()
    const secondaryObjective = formData.get('secondaryObjective')?.toString()

    const factionOrRace = targetType === 'faction' 
      ? { faction: type, race: null }
      : { faction: null, race: type }

    try {
      const response = await api.post('/quests', {
        giver,
        ...factionOrRace,
        description,
        primaryObjective,
        secondaryObjective
      })

      console.log("Quest criada com sucesso:", response.data)
      closeModal()
    } catch (error: any) {
      console.error("Erro completo:", error)
      alert(`Erro ao criar quest: ${error.response?.data?.error || error.message}`)
    }
  }

  return (
    <div className="w-full h-full font-jacquard12 py-3 px-7">
      <div className="text-4xl text-amber-600 w-full text-center pb-1">
        <h1>Create Quest</h1>
      </div>

      <form onSubmit={createQuest}>
        <div className="w-full space-y-6">
          <div className="border-4 border-amber-950 w-full bg-black/80 rounded-lg p-4">
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <p className="text-amber-600 text-2xl">Quest Giver: </p>
                <input
                  className="bg-black/60 text-zinc-50 p-2 rounded-md border border-amber-950 w-96"
                  type="text"
                  name="giver"
                  required
                />
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-amber-600 text-2xl">Target Type: </p>
                <select 
                  name="targetType" 
                  className="bg-black/60 text-zinc-50 p-2 rounded-md border border-amber-950"
                  required
                >
                  <option value="faction">Faction</option>
                  <option value="race">Race</option>
                </select>

                <p className="text-amber-600 text-2xl ml-4">Target: </p>
                <select 
                  name="type" 
                  className="bg-black/60 text-zinc-50 p-2 rounded-md border border-amber-950"
                  required
                >
                  <optgroup label="Factions">
                    <option value="SWORDS_OF_LIGHT">Swords of Light</option>
                    <option value="NECRO_INQUISITION">Necro Inquisition</option>
                    <option value="DARK_EMPIRE">Dark Empire</option>
                    <option value="NORTH_KINGDOMS">North Kingdoms</option>
                    <option value="BROTHERS_OF_BLOOD">Brothers of Blood</option>
                  </optgroup>
                  <optgroup label="Races">
                    <option value="ELF">Elf</option>
                    <option value="HUMAN">Human</option>
                    <option value="DEMON">Demon</option>
                    <option value="DWARVEN">Dwarven</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-1 space-y-4">
              <div className="bg-black/80 border-2 border-amber-950 p-4">
                <p className="text-amber-600 text-2xl mb-2">Primary Objective:</p>
                <textarea 
                  className="w-full h-32 bg-black/60 text-zinc-50 p-2 rounded-md border border-amber-950 resize-none"
                  name="primaryObjective"
                  required
                />
              </div>

              <div className="bg-black/80 border-2 border-amber-950 p-4">
                <p className="text-amber-600 text-2xl mb-2">Secondary Objective:</p>
                <textarea 
                  className="w-full h-32 bg-black/60 text-zinc-50 p-2 rounded-md border border-amber-950 resize-none"
                  name="secondaryObjective"
                />
              </div>
            </div>

            <div className="flex-1 bg-black/80 border-2 border-amber-950 p-4">
              <p className="text-amber-600 text-2xl mb-2">Quest Description:</p>
              <textarea 
                className="w-full h-72 bg-black/60 text-zinc-50 p-2 rounded-md border border-amber-950 resize-none"
                name="description"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              className="bg-amber-600 text-zinc-950 px-8 py-2 rounded-lg text-2xl border border-black font-medium hover:bg-black hover:text-amber-600 hover:border-amber-600"
            >
              Create Quest
            </button>
          </div>
        </div>
      </form>
    </div>
  )
} 