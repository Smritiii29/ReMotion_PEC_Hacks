import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Zap, Activity, Brain, ThumbsUp } from "lucide-react";

interface PostSessionFeedbackProps {
  onComplete: () => void;
}

interface FeedbackQuestion {
  id: string;
  icon: React.ReactNode;
  question: string;
  options: { value: number; label: string; emoji?: string }[];
}

const questions: FeedbackQuestion[] = [
  {
    id: "pain",
    icon: <Heart className="w-6 h-6" />,
    question: "How was your pain level during the session?",
    options: [
      { value: 1, label: "No pain", emoji: "😊" },
      { value: 2, label: "Mild discomfort", emoji: "🙂" },
      { value: 3, label: "Moderate pain", emoji: "😐" },
      { value: 4, label: "Significant pain", emoji: "😟" },
      { value: 5, label: "Severe pain", emoji: "😣" },
    ],
  },
  {
    id: "difficulty",
    icon: <Zap className="w-6 h-6" />,
    question: "How difficult was this exercise for you?",
    options: [
      { value: 1, label: "Too easy", emoji: "💪" },
      { value: 2, label: "Just right", emoji: "✨" },
      { value: 3, label: "Challenging", emoji: "🔥" },
      { value: 4, label: "Very hard", emoji: "😤" },
      { value: 5, label: "Too difficult", emoji: "🆘" },
    ],
  },
  {
    id: "fatigue",
    icon: <Activity className="w-6 h-6" />,
    question: "How fatigued do you feel now?",
    options: [
      { value: 1, label: "Energized", emoji: "⚡" },
      { value: 2, label: "Slightly tired", emoji: "😌" },
      { value: 3, label: "Moderately tired", emoji: "😪" },
      { value: 4, label: "Very tired", emoji: "😴" },
      { value: 5, label: "Exhausted", emoji: "💤" },
    ],
  },
  {
    id: "confidence",
    icon: <Brain className="w-6 h-6" />,
    question: "How confident did you feel performing the movements?",
    options: [
      { value: 1, label: "Very confident", emoji: "🌟" },
      { value: 2, label: "Somewhat confident", emoji: "👍" },
      { value: 3, label: "Neutral", emoji: "🤷" },
      { value: 4, label: "Unsure", emoji: "🤔" },
      { value: 5, label: "Not confident", emoji: "😕" },
    ],
  },
  {
    id: "overall",
    icon: <ThumbsUp className="w-6 h-6" />,
    question: "Overall, how was this session?",
    options: [
      { value: 1, label: "Excellent", emoji: "🎉" },
      { value: 2, label: "Good", emoji: "😊" },
      { value: 3, label: "Okay", emoji: "👌" },
      { value: 4, label: "Could be better", emoji: "😕" },
      { value: 5, label: "Needs improvement", emoji: "💭" },
    ],
  },
];

const PostSessionFeedback = ({ onComplete }: PostSessionFeedbackProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
    
    if (isLastQuestion) {
      // Save feedback and complete
      console.log("Feedback submitted:", { ...answers, [question.id]: value });
      onComplete();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Session Complete! 🎉</h1>
          <p className="text-muted-foreground">
            Help us understand how you felt during this session
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-mint transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-3xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-mint/20 rounded-xl text-mint">
              {question.icon}
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 hover:border-mint hover:bg-mint/5 ${
                  answers[question.id] === option.value
                    ? 'border-mint bg-mint/10'
                    : 'border-border bg-background'
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-foreground font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skip option */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={onComplete}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip feedback
          </Button>
        </div>

        {/* Reassuring message */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Your feedback helps us personalize your recovery journey 💙
        </p>
      </div>
    </div>
  );
};

export default PostSessionFeedback;
