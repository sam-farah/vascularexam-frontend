import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
Users,
FileQuestion,
BookOpen,
BarChart3,
Settings,
CheckCircle,
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileQuestion, BookOpen, BarChart3 } from 'lucide-react';

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuestions: 0,
    pendingReview: 0,
    kbEntries: 0
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Badge variant="secondary">VascularExam.ai</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuestions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReview}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KB Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.kbEntries}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Question Management</CardTitle>
              <CardDescription>
                Manage exam questions and review submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No questions yet</h3>
                <p className="text-muted-foreground mb-4">
                  Question management features coming soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
<Card>
<CardHeader>
<CardTitle>User Management</CardTitle>
<CardDescription>
Manage user accounts and permissions
</CardDescription>
</CardHeader>
<CardContent>
<div className="text-center py-8">
<Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
<h3 className="text-lg font-semibold mb-2">No users found</h3>
<p className="text-muted-foreground">
User accounts will appear here once people register.
</p>
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContent value="knowledge">
<Card>
<CardHeader>
<CardTitle>Knowledge Base Management</CardTitle>
<CardDescription>
Manage educational content and resources
</CardDescription>
</CardHeader>
<CardContent>
<div className="text-center py-8">
<BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
<h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
<p className="text-muted-foreground">
Knowledge base management features coming soon.
</p>
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContent value="analytics">
<Card>
<CardHeader>
<CardTitle>Analytics & Reports</CardTitle>
<CardDescription>
View system analytics and generate reports
</CardDescription>
</CardHeader>
<CardContent>
<div className="text-center py-8">
<BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
<h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
<p className="text-muted-foreground">
Analytics and reporting features coming soon.
</p>
</div>
</CardContent>
</Card>
</TabsContent>
</Tabs>
</div>
);
};

export default AdminPanel;
import { Users, FileQuestion, BookOpen, BarChart3 } from 'lucide-react';

const AdminPanel = () => {
const [stats, setStats] = useState({
totalUsers: 0,
totalQuestions: 0,
pendingReview: 0,
kbEntries: 0
});

return (
<div className="container mx-auto p-6 space-y-6">
<div className="flex items-center justify-between">
<h1 className="text-3xl font-bold">Admin Panel</h1>
<Badge variant="secondary">VascularExam.ai</Badge>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<Card>
<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<CardTitle className="text-sm font-medium">Total Users</CardTitle>
<Users className="h-4 w-4 text-muted-foreground" />
</CardHeader>
<CardContent>
<div className="text-2xl font-bold">{stats.totalUsers}</div>
</CardContent>
</Card>

<Card>
<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<CardTitle className="text-sm font-medium">Total Questions</CardTitle>
<FileQuestion className="h-4 w-4 text-muted-foreground" />
</CardHeader>
<CardContent>
<div className="text-2xl font-bold">{stats.totalQuestions}</div>
</CardContent>
</Card>

<Card>
<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReview}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KB Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.kbEntries}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Question Management</CardTitle>
              <CardDescription>
                Manage exam questions and review submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No questions yet</h3>
                <p className="text-muted-foreground mb-4">
                  Question management features coming soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
<Card>
<CardHeader>
<CardTitle>User Management</CardTitle>
<CardDescription>
Manage user accounts and permissions
</CardDescription>
</CardHeader>
<CardContent>
<div className="text-center py-8">
<Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
<h3 className="text-lg font-semibold mb-2">No users found</h3>
<p className="text-muted-foreground">
User accounts will appear here once people register.
</p>
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContent value="knowledge">
<Card>
<CardHeader>
<CardTitle>Knowledge Base Management</CardTitle>
<CardDescription>
Manage educational content and resources
</CardDescription>
</CardHeader>
<CardContent>
<div className="text-center py-8">
<BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
<h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
<p className="text-muted-foreground">
Knowledge base management features coming soon.
</p>
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContent value="analytics">
<Card>
<CardHeader>
<CardTitle>Analytics & Reports</CardTitle>
<CardDescription>
View system analytics and generate reports
</CardDescription>
</CardHeader>
<CardContent>
<div className="text-center py-8">
<BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
<h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
<p className="text-muted-foreground">
Analytics and reporting features coming soon.
</p>
</div>
</CardContent>
</Card>
</TabsContent>
</Tabs>
</div>
);
};

export default AdminPanel;
RefreshCw,
AlertTriangle,
Plus,
Save,
X
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
const [showCreateForm, setShowCreateForm] = useState(false);
const [newQuestion, setNewQuestion] = useState({
question_text: '',
model_answer: '',
topic: '',
difficulty: 'medium',
grading_criteria: '',
max_score: 4
});

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

  const createQuestion = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/questions/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Question created successfully',
        });
        setShowCreateForm(false);
        setNewQuestion({
          question_text: '',
          model_answer: '',
          topic: '',
          difficulty: 'medium',
          grading_criteria: '',
          max_score: 4
        });
        fetchDashboardData(); // Refresh stats
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Failed to create question',
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
            <div className="space-y-6">
              {/* Create Question Section */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Question Management</CardTitle>
                      <CardDescription>
                        Create new questions and manage existing ones
                      </CardDescription>
                    </div>
                    <Button 
                      onClick={() => setShowCreateForm(!showCreateForm)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Question
                    </Button>
                  </div>
                </CardHeader>
                {showCreateForm && (
                  <CardContent>
                    <div className="space-y-4 border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="topic">Topic/Category</Label>
                          <Select 
                            value={newQuestion.topic} 
                            onValueChange={(value) => setNewQuestion({...newQuestion, topic: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="carotid-disease">Carotid Disease</SelectItem>
                              <SelectItem value="aortic-aneurysm">Aortic Aneurysm</SelectItem>
                              <SelectItem value="peripheral-arterial">Peripheral Arterial Disease</SelectItem>
                              <SelectItem value="venous-disease">Venous Disease</SelectItem>
                              <SelectItem value="dialysis-access">Dialysis Access</SelectItem>
                              <SelectItem value="trauma">Vascular Trauma</SelectItem>
                              <SelectItem value="endovascular">Endovascular Procedures</SelectItem>
                              <SelectItem value="general">General Vascular Surgery</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="difficulty">Difficulty Level</Label>
                          <Select 
                            value={newQuestion.difficulty} 
                            onValueChange={(value) => setNewQuestion({...newQuestion, difficulty: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="question_text">Question Text</Label>
                        <Textarea
                          id="question_text"
                          placeholder="Enter the exam question (e.g., 'Discuss the management of asymptomatic carotid disease in a patient about to undergo coronary artery bypass grafting')"
                          value={newQuestion.question_text}
                          onChange={(e) => setNewQuestion({...newQuestion, question_text: e.target.value})}
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="model_answer">Model Answer</Label>
                        <Textarea
                          id="model_answer"
                          placeholder="Enter the ideal answer/key points that should be covered"
                          value={newQuestion.model_answer}
                          onChange={(e) => setNewQuestion({...newQuestion, model_answer: e.target.value})}
                          rows={5}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="grading_criteria">Grading Criteria</Label>
                        <Textarea
                          id="grading_criteria"
                          placeholder="Enter specific grading criteria (what earns 1, 2, 3, or 4 points)"
                          value={newQuestion.grading_criteria}
                          onChange={(e) => setNewQuestion({...newQuestion, grading_criteria: e.target.value})}
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowCreateForm(false)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button 
                          onClick={createQuestion}
                          disabled={!newQuestion.question_text || !newQuestion.model_answer || !newQuestion.topic}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Create Question
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Pending Questions Review */}
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
</div>
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
<TabsContent value="knowledge"><aCCard
