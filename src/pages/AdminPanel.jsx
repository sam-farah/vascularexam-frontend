import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Users, FileQuestion, BookOpen, BarChart3, Plus, Check, X, Edit, Trash2 } from 'lucide-react';

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuestions: 0,
    pendingReview: 0,
    kbEntries: 0
  });

  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    topic: '',
    difficulty_level: '',
    question_text: '',
    model_answer: '',
    grading_criteria: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchStats();
    fetchQuestions();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/questions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createQuestion = async () => {
    if (!newQuestion.topic || !newQuestion.difficulty_level || !newQuestion.question_text) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newQuestion)
      });

      if (response.ok) {
        toast.success('Question created successfully!');
        setNewQuestion({
          topic: '',
          difficulty_level: '',
          question_text: '',
          model_answer: '',
          grading_criteria: ''
        });
        setShowCreateForm(false);
        fetchQuestions();
        fetchStats();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create question');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      toast.error('Failed to create question');
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (questionId) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        toast.success('Question deleted successfully!');
        fetchQuestions();
        fetchStats();
      } else {
        toast.error('Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Badge variant="secondary">VascularExam.ai</Badge>
      </div>

      {/* Stats Cards */}
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

      {/* Main Content Tabs */}
      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Questions Tab */}
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Question Management</CardTitle>
                  <CardDescription>
                    Create and manage exam questions for vascular surgery
                  </CardDescription>
                </div>
                <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Create Question Form */}
              {showCreateForm && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4">Create New Question</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="topic">Topic *</Label>
                      <Select value={newQuestion.topic} onValueChange={(value) => setNewQuestion({...newQuestion, topic: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="arterial_disease">Arterial Disease</SelectItem>
                          <SelectItem value="venous_disease">Venous Disease</SelectItem>
                          <SelectItem value="aortic_surgery">Aortic Surgery</SelectItem>
                          <SelectItem value="peripheral_arterial">Peripheral Arterial Disease</SelectItem>
                          <SelectItem value="carotid_surgery">Carotid Surgery</SelectItem>
                          <SelectItem value="dialysis_access">Dialysis Access</SelectItem>
                          <SelectItem value="trauma">Vascular Trauma</SelectItem>
                          <SelectItem value="endovascular">Endovascular Procedures</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="difficulty">Difficulty Level *</Label>
                      <Select value={newQuestion.difficulty_level} onValueChange={(value) => setNewQuestion({...newQuestion, difficulty_level: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="question_text">Question Text *</Label>
                    <Textarea
                      id="question_text"
                      placeholder="Enter the question text..."
                      value={newQuestion.question_text}
                      onChange={(e) => setNewQuestion({...newQuestion, question_text: e.target.value})}
                      rows={4}
                    />
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="model_answer">Model Answer</Label>
                    <Textarea
                      id="model_answer"
                      placeholder="Enter the model answer..."
                      value={newQuestion.model_answer}
                      onChange={(e) => setNewQuestion({...newQuestion, model_answer: e.target.value})}
                      rows={4}
                    />
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="grading_criteria">Grading Criteria</Label>
                    <Textarea
                      id="grading_criteria"
                      placeholder="Enter grading criteria..."
                      value={newQuestion.grading_criteria}
                      onChange={(e) => setNewQuestion({...newQuestion, grading_criteria: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button onClick={createQuestion} disabled={loading}>
                      {loading ? 'Creating...' : 'Create Question'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-4">
                {questions.length === 0 ? (
                  <div className="text-center py-8">
                    <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No questions yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first question to get started.
                    </p>
                    <Button onClick={() => setShowCreateForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Question
                    </Button>
                  </div>
                ) : (
                  questions.map((question) => (
                    <Card key={question.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{question.topic?.replace('_', ' ')}</Badge>
                            <Badge variant="secondary">{question.difficulty_level}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {question.question_text?.substring(0, 200)}...
                          </p>
                          <p className="text-xs text-gray-500">
                            Created: {new Date(question.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteQuestion(question.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
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
              {users.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No users found</h3>
                  <p className="text-muted-foreground">
                    User accounts will appear here once people register.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{user.full_name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            Joined: {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={user.subscription_plan === 'premium' ? 'default' : 'secondary'}>
                          {user.subscription_plan}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Knowledge Base Tab */}
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

        {/* Analytics Tab */}
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

