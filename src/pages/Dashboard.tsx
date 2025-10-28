import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Home as HomeIcon, 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  BookOpen,
  Trophy,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - will be replaced with real data later
  const userData = {
    name: "Jean Dupont",
    progression: 20,
    modulesCompleted: 1,
    totalModules: 5,
    averageScore: 85,
    totalTime: "2h 30min",
    badges: [
      { id: 1, name: "Premier pas", icon: Star, earned: true },
      { id: 2, name: "Expert sécurité", icon: Award, earned: false },
      { id: 3, name: "Conduite responsable", icon: Trophy, earned: false }
    ],
    recentModules: [
      { name: "Lille - Sécurité de base", score: 85, completed: true },
      { name: "Paris - Alcool & prévention", score: null, completed: false },
      { name: "Orléans - Vitesse & distances", score: null, completed: false }
    ]
  };

  return (
    <div className="min-h-screen gradient-blue-subtle">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost">
                <HomeIcon className="mr-2 h-4 w-4" />
                Accueil
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Mon tableau de bord</h1>
            <Link to="/journey">
              <Button variant="default">Continuer la formation</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bonjour, {userData.name} !</h2>
          <p className="text-muted-foreground">Voici un aperçu de votre progression</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <Badge variant="secondary">En cours</Badge>
            </div>
            <div className="text-3xl font-bold mb-2">{userData.progression}%</div>
            <p className="text-sm text-muted-foreground">Progression globale</p>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {userData.modulesCompleted}/{userData.totalModules}
            </div>
            <p className="text-sm text-muted-foreground">Modules terminés</p>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{userData.averageScore}%</div>
            <p className="text-sm text-muted-foreground">Score moyen</p>
          </Card>

          <Card className="p-6 hover-lift">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{userData.totalTime}</div>
            <p className="text-sm text-muted-foreground">Temps total</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Modules Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6">Progression par module</h3>
              <div className="space-y-6">
                {userData.recentModules.map((module, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{module.name}</span>
                      {module.completed ? (
                        <Badge className="bg-green-500">Complété - {module.score}%</Badge>
                      ) : (
                        <Badge variant="secondary">En attente</Badge>
                      )}
                    </div>
                    <Progress 
                      value={module.completed ? 100 : 0} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6">Recommandations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 border-l-4 border-primary rounded">
                  <p className="font-medium mb-1">Module suivant suggéré</p>
                  <p className="text-sm text-muted-foreground">
                    Paris - Alcool & prévention
                  </p>
                </div>
                <div className="p-4 bg-accent-blue/5 border-l-4 border-accent-blue rounded">
                  <p className="font-medium mb-1">Conseil du jour</p>
                  <p className="text-sm text-muted-foreground">
                    La distance de sécurité doit être adaptée aux conditions météorologiques
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Badges & Achievements */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Badges et récompenses</h3>
              <div className="space-y-4">
                {userData.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      badge.earned ? "bg-primary/10" : "bg-muted/30"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        badge.earned ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <badge.icon
                        className={`h-6 w-6 ${
                          badge.earned ? "text-primary-foreground" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${!badge.earned && "text-muted-foreground"}`}>
                        {badge.name}
                      </p>
                      {badge.earned && (
                        <p className="text-xs text-muted-foreground">Obtenu</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 gradient-blue text-primary-foreground">
              <h3 className="text-xl font-bold mb-4">Continuez sur votre lancée !</h3>
              <p className="mb-6 opacity-90">
                Complétez les modules restants pour obtenir votre attestation
              </p>
              <Link to="/journey">
                <Button variant="hero" className="w-full bg-background text-primary hover:bg-background/90">
                  Reprendre la formation
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
