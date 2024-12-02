import { useEffect, useState } from "react"
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

export function MyQuestsModal({ handleQuestSelection }: MyQuestsModalProps) {
  const [quests, setQuests] = useState<Quest[]>([])

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

  return (
    <div className="h-full w-full bg-black/60 font-jacquard12 p-2 space-y-6">
      <h1 className="text-amber-600 text-4xl flex justify-center">My Quests</h1>

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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 