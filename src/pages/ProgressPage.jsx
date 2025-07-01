import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProgressPage = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Progress Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This page will show detailed progress analytics, charts, and performance trends.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;

