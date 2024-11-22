import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { api } from "../../../../../lib/axios";
import { Button } from "../../../../components/button";

// Props do Modal
interface CreateCharacterModalProps {
  closeModal: () => void;
}

// Componente Reutilizável: InputField
interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}
function InputField({ label, name, type = "text", placeholder }: InputFieldProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-lg font-bold text-amber-600">{label}:</label>
      <input
        type={type}
        name={name}
        className="w-3/4 h-auto bg-black border border-amber-600 text-amber-600 rounded-md p-2"
        placeholder={placeholder}
        required
        aria-label={label}
        aria-required="true"
      />
    </div>
  );
}

// Componente Reutilizável: SelectField
interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}
function SelectField({ label, name, options }: SelectFieldProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-lg font-bold text-amber-600">{label}:</label>
      <select
        name={name}
        className="w-3/4 h-auto bg-black border border-amber-600 text-amber-600 rounded-md p-2"
        required
        aria-label={label}
        aria-required="true"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Componente Principal: CreateCharacterModal
export function CreateCharacterModal({ closeModal }: CreateCharacterModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para validar os dados do formulário
  function validateForm(data: FormData): string | null {
    const name = data.get("name")?.toString();
    const lvlRaw = data.get("lvl");
    const lvl = lvlRaw ? Number(lvlRaw) : NaN;

    console.log("Validating Level (lvl):", {
      rawValue: lvlRaw,
      parsedValue: lvl,
      isInteger: Number.isInteger(lvl),
    });

    if (!name || name.trim() === "") return "Name is required.";
    if (!lvlRaw || isNaN(lvl) || !Number.isInteger(lvl) || lvl <= 0) {
      return "Level must be a positive integer.";
    }
    return null;
  }

  // Função para enviar o formulário
  async function createCharacter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const errorMessage = validateForm(data);

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const userId = localStorage.getItem("userId") || "12345";

    // Construção do payload
    const payload = {
      userId,
      name: data.get("name")?.toString(),
      race: data.get("race")?.toString(),
      faction: data.get("faction")?.toString(),
      characterClass: data.get("class")?.toString(), // Corrigido
      lore: data.get("lore")?.toString(),
      lvl: Number(data.get("lvl")),
      vitality: Number(data.get("vitality")) || 5,
      resistance: Number(data.get("resistance")) || 5,
      strength: Number(data.get("strength")) || 5,
      dexterity: Number(data.get("dexterity")) || 5,
      inteligence: Number(data.get("inteligence")) || 5,
      faith: Number(data.get("faith")) || 5,
    };

    console.log("Payload enviado ao backend:", payload);

    try {
      setIsSubmitting(true);
      const response = await api.post("/characters", payload);
      alert(`Character ${response.data.name} created successfully!`);
      closeModal();
    } catch (error: any) {
      console.error("Erro ao criar personagem:", error);
      const message =
        error.response?.data?.error || "Failed to create character. Please try again.";
      alert(message);
    } finally {
      setIsSubmitting(false);
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
            <InputField label="Name" name="name" placeholder="Enter name" />
            <SelectField
              label="Class"
              name="class"
              options={[
                { value: "KNIGHT", label: "Knight" },
                { value: "MAGE", label: "Mage" },
                { value: "ROGUE", label: "Rogue" },
              ]}
            />
            <SelectField
              label="Race"
              name="race"
              options={[
                { value: "HUMAN", label: "Human" },
                { value: "ELF", label: "Elf" },
                { value: "DWARVEN", label: "Dwarven" },
                { value: "DEMON", label: "Demon" },
              ]}
            />
            <SelectField
              label="Faction"
              name="faction"
              options={[
                { value: "SWORDS_OF_LIGHT", label: "Swords of Light" },
                { value: "NECRO_INQUISITION", label: "Necro Inquisition" },
                { value: "DARK_EMPIRE", label: "Dark Empire" },
                { value: "NORTH_KINGDOMS", label: "North Kingdoms" },
                { value: "BROTHERS_OF_BLOOD", label: "Brothers of Blood" },
              ]}
            />
          </div>

          {/* Segunda Coluna */}
          {/* <div className="space-y-2 border border-amber-600 p-4 rounded-lg">
            {[
              { label: "Level", name: "lvl" },
              { label: "Vitality", name: "vitality" },
              { label: "Resistance", name: "resistance" },
              { label: "Strength", name: "strength" },
              { label: "Dexterity", name: "dexterity" },
              { label: "Inteligence", name: "inteligence" },
              { label: "Faith", name: "faith" },
            ].map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                type="number"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            ))}
          </div> */}
<div className="space-y-2 border border-amber-600 p-4 rounded-lg">
  {[
    { label: "Level", name: "lvl" },
    { label: "Vitality", name: "vitality" },
    { label: "Resistance", name: "resistance" },
    { label: "Strength", name: "strength" },
    { label: "Dexterity", name: "dexterity" },
    { label: "Inteligence", name: "inteligence" },
    { label: "Faith", name: "faith" },
  ].map((field) => (
    <div key={field.name} className="flex items-center justify-between">
      <label className="text-lg font-bold text-amber-600">{field.label}:</label>
      <input
        type="number"
        name={field.name}
        placeholder={`Enter ${field.label.toLowerCase()}`}
        className="w-3/4 h-auto bg-black border border-amber-600 text-amber-600 rounded-md p-2"
        style={{
          appearance: "none", // Remove as setas em navegadores modernos
          MozAppearance: "textfield", // Remove as setas no Firefox
          WebkitAppearance: "none", // Remove as setas no Chrome/Safari
        }}
        required
        aria-label={field.label}
        aria-required="true"
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
                placeholder="Describe your character's story..."
                required
              ></textarea>
            </div>
            <div className="border border-amber-600 p-4 rounded-lg flex items-center justify-center">
              <img src="/knight.png" alt="Knight" className="h-64 object-contain" />
            </div>
          </div>

          {/* Botão de Submit */}
          <div className="col-span-3 flex justify-center mt-4">
            <Button type="submit" variant="primary" size="full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}