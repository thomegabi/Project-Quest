import { useState } from "react";
import { Button } from "../../components/button";
import { MyCharactersModal } from "./step/characters/myCharactersModal";
import { AllCharactersModal } from "./step/characters/allCharacters";
import { useNavigate } from "react-router-dom";
import { SelectedCharacter } from "./step/characters/selectedCharModal";
import { CreateCharacterModal } from "./step/characters/createCharacterModal";
import { CreateQuestModal } from "./step/quests/createQuestModal";
import { MyQuestsModal } from "./step/quests/myQuestsModal";
import { AllQuestsModal } from "./step/quests/allQuestsModal";
import { SelectedQuest } from "./step/quests/selectedQuestModal";

export function HomePage() {
  const navigate = useNavigate()
  const [ isCharacterModalOpen, setCharacterModalOpen ] = useState(false);
  const [ isMyCharactersModalOpen, setMyCharactersModalOpen ] = useState(false)
  const [ isAllCharactersModalOpen, setAllCharactersModalOpen ] = useState(false)
  const [ isSelectedCharacterOpen, setSelectedCharacterOpen ] = useState(false);
  const [ selectedCharacter, setSelectedCharacter ] = useState<string | null>(null);
  const [ isQuestModalOpen, setQuestModalOpen ] = useState(false);
  const [ isMyQuestsModalOpen, setMyQuestsModalOpen ] = useState(false);
  const [ isAllQuestsModalOpen, setAllQuestsModalOpen ] = useState(false);
  const [ isSelectedQuestOpen, setSelectedQuestOpen ] = useState(false);
  const [ selectedQuest, setSelectedQuest ] = useState<string | null>(null);

  function openCharacterModal() {
    closeAllModals()
    setCharacterModalOpen(true);
  }
  
  function openMyCharacterModal() {
    closeAllModals()
    setMyCharactersModalOpen(true);
  }

  function openAllCharacterModal() {
    closeAllModals()
    setAllCharactersModalOpen(true);
  }

  function handleCharacterSelection(id: string) {
    setSelectedCharacter(id); 
    openSelectedCharacterModal()
  }

  function openSelectedCharacterModal() {
    closeAllModals();
    setSelectedCharacterOpen(true);
  }

  function openQuestModal() {
    closeAllModals()
    setQuestModalOpen(true);
  }
  
  function openMyQuestsModal() {
    closeAllModals()
    setMyQuestsModalOpen(true);
  }

  function openAllQuestsModal() {
    closeAllModals()
    setAllQuestsModalOpen(true);
  }

  function handleQuestSelection(id: string) {
    setSelectedQuest(id); 
    openSelectedQuestModal()
  }

  function openSelectedQuestModal() {
    closeAllModals();
    setSelectedQuestOpen(true);
  }

  function closeAllModals() {
    setCharacterModalOpen(false);
    setMyCharactersModalOpen(false);
    setAllCharactersModalOpen(false);
    setSelectedCharacterOpen(false);
    setQuestModalOpen(false);
    setMyQuestsModalOpen(false);
    setAllQuestsModalOpen(false);
    setSelectedQuestOpen(false);
  }

  async function logout(){
    sessionStorage.removeItem('token')

    navigate('/')
  }

  return (
    <div className="font-jacquard12 min-h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="relative w-[1216px] h-[792px] pt-4">
        <div className="flex items-center gap-52 pl-16 pb-4 z-10">
          <img src="../../public/Logo.png" alt="logo" />
          <p className="text-amber-600 font-jacquard12 text-[150px] h-[150px] flex items-center">
            Quest Heroes
          </p>
          
        </div>

        <div className="flex items-center z-10 gap-16">
          <div className="z-10 flex items-center">
            <div className="h-[625px] w-72 border-amber-600 border-2 rounded-2xl flex items-center bg-black/60 z-10 px-5 py-10 flex-col gap-4 mb-3">
              <Button variant="primary" size="full" onClick={openCharacterModal}>
                <p className="text-[40px] font-medium">Create Char</p>
              </Button>
              <Button variant="primary" size="full" onClick={openQuestModal}>
                <p className="text-[40px] font-medium">Create Quest</p>
              </Button>
              <Button variant="secondary" size="full" onClick={openMyCharacterModal}>
                <p className="text-[35px] font-medium">My Characters</p>
              </Button>
              <Button variant="secondary" size="full" onClick={openMyQuestsModal}>
                <p className="text-[35px] font-medium">My Quests</p>
              </Button>
              <Button variant="secondary" size="full" onClick={openAllCharacterModal}>
                <p className="text-[35px] font-medium">All Characters</p>
              </Button>
              <Button variant="secondary" size="full" onClick={openAllQuestsModal}>
                <p className="text-[35px] font-medium">All Quests</p>
              </Button>
              <Button variant="terciary" size="full" onClick={logout}>
                <p className="text-[35px] font-medium">Exit</p>
              </Button>
            </div>
            <div className="absolute pt-9 pl-11 z-0">
              <img src="../../public/Inscriptions.png" alt="inscriptions" />
            </div>
          </div>

          <div className="z-10 flex items-center">
            <div className="w-[862px] h-[625px] border-2 border-amber-600 bg-black/60 z-10 mb-3 overflow-y-auto">
              {isCharacterModalOpen && (
                <CreateCharacterModal 
                  closeModal={closeAllModals}
                />
              )}

              {isMyCharactersModalOpen && (
                <MyCharactersModal
                  handleCharacterSelection={handleCharacterSelection}
                />
              )}

              {isAllCharactersModalOpen && (
                <AllCharactersModal
                  handleCharacterSelection={handleCharacterSelection}
                />
              )}

              {isSelectedCharacterOpen && (
                <SelectedCharacter 
                  characterId={selectedCharacter}
                />
              )}

              {isQuestModalOpen && (
                <CreateQuestModal 
                  closeModal={closeAllModals}
                />
              )}

              {isMyQuestsModalOpen && (
                <MyQuestsModal
                  handleQuestSelection={handleQuestSelection}
                />
              )}

              {isAllQuestsModalOpen && (
                <AllQuestsModal
                  handleQuestSelection={handleQuestSelection}
                />
              )}

              {isSelectedQuestOpen && (
                <SelectedQuest 
                  questId={selectedQuest}
                />
              )}
            </div>
            <div className="absolute pl-40 z-0">
              <img src="../../public/PixelBonfire.png" alt="bonfire" />
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
