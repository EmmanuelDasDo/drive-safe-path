import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BookOpen, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-truck.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Séraphim E-Learning</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/videos">
              <Button variant="ghost">Vidéos</Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost">Connexion</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-12">
        {/* Title Section Above Image */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
            La sécurité, c'est l'affaire<br />de tous les conducteurs
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Découvrez une formation interactive dédiée aux professionnels du transport routier
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-[60vh] shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-card/40 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex items-end p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/assessment">
                <Button variant="hero" size="lg">
                  Faire mon bilan de compétences
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/journey">
                <Button variant="outline" size="lg" className="bg-card/80 backdrop-blur-sm hover:bg-card">
                  Découvrir la formation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Une formation complète et interactive
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Parcours progressif</h3>
              <p className="text-muted-foreground">
                Progressez à travers 5 modules de formation en traversant les villes de France
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Suivi personnalisé</h3>
              <p className="text-muted-foreground">
                Suivez votre progression en temps réel avec des statistiques détaillées
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Attestation certifiée</h3>
              <p className="text-muted-foreground">
                Obtenez votre attestation de formation officielle à la fin du parcours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à commencer votre formation ?
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Évaluez d'abord vos compétences avec notre bilan personnalisé
          </p>
          <Link to="/assessment">
            <Button variant="hero" size="lg">
              Démarrer le bilan
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2025 Transports Sécurité E-Learning – by Agence Séraphim.</p>
          <p className="mt-2">Tous droits réservés – Plateforme de formation dédiée au transport routier.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
