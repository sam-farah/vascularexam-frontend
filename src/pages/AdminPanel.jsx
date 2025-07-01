import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileQuestion, 
  BookOpen, 
  BarChart3, 
  Settings,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const { token, API_BASE_URL } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    recent_activity: {}
  });
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    fetchPendingQuestions();
    fetchUsers();
    fetchKnowledgeBase();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingQuestions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/questions/pending`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPendingQuestions(data.questions || []);
      }
    } catch (error) {
      console.error('Error fetching pending questions:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchKnowledgeBase = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/knowledge-base`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setKnowledgeBase(data.entries || []);
      }
    } catch (error) {
      console.error('Error fetching knowledge base:', error);
    }
  };

  const reviewQuestion = async (questionId, action, feedback = '') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/questions/${questionId}/review`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, feedback }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Question ${action}d successfully`,
        });
        fetchPendingQuestions();
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Failed to review question',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Network error occurred',
        variant: 'destructive',
      });
    }
  };

  const syncKnowledgeBase = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/knowledge-base/sync`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Success',
          description: `Synced ${data.synced_entries} entries from Notion`,
        });
        fetchKnowledgeBase();
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Failed to sync knowledge base',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Network error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage users, questions, and system settings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">
                    {dashboardData.stats.users?.total || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <p className="text-2xl font-bold text-foreground">
                    {dashboardData.stats.questions?.total || 0}
                  </p>
                </div>
                <FileQuestion className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-foreground">
                    {dashboardData.stats.questions?.pending_review || 0}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">KB Entries</p>
                  <p className="text-2xl font-bold text-foreground">
                    {dashboardData.stats.knowledge_base?.entries || 0}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Questions Tab */}
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Pending Questions Review</CardTitle>
                <CardDescription>
                  Review and approve user-submitted questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {pendingQuestions.map((question) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-foreground">
                            {question.question_text}
                          </h4>
                          <Badge variant="secondary">{question.topic}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Submitted by: {question.created_by_username}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Model Answer: {question.model_answer}
                        </p>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => reviewQuestion(question.id, 'approve')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => reviewQuestion(question.id, 'reject')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No pending questions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {users.length > 0 ? (
                  <div className="space-y-4">
                    {users.slice(0, 10).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-foreground">
                            {user.first_name} {user.last_name}
                          </h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex space-x-2 mt-1">
                            <Badge variant={user.is_active ? 'default' : 'secondary'}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            {user.is_admin && (
                              <Badge variant="destructive">Admin</Badge>
                            )}
                            <Badge variant="outline">
                              {user.subscription_status || 'Free'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No users found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Knowledge Base Tab */}
          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Knowledge Base Management</CardTitle>
                    <CardDescription>
                      Manage content from Notion database
                    </CardDescription>
                  </div>
                  <Button onClick={syncKnowledgeBase} disabled={loading}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync from Notion
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {knowledgeBase.length > 0 ? (
                  <div className="space-y-4">
                    {knowledgeBase.slice(0, 10).map((entry) => (
                      <div key={entry.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-foreground">{entry.title}</h4>
                          <Badge variant="outline">{entry.topic}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {entry.content?.substring(0, 200)}...
                        </p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>Updated: {new Date(entry.updated_at).toLocaleDateString()}</span>
                          <Badge variant={entry.is_active ? 'default' : 'secondary'}>
                            {entry.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No knowledge base entries</p>
                    <Button onClick={syncKnowledgeBase} className="mt-4">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync from Notion
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>
                  Usage statistics and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">User Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Active Users:</span>
                        <span className="text-sm font-medium">
                          {dashboardData.stats.users?.active || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Premium Users:</span>
                        <span className="text-sm font-medium">
                          {dashboardData.stats.users?.premium || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Exam Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Exams:</span>
                        <span className="text-sm font-medium">
                          {dashboardData.stats.exams?.total || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Completed:</span>
                        <span className="text-sm font-medium">
                          {dashboardData.stats.exams?.completed || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;

