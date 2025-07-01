import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  BarChart3,
  Calendar,
  Award,
  PlayCircle,
  Settings
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, token, API_BASE_URL } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    recentExams: [],
    progress: [],
    stats: {
      totalExams: 0,
      averageScore: 0,
      timeSpent: 0,
      streak: 0
    }
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch recent exams
      const examsResponse = await fetch(`${API_BASE_URL}/exams?per_page=5`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Fetch progress data
      const progressResponse = await fetch(`${API_BASE_URL}/progress`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (examsResponse.ok && progressResponse.ok) {
        const examsData = await examsResponse.json();
        const progressData = await progressResponse.json();

        // Calculate stats
        const totalExams = examsData.total || 0;
        const completedExams = examsData.exams?.filter(exam => exam.status === 'completed') || [];
        const averageScore = completedExams.length > 0 
          ? completedExams.reduce((sum, exam) => sum + (exam.percentage_score || 0), 0) / completedExams.length
          : 0;

        setDashboardData({
          recentExams: examsData.exams || [],
          progress: progressData.progress || [],
          stats: {
            totalExams,
            averageScore: Math.round(averageScore),
            timeSpent: completedExams.reduce((sum, exam) => sum + (exam.time_taken_minutes || 0), 0),
            streak: 3 // Placeholder for streak calculation
          }
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 3.5) return 'text-green-600';
    if (score >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score) => {
    if (score >= 3.5) return 'default';
    if (score >= 2.5) return 'secondary';
    return 'destructive';
  };

  const getProficiencyLevel = (score) => {
    if (score >= 3.5) return 'Advanced';
    if (score >= 2.5) return 'Intermediate';
    return 'Beginner';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.first_name || user?.username}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Continue your vascular surgery exam preparation journey
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <Link to="/exam/new" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Start New Exam</h3>
                  <p className="text-sm text-muted-foreground">Create a practice exam</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <Link to="/question-bank" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Question Bank</h3>
                  <p className="text-sm text-muted-foreground">Browse questions</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <Link to="/progress" className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">View Progress</h3>
                  <p className="text-sm text-muted-foreground">Track performance</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Exams</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardData.stats.totalExams}</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardData.stats.averageScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Time Spent</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardData.stats.timeSpent}h</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardData.stats.streak} days</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Exams
                <Link to="/exams">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </CardTitle>
              <CardDescription>
                Your latest practice sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dashboardData.recentExams.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.recentExams.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <PlayCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{exam.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(exam.created_at).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{exam.num_questions} questions</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={exam.status === 'completed' ? 'default' : 'secondary'}>
                          {exam.status}
                        </Badge>
                        {exam.status === 'completed' && exam.percentage_score && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {Math.round(exam.percentage_score)}%
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PlayCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No exams yet</p>
                  <Link to="/exam/new">
                    <Button className="mt-4">Start Your First Exam</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress by Topic */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Progress by Topic
                <Link to="/progress">
                  <Button variant="ghost" size="sm">View Details</Button>
                </Link>
              </CardTitle>
              <CardDescription>
                Your performance across different topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dashboardData.progress.length > 0 ? (
                <div className="space-y-6">
                  {dashboardData.progress.slice(0, 5).map((topic) => (
                    <div key={topic.topic} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{topic.topic}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getScoreBadgeVariant(topic.average_score)}>
                            {getProficiencyLevel(topic.average_score)}
                          </Badge>
                          <span className={`text-sm font-medium ${getScoreColor(topic.average_score)}`}>
                            {topic.average_score.toFixed(1)}/4.0
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={(topic.average_score / 4) * 100} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {topic.questions_attempted} questions attempted
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No progress data yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete some exams to see your progress
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Subscription Status */}
        {user?.subscription_status !== 'active' && (
          <Card className="mt-8 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Upgrade to Pro</h3>
                  <p className="text-muted-foreground">
                    Unlock unlimited exams, advanced analytics, and priority support
                  </p>
                </div>
                <Link to="/subscription">
                  <Button>Upgrade Now</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

