import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This page will handle subscription plans, billing, and Stripe integration.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPage;

