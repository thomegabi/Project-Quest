import { X } from "lucide-react";
import { FormEvent } from "react";
import { api } from "../../../../../lib/axios";
import { Button } from "../../../../components/button";

interface CreateCharacterModalProps {
  closeModal: () => void;
}

export function CreateCharacterModal({ closeModal }: CreateCharacterModalProps) {
  async function createCharacter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get("name")?.toString();
    const sex = data.get("sex")?.toString();
    const characterClass = data.get("class")?.toString();
    const race = data.get("race")?.toString();
    const faction = data.get("faction")?.toString();
    const lore = data.get("lore")?.toString();
    const level = Number(data.get("level"));
    const vitality = Number(data.get("vitality"));
    const resistance = Number(data.get("resistance"));
    const strength = Number(data.get("strength"));
    const dexterity = Number(data.get("dexterity"));
    const intelligence = Number(data.get("intelligence"));
    const faith = Number(data.get("faith"));

    try {
      const response = await api.post("/characters", {
        name,
        sex,
        class: characterClass,
        race,
        faction,
        lore,
        level,
        vitality,
        resistance,
        strength,
        dexterity,
        intelligence,
        faith,
      });

      alert(`Character ${response.data.name} created successfully!`);
      closeModal();
    } catch {
      alert("Failed to create character. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-[1200px] bg-black/70 border-4 border-amber-600 rounded-lg p-6 grid grid-cols-[1fr_1fr_1fr] gap-4">
        {/* Cabeçalho */}
        <div className="col-span-3 flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold text-amber-600 text-center w-full">
            Character Creation
          </h2>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-amber-600 hover:text-white"
          >
            <X size={28} />
          </button>
        </div>

        {/* Formulário */}
        <form
          className="grid grid-cols-[1fr_1fr_1fr] gap-4 col-span-3"
          onSubmit={createCharacter}
        >
          {/* Primeira Coluna */}
          <div className="space-y-4 border border-amber-600 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <label className="text-lg font-bold text-amber-600">Name:</label>
              <input
                type="text"
                name="name"
                className="w-3/4 h-auto bg-black border border-amber-600 text-amber-600 rounded-md p-2"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-lg font-bold text-amber-600">Sex:</label>
              <input
                type="text"
                name="sex"
                className="w-3/4 h-auto bg-black border border-amber-600 text-amber-600 rounded-md p-2"
                placeholder="Enter sex"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-lg font-bold text-amber-600">Class:</label>
              <input
                type="text"
                name="class"
                className="w-3/4 h-auto bg-black border border-amber-600 text-amber-600 rounded-md p-2"
                placeholder="Enter class"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-lg font-bold text-amber-600">Race:</label>
              <input
                type="text"
                name="race"
                className="w-3/4 h-auto bg-black border border-amber-600 text-amber-600 rounded-md p-2"
                placeholder="Enter race"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-lg font-bold text-amber-600">Faction:</label>
              <input
                type="text"
                name="faction"
                className="w-3/4 h-auto bg-black border border-amber-600 text-amber-600 rounded-md p-2"
                placeholder="Enter faction"
                required
              />
            </div>
          </div>

          {/* Segunda Coluna */}
          <div className="space-y-2 border border-amber-600 p-4 rounded-lg">
            {[
              "Level",
              "Vitality",
              "Resistance",
              "Strength",
              "Dexterity",
              "Intelligence",
              "Faith",
            ].map((stat) => (
              <div key={stat} className="flex items-center justify-between">
                <label className="text-lg font-bold text-amber-600">{stat}:</label>
                <input
                  type="number"
                  name={stat.toLowerCase()}
                  className="w-3/4 h-auto bg-black border border-amber-600 text-amber-600 rounded-md p-2"
                  placeholder={`Enter ${stat.toLowerCase()}`}
                  required
                />
              </div>
            ))}
          </div>

          {/* Terceira Coluna */}
          <div className="space-y-4">
            <div className="border border-amber-600 p-4 rounded-lg">
              <label className="text-lg font-bold text-amber-600 mb-2 block">
                Lore
              </label>
              <textarea
                name="lore"
                className="w-full h-32 bg-black border border-amber-600 text-amber-600 rounded-md p-2"
                placeholder="Talk about your character here..."
                required
              ></textarea>
            </div>
            <div className="border border-amber-600 p-4 rounded-lg flex items-center justify-center">
              <img src="/knight.png" alt="Knight" className="h-64 object-contain" />
            </div>
          </div>
        </form>

        {/* Botão de Submit */}
        <div className="col-span-3 flex justify-center mt-4">
          <Button type="submit" variant="primary" size="full">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
