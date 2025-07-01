import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Users, 
  Target,
  Brain,
  Award,
  Calendar,
  BarChart3,
  PlayCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const SimpleDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Exams Taken",
      value: "12",
      change: "+2 from last week",
      icon: BookOpen,
      color: "text-blue-400"
    },
    {
      title: "Average Score",
      value: "3.2/4",
      change: "+0.3 improvement",
      icon: TrendingUp,
      color: "text-green-400"
    },
    {
      title: "Study Time",
      value: "24h",
      change: "This month",
      icon: Clock,
      color: "text-purple-400"
    },
    {
      title: "Rank",
      value: "#47",
      change: "Out of 1,234 users",
      icon: Award,
      color: "text-yellow-400"
    }
  ];

  const topicProgress = [
    { topic: "Aortic Aneurysms", score: 3.8, progress: 95, color: "bg-green-500" },
    { topic: "Carotid Disease", score: 3.2, progress: 80, color: "bg-blue-500" },
    { topic: "Peripheral Arterial Disease", score: 2.9, progress: 72, color: "bg-yellow-500" },
    { topic: "Venous Disease", score: 2.4, progress: 60, color: "bg-orange-500" },
    { topic: "Trauma", score: 2.1, progress: 52, color: "bg-red-500" }
  ];

  const recentExams = [
    { id: 1, title: "Aortic Pathology Focus", score: "3.4/4", date: "2 days ago", questions: 15 },
    { id: 2, title: "General Practice Exam", score: "3.1/4", date: "5 days ago", questions: 20 },
    { id: 3, title: "Carotid Disease Deep Dive", score: "3.7/4", date: "1 week ago", questions: 12 }
  ];

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="gradient-text">{user?.firstName || 'Demo'}</span>!
            </h1>
            <p className="text-muted-foreground">
              Ready to continue your vascular surgery exam preparation?
            </p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Pro Member
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="glass-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <PlayCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Start New Exam</h3>
                  <p className="text-muted-foreground text-sm">Take a practice exam with AI-generated questions</p>
                </div>
                <Button className="manus-button">
                  Start Practice Exam
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Review Progress</h3>
                  <p className="text-muted-foreground text-sm">View your performance analytics and improvement areas</p>
                </div>
                <Button variant="outline" className="manus-button-secondary">
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topic Progress */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Topic Performance
                </CardTitle>
                <CardDescription>
                  Your performance across different vascular surgery topics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {topicProgress.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{topic.topic}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {topic.score}/4
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {topic.progress}%
                        </span>
                      </div>
                    </div>
                    <Progress value={topic.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Recent Exams
                </CardTitle>
                <CardDescription>
                  Your latest practice sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentExams.map((exam) => (
                  <div key={exam.id} className="p-4 bg-background/30 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{exam.title}</h4>
                      <Badge className="bg-primary/10 text-primary text-xs">
                        {exam.score}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{exam.questions} questions</span>
                      <span>{exam.date}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievement Card */}
            <Card className="glass-card mt-6">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">🎉 Authentication Working!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Congratulations! You have successfully logged into VascularExam.ai. The authentication system is now working properly.
                </p>
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  System Operational
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Message */}
        <Card className="glass-card mt-8 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-400 mb-1">Welcome back!</h3>
                <p className="text-muted-foreground">
                  You have been successfully logged in. This dashboard demonstrates the core functionality of the platform including user management, progress tracking, and exam preparation features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleDashboard;

