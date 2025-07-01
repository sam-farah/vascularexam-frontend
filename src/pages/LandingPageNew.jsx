import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Questions",
      description: "Advanced AI generates realistic exam questions tailored to vascular surgery topics and difficulty levels."
    },
    {
      icon: Target,
      title: "Personalized Practice",
      description: "Customize exam parameters including question count, time limits, and topic focus areas."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Detailed analytics show your performance by topic, helping identify areas for improvement."
    },
    {
      icon: Clock,
      title: "Timed Exams",
      description: "Practice under realistic exam conditions with configurable time limits and question counts."
    },
    {
      icon: BookOpen,
      title: "Comprehensive Content",
      description: "Extensive knowledge base covering all major vascular surgery topics and procedures."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Contribute questions and help improve the platform for fellow trainees."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Vascular Surgery Resident",
      content: "VascularExam.ai transformed my exam preparation. The AI-generated questions are incredibly realistic and helped me identify my weak areas.",
      rating: 5
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Senior Registrar",
      content: "The personalized practice sessions and detailed feedback have significantly improved my confidence for the written exams.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Vascular Surgery Fellow",
      content: "Finally, an exam prep tool designed specifically for vascular surgery. The progress tracking is incredibly detailed and helpful.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen hero-gradient">
      {/* Navigation */}
      <nav className="nav-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">VE</span>
            </div>
            <div>
              <span className="font-bold text-xl gradient-text">VascularExam.ai</span>
              <div className="text-xs text-muted-foreground">AI-Powered Exam Preparation</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="manus-button">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Advanced AI
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Master Your <span className="gradient-text">Vascular Surgery</span><br />
            Written Exams
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Prepare for your vascular surgery written exams with AI-generated questions, 
            personalized practice sessions, and detailed performance analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button size="lg" className="manus-button text-lg px-8 py-4">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="manus-button-secondary text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <CheckCircle className="inline w-4 h-4 mr-2 text-primary" />
            No credit card required • 7-day free trial • Cancel anytime
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and resources you need to excel in your vascular surgery written examinations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Trusted by Vascular Surgery Trainees</h2>
          <p className="text-xl text-muted-foreground">
            See what our users have to say about their exam preparation experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that works best for your exam preparation needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="glass-card card-hover">
            <CardHeader>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <div className="text-3xl font-bold">
                $29.99<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  Unlimited practice exams
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  AI-generated questions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  Basic progress tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  Email support
                </li>
              </ul>
              <Link to="/register">
                <Button className="w-full manus-button">Get Started</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="glass-card card-hover border-primary/50 relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="text-3xl font-bold">
                $299.99<span className="text-lg font-normal text-muted-foreground">/year</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  Everything in Basic
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  Custom question sets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  Priority support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  Question contribution rewards
                </li>
              </ul>
              <Link to="/register">
                <Button className="w-full manus-button">Get Started</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="glass-card text-center p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Ace Your Vascular Surgery Exams?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of vascular surgery trainees who have improved their exam performance with VascularExam.ai.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="manus-button text-lg px-8 py-4">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="manus-button-secondary text-lg px-8 py-4">
              Contact Sales
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-emerald-400 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">VE</span>
                </div>
                <span className="font-bold text-lg gradient-text">VascularExam.ai</span>
              </div>
              <p className="text-muted-foreground">
                The leading AI-powered platform for vascular surgery exam preparation.
              </p>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                HIPAA Compliant & Secure
              </Badge>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 VascularExam.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

