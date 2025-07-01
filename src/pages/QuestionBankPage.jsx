import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuestionBankPage = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Question Bank</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This page will show the question bank with filtering, search, and contribution features.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionBankPage;

