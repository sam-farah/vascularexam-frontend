// ExamPage.jsx
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExamPage = () => {
  const { examId } = useParams();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Exam Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Exam ID: {examId}</p>
            <p>This page will contain the exam interface with questions and timer.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamPage;

