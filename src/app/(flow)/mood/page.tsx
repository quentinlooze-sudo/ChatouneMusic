"use client";

import { useRouter } from "next/navigation";
import { useMoodContext } from "@/lib/MoodContext";
import NavBar from "@/components/NavBar";
import ProgressBar from "@/components/ui/ProgressBar";
import TextInput from "@/components/ui/TextInput";
import MoodSelector from "@/components/MoodCard";
import EnergySlider from "@/components/ui/EnergySlider";
import Button from "@/components/ui/Button";

export default function MoodPage() {
  const { partner1, partner2, setPartner1, setPartner2, step, setStep } =
    useMoodContext();
  const router = useRouter();

  const currentPartner = step === 1 ? partner1 : partner2;
  const setCurrentPartner = step === 1 ? setPartner1 : setPartner2;

  const canProceed =
    currentPartner.name.trim() !== "" && currentPartner.mood !== null;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setStep(3);
      router.push("/fusion");
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar showBack onBack={handleBack} />

      <div className="mt-2 mb-6">
        <ProgressBar step={step} />
      </div>

      <main
        id="main-content"
        key={step}
        className="flex-1 flex flex-col items-center px-4 md:px-6 max-w-narrow mx-auto w-full animate-fade-in-up motion-reduce:animate-none"
      >
        <h1 className="sr-only">Sélection d&apos;humeur — Partenaire {step}</h1>
        <div className="bg-white/80 backdrop-blur-card rounded-full px-4 py-2 text-caption font-bold text-primary mb-6 shadow-card">
          Partenaire {step} sur 2
        </div>

        <div className="w-full mb-6">
          <p className="text-sm font-bold text-text-main mb-2">Ton prénom</p>
          <TextInput
            id={`partner-${step}-name`}
            label={`Prénom du partenaire ${step}`}
            placeholder={step === 1 ? "Ex : Sarah" : "Ex : Thomas"}
            value={currentPartner.name}
            onChange={(value) =>
              setCurrentPartner({ ...currentPartner, name: value })
            }
            maxLength={20}
          />
        </div>

        <p className="text-sm font-bold text-text-main mb-3 self-start">
          Comment tu te sens ?
        </p>
        <div className="w-full mb-6">
          <MoodSelector
            selected={currentPartner.mood}
            onSelect={(mood) =>
              setCurrentPartner({ ...currentPartner, mood })
            }
          />
        </div>

        <div className="w-full mb-8">
          <p className="text-sm font-bold text-text-main mb-2">
            Niveau d&apos;énergie
          </p>
          <EnergySlider
            value={currentPartner.energy}
            onChange={(energy) =>
              setCurrentPartner({ ...currentPartner, energy })
            }
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!canProceed}
          ariaLabel={
            !canProceed
              ? "Remplis ton prénom et choisis une humeur pour continuer"
              : undefined
          }
          className="w-full md:w-auto"
        >
          {step === 1 ? "Au suivant ! →" : "Mixer nos humeurs 🎵"}
        </Button>
      </main>
    </div>
  );
}
