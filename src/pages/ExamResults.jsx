import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExamResults = () => {
  const { examId } = useParams();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Exam Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Exam ID: {examId}</p>
            <p>This page will show detailed exam results, scores, and feedback.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamResults;

