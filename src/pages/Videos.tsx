import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Home as HomeIcon, 
  Search, 
  Play, 
  CheckCircle2,
  Clock,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

interface Video {
  id: string;
  title: string;
  duration: string;
  category: string;
  thumbnail: string;
  description: string;
  watched: boolean;
  recommended?: boolean;
}

const categories = [
  "Tous",
  "Sécurité",
  "Alcool",
  "Vitesse",
  "Téléphone",
  "Statistiques"
];

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Les fondamentaux de la sécurité routière",
    duration: "12:30",
    category: "Sécurité",
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=450&fit=crop",
    description: "Découvrez les bases essentielles de la sécurité en tant que conducteur professionnel",
    watched: true,
    recommended: false
  },
  {
    id: "2",
    title: "Bien gérer la fatigue sur la route",
    duration: "15:45",
    category: "Sécurité",
    thumbnail: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=450&fit=crop",
    description: "Techniques et conseils pour rester vigilant lors de longs trajets",
    watched: false,
    recommended: true
  },
  {
    id: "3",
    title: "Alcool et conduite : les vrais chiffres",
    duration: "10:20",
    category: "Alcool",
    thumbnail: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&h=450&fit=crop",
    description: "Comprendre l'impact de l'alcool sur vos capacités de conduite",
    watched: false,
    recommended: false
  },
  {
    id: "4",
    title: "Les effets de l'alcool sur le temps de réaction",
    duration: "8:15",
    category: "Alcool",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=450&fit=crop",
    description: "Analyse scientifique des effets de l'alcool sur la conduite",
    watched: false,
    recommended: false
  },
  {
    id: "5",
    title: "Adapter sa vitesse aux conditions",
    duration: "11:00",
    category: "Vitesse",
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=450&fit=crop",
    description: "Comprendre les distances de freinage et adapter sa vitesse",
    watched: false,
    recommended: false
  },
  {
    id: "6",
    title: "Les distances de sécurité expliquées",
    duration: "9:30",
    category: "Vitesse",
    thumbnail: "https://images.unsplash.com/photo-1502877828070-33a5ca75f9e4?w=800&h=450&fit=crop",
    description: "Calcul et respect des distances de sécurité",
    watched: false,
    recommended: false
  },
  {
    id: "7",
    title: "Téléphone au volant : les dangers cachés",
    duration: "13:20",
    category: "Téléphone",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    description: "Les distractions au volant et leurs conséquences",
    watched: false,
    recommended: false
  },
  {
    id: "8",
    title: "Statistiques d'accidents en France",
    duration: "14:45",
    category: "Statistiques",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    description: "Analyse des principales causes d'accidents de la route",
    watched: false,
    recommended: false
  },
  {
    id: "9",
    title: "Les angles morts du poids lourd",
    duration: "10:50",
    category: "Sécurité",
    thumbnail: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=450&fit=crop",
    description: "Identifier et gérer les angles morts d'un poids lourd",
    watched: false,
    recommended: false
  }
];

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState(mockVideos);

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === "Tous" || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recommendedVideos = videos.filter((v) => v.recommended);

  const toggleWatched = (videoId: string) => {
    setVideos(videos.map((v) => 
      v.id === videoId ? { ...v, watched: !v.watched } : v
    ));
  };

  return (
    <div className="min-h-screen gradient-industrial">
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
            <h1 className="text-2xl font-bold">Vidéos éducatives</h1>
            <Link to="/dashboard">
              <Button variant="outline">Mon tableau de bord</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Recommended Section */}
        {recommendedVideos.length > 0 && (
          <Card className="p-6 mb-8 gradient-red text-primary-foreground">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Recommandé pour vous</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendedVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div
                      className="h-32 md:h-auto bg-cover bg-center"
                      style={{ backgroundImage: `url(${video.thumbnail})` }}
                    />
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold mb-2 text-foreground">{video.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {video.duration}
                        </span>
                        <Button size="sm" variant="default">
                          <Play className="mr-2 h-4 w-4" />
                          Regarder
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une vidéo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover-lift group">
                <div className="relative">
                  <div
                    className="h-48 bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="lg" variant="hero" className="shadow-xl">
                        <Play className="mr-2 h-5 w-5" />
                        Regarder
                      </Button>
                    </div>
                    {video.watched && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-500 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Vue
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{video.category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {video.duration}
                    </span>
                  </div>

                  <h3 className="font-bold mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Regarder
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleWatched(video.id)}
                    >
                      {video.watched ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Aucune vidéo trouvée</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Videos;
