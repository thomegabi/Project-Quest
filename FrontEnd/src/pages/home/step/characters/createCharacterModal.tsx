
export function CreateCharacterModal(){

  return(
    <div className=" w-full h-full font-jacquard12 py-3 px-7">
      <div className="text-4xl text-amber-600 w-full text-center pb-1">
        <h1>Create Character</h1>
      </div>

      
        <div className="w-full h-[535px] flex gap-6">
          <div className="w-[480px] space-y-9">
            <div className=" relative h-52 border-4 border-amber-950 w-full bg-black/80 rounded-lg px-2 pb-2">
              <div className="text-3xl space-y-1">
                <div className="flex gap-2">
                  <p className="text-amber-600">Name: </p>
                  <input className="bg-transparent outline-none text-zinc-50" type="text" name="name" />
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
                  <select name="class" className="p-1 outline-none bg-black h-9 rounded-md text-zinc-50 border-zinc-950 border">
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
                    <option value="BROTHERS_OF_BLOODS">Brothers of Blood</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex w-full gap-7">
              <div className="bg-black/80 w-[163px] h-[297px] border-2 border-amber-950 text-amber-400 text-2xl p-2 pr-0 pt-4 space-y-2">
                <div className="flex gap-1 items-center">
                  <p className="w-auto">Level: </p>
                  <input className="w-20 bg-transparent outline-none" type="number" name="lvl" />
                </div>

                <div className="flex gap-1 items-center">
                  <p className="w-auto">Vitality: </p>
                  <input className="w-20 bg-transparent outline-none" type="number" name="vitality" />
                </div>

                <div className="flex gap-1 items-center">
                  <p className="w-auto">Resistance: </p>
                  <input className="w-12 bg-transparent outline-none" type="number" name="resistance" />
                </div>

                <div className="flex gap-1 items-center">
                  <p className="w-auto">Strength: </p>
                  <input className="w-16 bg-transparent outline-none" type="number" name="strength" />
                </div>

                <div className="flex gap-1 items-center">
                  <p className="w-auto">Dexterity: </p>
                  <input className="w-16 bg-transparent outline-none" type="number" name="dexterity" />
                </div>

                <div className="flex items-center gap-1">
                  <p className="w-auto">Intelligence: </p>
                  <input className="w-10 bg-transparent outline-none" type="number" name="intelligence" />
                </div>
                
                <div className="flex items-center gap-1">
                  <p className="w-auto">Faith: </p>
                  <input className="w-24 bg-transparent outline-none" type="number" name="faith" />
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
            <img src="/classes/Knight.png" alt="Knight" />
          </div>
        </div>
    </div>
  )
}