import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Lock, CheckCircle2, Home as HomeIcon, Play } from "lucide-react";
import { Link } from "react-router-dom";

interface City {
  id: string;
  name: string;
  module: string;
  description: string;
  position: { top: string; left: string };
  completed: boolean;
  locked: boolean;
  icon: typeof MapPin;
}

const cities: City[] = [
  {
    id: "lille",
    name: "Lille",
    module: "Sécurité de base",
    description: "Maîtrisez les fondamentaux de la sécurité routière",
    position: { top: "15%", left: "50%" },
    completed: false,
    locked: false,
    icon: MapPin
  },
  {
    id: "paris",
    name: "Paris",
    module: "Alcool & prévention",
    description: "Comprendre les risques liés à l'alcool au volant",
    position: { top: "25%", left: "48%" },
    completed: false,
    locked: true,
    icon: MapPin
  },
  {
    id: "orleans",
    name: "Orléans",
    module: "Vitesse & distances",
    description: "Adapter sa vitesse et respecter les distances de sécurité",
    position: { top: "35%", left: "45%" },
    completed: false,
    locked: true,
    icon: MapPin
  },
  {
    id: "toulouse",
    name: "Toulouse",
    module: "Téléphone & distractions",
    description: "Éliminer les sources de distraction au volant",
    position: { top: "60%", left: "40%" },
    completed: false,
    locked: true,
    icon: MapPin
  },
  {
    id: "lyon",
    name: "Lyon",
    module: "Statistiques & accidentologie",
    description: "Analyser les causes d'accidents et les prévenir",
    position: { top: "50%", left: "55%" },
    completed: false,
    locked: true,
    icon: MapPin
  }
];

const Journey = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [userCities] = useState(cities);

  return (
    <div className="min-h-screen gradient-blue-subtle">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost">
                <HomeIcon className="mr-2 h-4 w-4" />
                Accueil
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Parcours de formation</h1>
            <Link to="/dashboard">
              <Button variant="outline">Mon tableau de bord</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="relative">
            <Card className="p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-center">Carte de France</h2>
              
              <div className="relative aspect-square bg-gradient-to-br from-accent-blue/10 to-primary/5 rounded-lg overflow-hidden">
                {/* SVG Map Background */}
                <svg viewBox="0 0 400 500" className="w-full h-full opacity-20">
                  <path
                    d="M200,50 L250,100 L280,150 L270,250 L300,350 L250,450 L150,450 L100,350 L120,250 L100,150 L150,100 Z"
                    fill="currentColor"
                    className="text-primary"
                  />
                </svg>

                {/* Cities */}
                {userCities.map((city, index) => (
                  <div
                    key={city.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: city.position.top, left: city.position.left }}
                  >
                    <button
                      onClick={() => !city.locked && setSelectedCity(city)}
                      disabled={city.locked}
                      className={`relative group ${!city.locked && 'hover:scale-110'} transition-transform duration-300`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                          city.completed
                            ? "bg-green-500"
                            : city.locked
                            ? "bg-muted"
                            : "bg-primary animate-pulse"
                        }`}
                      >
                        {city.completed ? (
                          <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                        ) : city.locked ? (
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        ) : (
                          <MapPin className="h-8 w-8 text-primary-foreground" />
                        )}
                      </div>

                      {/* Connection Line to Next City */}
                      {index < userCities.length - 1 && (
                        <div
                          className={`absolute top-full left-1/2 w-0.5 h-12 ${
                            city.completed ? "bg-green-500" : "bg-border"
                          }`}
                          style={{
                            transform: "rotate(45deg)",
                            transformOrigin: "top"
                          }}
                        />
                      )}

                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-sm font-medium bg-card px-2 py-1 rounded shadow">
                          {city.name}
                        </span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  <span>Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span>Complété</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-muted" />
                  <span>Verrouillé</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Module Details Section */}
          <div>
            {selectedCity ? (
              <Card className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <Badge className="mb-3">{selectedCity.name}</Badge>
                    <h2 className="text-3xl font-bold mb-2">{selectedCity.module}</h2>
                  </div>
                  {selectedCity.completed && (
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  )}
                </div>

                <p className="text-lg text-muted-foreground mb-8">
                  {selectedCity.description}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                    <Play className="h-5 w-5 text-primary" />
                    <span>Vidéo de formation interactive</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                    <Play className="h-5 w-5 text-primary" />
                    <span>Support de cours téléchargeable</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                    <Play className="h-5 w-5 text-primary" />
                    <span>Quiz de validation (seuil: 80%)</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" variant="hero">
                  Commencer le module
                </Button>

                {selectedCity.locked && (
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Complétez le module précédent pour débloquer celui-ci
                  </p>
                )}
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Sélectionnez une ville</h2>
                <p className="text-muted-foreground">
                  Cliquez sur une ville disponible sur la carte pour voir les détails du module
                </p>
              </Card>
            )}

            {/* Progress Overview */}
            <Card className="p-6 mt-6">
              <h3 className="text-xl font-bold mb-4">Votre progression</h3>
              <div className="space-y-3">
                {userCities.map((city) => (
                  <div key={city.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {city.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : city.locked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-primary" />
                      )}
                      <span className={city.locked ? "text-muted-foreground" : ""}>
                        {city.name}
                      </span>
                    </div>
                    <Badge variant={city.completed ? "default" : "secondary"}>
                      {city.completed ? "Complété" : city.locked ? "Verrouillé" : "En cours"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
