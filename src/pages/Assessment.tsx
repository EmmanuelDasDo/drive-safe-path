import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ArrowRight, Home as HomeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quelle est la distance de sécurité minimale recommandée sur autoroute ?",
    options: ["1 seconde", "2 secondes", "3 secondes", "4 secondes"],
    correctAnswer: 1,
    category: "Sécurité"
  },
  {
    id: 2,
    question: "Le taux d'alcoolémie maximal autorisé pour un conducteur professionnel est de :",
    options: ["0,5 g/L", "0,2 g/L", "0,0 g/L", "0,8 g/L"],
    correctAnswer: 1,
    category: "Alcool"
  },
  {
    id: 3,
    question: "Sur route nationale, la vitesse maximale pour un poids lourd de plus de 12 tonnes est de :",
    options: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"],
    correctAnswer: 0,
    category: "Vitesse"
  },
  {
    id: 4,
    question: "L'utilisation du téléphone portable au volant est :",
    options: ["Autorisée avec kit mains-libres", "Totalement interdite", "Autorisée à l'arrêt", "Autorisée en Bluetooth"],
    correctAnswer: 1,
    category: "Téléphone"
  },
  {
    id: 5,
    question: "Combien d'heures de repos continu sont obligatoires après 4h30 de conduite ?",
    options: ["30 minutes", "45 minutes", "1 heure", "2 heures"],
    correctAnswer: 1,
    category: "Réglementation"
  },
  {
    id: 6,
    question: "Les angles morts d'un poids lourd peuvent s'étendre jusqu'à :",
    options: ["2 mètres", "5 mètres", "10 mètres", "15 mètres"],
    correctAnswer: 2,
    category: "Sécurité"
  },
  {
    id: 7,
    question: "La fatigue est responsable de quel pourcentage d'accidents mortels ?",
    options: ["10%", "20%", "30%", "40%"],
    correctAnswer: 2,
    category: "Sécurité"
  },
  {
    id: 8,
    question: "Le temps de réaction moyen d'un conducteur est de :",
    options: ["0,5 seconde", "1 seconde", "1,5 seconde", "2 secondes"],
    correctAnswer: 1,
    category: "Vitesse"
  },
  {
    id: 9,
    question: "Quelle est la durée maximale de conduite quotidienne autorisée ?",
    options: ["8 heures", "9 heures", "10 heures", "12 heures"],
    correctAnswer: 1,
    category: "Réglementation"
  },
  {
    id: 10,
    question: "L'alcool multiplie par combien le risque d'accident ?",
    options: ["2", "5", "8", "10"],
    correctAnswer: 2,
    category: "Alcool"
  }
];

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
  };

  const getRecommendation = (score: number) => {
    if (score >= 8) {
      return {
        message: "Excellent ! Vous avez un très bon niveau de connaissance en sécurité routière.",
        suggestion: "Commencez par le module Statistiques pour compléter vos connaissances."
      };
    } else if (score >= 6) {
      return {
        message: "Bon niveau ! Quelques révisions vous permettront d'atteindre l'excellence.",
        suggestion: "Nous vous recommandons de commencer par le module Alcool et prévention."
      };
    } else if (score >= 4) {
      return {
        message: "Niveau moyen. Une formation complète vous sera bénéfique.",
        suggestion: "Commencez par le module Sécurité de base pour renforcer vos fondamentaux."
      };
    } else {
      return {
        message: "Des efforts sont nécessaires. Ne vous inquiétez pas, notre formation est là pour vous aider.",
        suggestion: "Nous vous recommandons de suivre l'intégralité du parcours de formation."
      };
    }
  };

  if (showResults) {
    const score = calculateScore();
    const recommendation = getRecommendation(score);

    return (
      <div className="min-h-screen gradient-blue-subtle py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <HomeIcon className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>

          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Résultats du bilan</h1>
              <div className="text-6xl font-bold text-primary mb-4">{score}/10</div>
              <Progress value={(score / 10) * 100} className="h-3 mb-6" />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Votre évaluation</h2>
              <p className="text-lg mb-2">{recommendation.message}</p>
              <p className="text-muted-foreground">{recommendation.suggestion}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Détail des réponses</h3>
              <div className="space-y-4">
                {questions.map((q, index) => {
                  const isCorrect = selectedAnswers[index] === q.correctAnswer;
                  return (
                    <div key={q.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                      {isCorrect ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium mb-1">Question {index + 1}: {q.question}</p>
                        <p className="text-sm text-muted-foreground">
                          Catégorie: {q.category}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/journey")} size="lg" variant="hero">
                Commencer la formation
                <ArrowRight className="ml-2" />
              </Button>
              <Button 
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers([]);
                  setShowResults(false);
                }} 
                variant="outline" 
                size="lg"
              >
                Refaire le bilan
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen gradient-blue-subtle py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <HomeIcon className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>

        <Card className="p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Bilan de compétences</h1>
              <span className="text-muted-foreground">
                Question {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {question.category}
            </div>
            <h2 className="text-xl font-bold mb-6">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
            >
              Précédent
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {currentQuestion === questions.length - 1 ? "Voir les résultats" : "Suivant"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
