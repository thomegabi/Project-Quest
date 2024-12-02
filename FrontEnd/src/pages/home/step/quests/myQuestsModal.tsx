import { useEffect, useState, FormEvent } from "react"
import { api } from "../../../../../lib/axios"
import { X } from "lucide-react"

interface MyQuestsModalProps {
  handleQuestSelection: (id: string) => void;
}

interface Quest {
  id: string
  sender: string
  faction: string | null
  race: string | null
  p_objective: string
  s_objective: string | null
  description: string
}

interface EditQuestModalProps {
  quest: Quest;
  onClose: () => void;
  onSave: () => void;
}

function EditQuestModal({ quest, onClose, onSave }: EditQuestModalProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const giver = formData.get('giver')?.toString();
    const type = formData.get('type')?.toString();
    const targetType = formData.get('targetType')?.toString();
    const description = formData.get('description')?.toString();
    const primaryObjective = formData.get('primaryObjective')?.toString();
    const secondaryObjective = formData.get('secondaryObjective')?.toString();

    const factionOrRace = targetType === 'faction' 
      ? { faction: type, race: null }
      : { faction: null, race: type };

    try {
      await api.put(`/quests/${quest.id}`, {
        giver,
        ...factionOrRace,
        description,
        primaryObjective,
        secondaryObjective
      });

      onSave();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar quest:', error);
      alert('Erro ao atualizar quest');
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-black/80 p-8 rounded-lg w-[800px] border-2 border-amber-950">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-600">Editar Quest</h2>
          <button onClick={onClose}>
            <X className="size-6 text-amber-600 hover:text-amber-300"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-amber-600 mb-2">Quest Giver</label>
              <input
                type="text"
                name="giver"
                defaultValue={quest.sender}
                className="w-full bg-black/60 text-white p-2 rounded border border-amber-950"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-amber-600 mb-2">Target Type</label>
                <select
                  name="targetType"
                  defaultValue={quest.faction ? 'faction' : 'race'}
                  className="w-full bg-black/60 text-white p-2 rounded border border-amber-950"
                  required
                >
                  <option value="faction">Faction</option>
                  <option value="race">Race</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-amber-600 mb-2">Target</label>
                <select
                  name="type"
                  defaultValue={quest.faction || quest.race}
                  className="w-full bg-black/60 text-white p-2 rounded border border-amber-950"
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

            <div>
              <label className="block text-amber-600 mb-2">Primary Objective</label>
              <textarea
                name="primaryObjective"
                defaultValue={quest.p_objective}
                className="w-full bg-black/60 text-white p-2 rounded border border-amber-950 h-24 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-amber-600 mb-2">Secondary Objective</label>
              <textarea
                name="secondaryObjective"
                defaultValue={quest.s_objective || ''}
                className="w-full bg-black/60 text-white p-2 rounded border border-amber-950 h-24 resize-none"
              />
            </div>

            <div>
              <label className="block text-amber-600 mb-2">Description</label>
              <textarea
                name="description"
                defaultValue={quest.description}
                className="w-full bg-black/60 text-white p-2 rounded border border-amber-950 h-32 resize-none"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-amber-600 text-zinc-950 px-8 py-2 rounded-lg text-2xl border border-black font-medium hover:bg-black hover:text-amber-600 hover:border-amber-600"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function MyQuestsModal({ handleQuestSelection }: MyQuestsModalProps) {
  const [quests, setQuests] = useState<Quest[]>([])
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null)

  useEffect(() => {
    async function getQuests() {
      try {
        const response = await api.get('/myQuests');
        if (response.data.quests) {
          const formattedQuests = response.data.quests.map((quest: Quest) => ({
            ...quest,
            faction: quest.faction
              ? quest.faction
                  .replace(/_/g, ' ')
                  .toLowerCase()
                  .split(' ')
                  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
              : null,
            race: quest.race
              ? quest.race.charAt(0).toUpperCase() + quest.race.slice(1).toLowerCase()
              : null
          }));
          setQuests(formattedQuests);
        } else {
          console.warn("No quests found in response.");
          setQuests([]);
        }
      } catch (error) {
        console.error('Error occurred during quests fetch:', error);
        setQuests([]);
      }
    }
    getQuests();
  }, []);

  async function deleteQuest(questId: string) {
    if (!questId) return;

    const confirmDelete = confirm("Are you sure you want to delete this quest?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/quests/${questId}`);
      setQuests((prevQuests) => prevQuests.filter((quest) => quest.id !== questId));
    } catch (error) {
      console.error("Error deleting quest:", error);
    }
  }

  function handleEdit(quest: Quest) {
    setEditingQuest(quest);
  }

  function handleCloseEdit() {
    setEditingQuest(null);
  }

  async function handleSaveEdit() {
    try {
      const response = await api.get('/myQuests');
      if (response.data.quests) {
        const formattedQuests = response.data.quests.map((quest: Quest) => ({
          ...quest,
          faction: quest.faction
            ? quest.faction
                .replace(/_/g, ' ')
                .toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            : null,
          race: quest.race
            ? quest.race.charAt(0).toUpperCase() + quest.race.slice(1).toLowerCase()
            : null
        }));
        setQuests(formattedQuests);
      }
    } catch (error) {
      console.error('Erro ao recarregar quests:', error);
    }
  }

  return (
    <div className="h-full w-full bg-black/60 font-jacquard12 p-2 space-y-6">
      <h1 className="text-amber-600 text-4xl flex justify-center">My Quests</h1>

      {editingQuest && (
        <EditQuestModal
          quest={editingQuest}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}

      <div className="flex flex-col justify-center items-center space-y-6">
        {quests.map((quest) => (
          <div key={quest.id} className="h-32 w-[791px] border-2 border-amber-950 bg-black/60 p-3">
            <div className="relative h-full">
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between">
                  <p className="text-2xl text-amber-800">
                    Quest Giver: <span className="text-zinc-50">{quest.sender}</span>
                  </p>
                  <p className="text-2xl text-amber-800">
                    Target: <span className="text-zinc-50">{quest.faction || quest.race}</span>
                  </p>
                </div>

                <div className="flex-1 mt-2">
                  <p className="text-xl text-amber-800">
                    Primary Objective: <span className="text-zinc-50">{quest.p_objective}</span>
                  </p>
                </div>

                <button 
                  onClick={() => handleQuestSelection(quest.id)} 
                  className="absolute right-0 bottom-0 bg-amber-600 w-14 rounded-md"
                >
                  Check
                </button>

                <button 
                  onClick={() => deleteQuest(quest.id)} 
                  className="absolute right-0 top-0"
                >
                  <X className="size-5 text-amber-600 hover:text-amber-300"/>
                </button>

                <button 
                  onClick={() => handleEdit(quest)}
                  className="absolute right-20 bottom-0 bg-amber-600 w-14 rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 