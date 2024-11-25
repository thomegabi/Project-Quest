import { useEffect, useState } from "react"
import { api } from "../../../../../lib/axios"
import { X } from "lucide-react"

interface Character {
  id: string
  name: string
  lvl: number
  faction: string
  class: string
}


export function MyCharactersModal(){
  const [ characters, setCharacters ] = useState<Character[]>([])
  console.log('Characters: ', characters)

  useEffect(() => {
    async function getCharacters() {
      try {
        const response = await api.get('/myCharacters');
        if (response.data.character) {
          const formattedCharacters = response.data.character.map((char: Character) => ({
            ...char,
            class: char.class.charAt(0).toUpperCase() + char.class.slice(1).toLowerCase(), // Formata 'class'
            faction: char.faction
            .replace(/_/g, ' ') 
            .toLowerCase() 
            .split(' ') 
            .map((word : string) => word.charAt(0).toUpperCase() + word.slice(1)) 
            .join(' '),  
            name: char.name.charAt(0).toUpperCase() + char.name.slice(1).toLowerCase(), 
          }));
          setCharacters(formattedCharacters);
        } else {
          console.warn("No characters found in response.");
          setCharacters([]); 
        }
      } catch (error) {
        console.error('Error occurred during characters fetch:', error);
        setCharacters([]); 
      }
    }
    getCharacters();
  }, []); 

  async function deleteChar(charId: string) {
    if (!charId) {
      return;
    }

    const confirmDelete = confirm("Are you sure o want to delete this character?");
    if (!confirmDelete) {
      return; 
    }
    try {
      await api.delete(`/character/${charId}/delete`);
      setCharacters((prevChars) =>
        prevChars.filter((char) => char.id !== charId)
      );
    } catch (error) {
      console.error("Error on deleting character:", error);
    }
  }
  
   

  return(
    <div className="h-full w-full bg-black/60 font-jacquard12 p-2 space-y-6">
      <h1 className="text-amber-600 text-4xl flex justify-center ">My Characters</h1>

      <div className="flex flex-col justify-center space-y-6">
        {characters.map((character) => (
          <div key={character.id} className="h-24 w-[791px] border-2 border-amber-950 bg-black/60 p-3">
            <div className="flex gap-3">
              <div className="h-[70px] w-[70px] border-2 border-amber-800">
                {character.class === 'Knight' && (<img src="/classes/knightIcon.png" alt="Knight Icon" />)}
                {character.class === 'Mage' && (<img src="/classes/mageIcon.png" alt="Mage Icon" />)}
                {character.class === 'Rogue' && (<img src="/classes/rogueIcon.png" alt="Rogue Icon" />)}      
              </div>

              <div className="w-[600px] text-2xl text-amber-800 font-medium flex justify-between">
                <div className="flex flex-col space-y-2">
                  <p>Name: <span className="text-zinc-50">{character.name}</span></p>
                  <p>Level: <span className="text-zinc-50">{character.lvl}</span></p>
                </div>

                <div className="flex flex-col space-y-2">
                  <p>Faction: <span className="text-zinc-50">{character.faction}</span></p>
                  <p>Class: <span className="text-zinc-50">{character.class}</span></p>
                </div>
              </div>

              <button onClick={() => deleteChar(character.id)} className="absolute right-20">
                <X className="size-5 text-amber-600 hover:text-amber-300"/>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}