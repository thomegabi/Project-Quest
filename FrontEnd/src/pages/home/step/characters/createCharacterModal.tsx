import { FormEvent, useState } from "react"
import { api } from "../../../../../lib/axios"

interface CreateCharacterModalProps{
  closeModal: () => void
}


export function CreateCharacterModal({ closeModal } : CreateCharacterModalProps){
  const [selectedClass, setSelectedClass] = useState("KNIGHT");

  async function createCharacter(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
  
    const data = new FormData(event.currentTarget)
  
  
    const name = data.get('name')?.toString()
    const sex = data.get('sex')?.toString()
    const characterClass = data.get('class')?.toString()
    const race = data.get('race')?.toString()
    const faction = data.get('faction')?.toString()
    const lore = data.get('lore')?.toString()
    const lvl = Number(data.get('lvl')?.toString() || 10);
    const vitality = Number(data.get('vitality')?.toString() || 10);
    const inteligence = Number(data.get('inteligence')?.toString() || 10);
    const resistance = Number(data.get('resistance')?.toString() || 10);
    const dexterity = Number(data.get('dexterity')?.toString() || 10);
    const strength = Number(data.get('strength')?.toString() || 10);
    const faith = Number(data.get('faith')?.toString() || 10);
  
  
    console.log(name, sex, characterClass, race, faction, lore, lvl, vitality, inteligence, resistance, dexterity, strength, faith)
  
    try{
      await api.post('/createCharacter', {
        name, 
        sex, 
        race, 
        faction, 
        characterClass, 
        lore, 
        lvl, 
        inteligence, 
        vitality, 
        resistance, 
        dexterity, 
        strength, 
        faith
      }
    )
  
    closeModal()
      
    }catch(err){
      console.error("Error: ", err)
    }
  }

  const classImageMap: { [key: string]: string } = {

    KNIGHT: "/classes/Knight.png",

    MAGE: "/classes/Mage.png",

    ROGUE: "/classes/Rogue.png",

  };

  return(
    <div className=" w-full h-full font-jacquard12 py-3 px-7">
      <div className="text-4xl text-amber-600 w-full text-center pb-1">
        <h1>Create Character</h1>
      </div>

      <form onSubmit={createCharacter}>
        <div className="w-full h-[535px] flex gap-6">
          <div className="w-[480px] space-y-9">
            <div className=" relative h-52 border-4 border-amber-950 w-full bg-black/80 rounded-lg px-2 pb-2">
              <div className="text-3xl space-y-1">
                <div className="flex gap-2">
                  <p className="text-amber-600">Name: </p>
                  <input
                    className="bg-transparent outline-none text-zinc-50 placeholder:text-zinc-400 focus:ring-0"
                    type="text"
                    name="name"
                  />

                </div>
                
                <div className="flex gap-2">
                  <p className="text-amber-600">Sex: </p>
                  <select name="sex" className="p-1 outline-none bg-black h-9 rounded-md text-zinc-50 border-zinc-950 border">
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <p className="text-amber-600">Class: </p>
                  <select name="class" className="p-1 outline-none bg-black h-9 rounded-md text-zinc-50 border-zinc-950 border" onChange={(e) => setSelectedClass(e.target.value)}>
                    <option value="KNIGHT">Knight</option>
                    <option value="MAGE">Mage</option>
                    <option value="ROGUE">Rogue</option>
                  </select>
                </div>


                <div className="flex gap-2">
                  <p className="text-amber-600">Race: </p>
                  <select name="race" className="p-1 outline-none bg-black h-9 rounded-md text-zinc-50 border-zinc-950 border">
                    <option value="ELF">Elf</option>
                    <option value="HUMAN">Human</option>
                    <option value="DEMON">Demon</option>
                    <option value="DWARVEN">Dwarven</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <p className="text-amber-600">Faction: </p>
                  <select name="faction" className="p-1 outline-none bg-black h-9 rounded-md text-zinc-50 border-zinc-950 border">
                    <option value="SWORDS_OF_LIGHT">Swords of Light</option>
                    <option value="NECRO_INQUISITION">Necro Inquisition</option>
                    <option value="DARK_EMPIRE">Dark Empire</option>
                    <option value="NORTH_KINGDOMS">North Kingdoms</option>
                    <option value="BROTHERS_OF_BLOOD">Brothers of Blood</option>
                  </select>
                </div>
              </div>

              <div className="absolute right-2 bottom-2">
                <button type="submit" className="bg-amber-600 text-zinc-950 w-28 rounded-lg text-2xl border border-black font-medium hover:bg-black hover:text-amber-600 hover:border-amber-600">Submit</button>
              </div>
            </div>

            <div className="flex w-full gap-7">
              <div className="bg-black/80 w-[163px] h-[297px] border-2 border-amber-950 text-amber-400 text-2xl p-2 pr-0 pt-4 space-y-2">
                <div className="flex gap-1 items-center">
                  <p className="w-auto">Level: </p>
                  <input className="w-20 bg-transparent outline-none text-zinc-50" type="number" name="lvl" />
                </div>

                <div className="flex gap-1 items-center">
                  <p className="w-auto">Vitality: </p>
                  <input className="w-20 bg-transparent outline-none text-zinc-50" type="number" name="vitality" />
                </div>

                <div className="flex gap-1 items-center">
                  <p className="w-auto">Resistance: </p>
                  <input className="w-12 bg-transparent outline-none text-zinc-50" type="number" name="resistance" />
                </div>

                <div className="flex gap-1 items-center">
                  <p className="w-auto">Strength: </p>
                  <input className="w-16 bg-transparent outline-none text-zinc-50" type="number" name="strength" />
                </div>

                <div className="flex gap-1 items-center">
                  <p className="w-auto">Dexterity: </p>
                  <input className="w-16 bg-transparent outline-none text-zinc-50" type="number" name="dexterity" />
                </div>

                <div className="flex items-center gap-1">
                  <p className="w-auto">Intelligence: </p>
                  <input className="w-10 bg-transparent outline-none text-zinc-50" type="number" name="inteligence" />
                </div>
                
                <div className="flex items-center gap-1">
                  <p className="w-auto">Faith: </p>
                  <input className="w-24 bg-transparent outline-none text-zinc-50" type="number" name="faith" />
                </div>
              </div>

              <div className="bg-black/80 w-[290px] h-[297px] border-2 border-amber-950 flex text-center p-2 flex-col space-y-3">
                <h1 className="text-amber-800 text-5xl w-full">Lore</h1>
                <textarea 
                  className="bg-transparent placeholder:text-amber-600/40 placeholder:text-center placeholder:text-lg flex text-center text-lg resize-none h-full text-zinc-50 outline-none" 
                  name="lore" 
                  placeholder="Talk about your character here, like: backstory, physical appearance, special abilities, and so on" 
                />
              </div>

            </div>
          </div>
          
          <div className="h-full border-2 border-amber-950 bg-black/80 w-[291px] flex items-center">
          <img src={classImageMap[selectedClass] || "/classes/Knight.png"} alt={selectedClass}/>
          </div>
        </div>
      </form>
    </div>
  )
}