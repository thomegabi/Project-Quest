import { useEffect, useState } from "react";
import { api } from "../../../../../lib/axios";

interface SelectedQuestProps {
  questId: string | null
}

interface Quest {
  sender: string
  faction: string | null
  race: string | null
  description: string
  p_objective: string
  s_objective: string | null
}

export function SelectedQuest({ questId }: SelectedQuestProps) {
  const [quest, setQuest] = useState<Quest | null>(null)

  useEffect(() => {
    async function getQuest() {
      if (!questId) return;

      try {
        const response = await api.get(`/quests/${questId}`);
        if (response.data.quest) {
          const questData = response.data.quest;
          const formattedQuest = {
            ...questData,
            faction: questData.faction
              ? questData.faction
                  .replace(/_/g, ' ')
                  .toLowerCase()
                  .split(' ')
                  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
              : null,
            race: questData.race
              ? questData.race.charAt(0).toUpperCase() + questData.race.slice(1).toLowerCase()
              : null
          };
          setQuest(formattedQuest);
        }
      } catch (error) {
        console.error('Error occurred during quest fetch:', error);
        setQuest(null);
      }
    }
    getQuest();
  }, [questId]);

  if (!quest) return null;

  return (
    <div className="w-full h-full font-jacquard12 py-3 px-7">
      <div className="text-4xl text-amber-600 w-full text-center pb-1">
        <h1>Selected Quest</h1>
      </div>

      <div className="space-y-6">
        <div className="border-4 border-amber-950 w-full bg-black/80 rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-2xl">
                <span className="text-amber-600">Quest Giver: </span>
                <span className="text-zinc-50">{quest.sender}</span>
              </p>
              <p className="text-2xl">
                <span className="text-amber-600">Target: </span>
                <span className="text-zinc-50">{quest.faction || quest.race}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 space-y-4">
            <div className="bg-black/80 border-2 border-amber-950 p-4">
              <p className="text-amber-600 text-2xl mb-2">Primary Objective:</p>
              <p className="text-zinc-50">{quest.p_objective}</p>
            </div>

            {quest.s_objective && (
              <div className="bg-black/80 border-2 border-amber-950 p-4">
                <p className="text-amber-600 text-2xl mb-2">Secondary Objective:</p>
                <p className="text-zinc-50">{quest.s_objective}</p>
              </div>
            )}
          </div>

          <div className="flex-1 bg-black/80 border-2 border-amber-950 p-4">
            <p className="text-amber-600 text-2xl mb-2">Quest Description:</p>
            <p className="text-zinc-50">{quest.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 