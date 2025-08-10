import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  Search, 
  Brain, 
  Activity, 
  Eye, 
  Bell, 
  Users, 
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Globe,
  Lock,
  Target
} from "lucide-react";

export default function Homepage() {
  const features = [
    {
      icon: Search,
      title: "Real-Time Dark Web Scanning",
      description: "Continuously monitor hidden forums and marketplaces for threats targeting your organization."
    },
    {
      icon: Brain,
      title: "AI-Powered Threat Detection",
      description: "Advanced machine learning algorithms identify and classify emerging threats automatically."
    },
    {
      icon: Eye,
      title: "Named Entity Extraction (NER)",
      description: "Extract critical information like emails, IPs, CVEs, and credentials from unstructured data."
    },
    {
      icon: Activity,
      title: "Interactive Analytics Dashboard",
      description: "Visualize threat landscapes with real-time charts, graphs, and threat actor mapping."
    },
    {
      icon: Target,
      title: "Graph-Based Actor Mapping",
      description: "Understand relationships between threat actors, tools, and targets with interactive network graphs."
    },
    {
      icon: Bell,
      title: "Instant Alerts & Reports",
      description: "Get notified immediately when threats are detected with customizable alert parameters."
    }
  ];

  const steps = [
    {
      icon: Globe,
      title: "Crawl the Dark Web",
      description: "Tor-powered crawling of hidden forums and marketplaces to gather intelligence."
    },
    {
      icon: Brain,
      title: "Extract Threat Intel",
      description: "AI/LLM-based classification, NER, sentiment analysis, and threat categorization."
    },
    {
      icon: Zap,
      title: "Act with Insight",
      description: "Real-time alerts, dashboards, reports, and actor maps for immediate action."
    }
  ];

  const testimonials = [
    {
      quote: "This tool helped us detect leaked credentials before any damage occurred. Game-changing intelligence.",
      author: "Sarah Chen",
      role: "Senior Cybersecurity Analyst",
      company: "TechCorp Industries"
    },
    {
      quote: "The AI-powered threat detection saved us countless hours of manual analysis. Highly recommended.",
      author: "Michael Rodriguez",
      role: "CISO",
      company: "Global Finance Group"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["Limited alerts", "Basic dashboard", "Community support"],
      cta: "Get Started"
    },
    {
      name: "Analyst",
      price: "$99",
      period: "per month",
      features: ["Real-time dashboard", "Advanced analytics", "Email support", "API access"],
      cta: "Start Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      features: ["Full API access", "Custom reports", "Priority support", "On-premise deployment"],
      cta: "Contact Sales"
    }
  ];

  const navigate = useNavigate();
  const handleGetStarted = () => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/");
    else navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-cyber-surface bg-cyber-dark/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-cyber-cyan" />
              <span className="text-2xl font-bold text-cyber-text">DarkSight</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Features</a>
              <a href="#how-it-works" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">How It Works</a>
              <a href="#pricing" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Pricing</a>
              <a href="#contact" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Contact</a>
              <Link to="/login" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Login</Link>
            </div>

            <Button onClick={handleGetStarted} className="bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow cyber-transition">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-black to-cyber-panel"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyber-cyan/10 blur-3xl animate-cyber-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyber-purple/10 blur-3xl animate-cyber-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-cyber-text leading-tight">
              Uncover Hidden 
              <span className="text-cyber-cyan"> Threats</span>
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold text-cyber-text leading-tight">
              Protect Your <span className="text-cyber-cyan">Assets</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-cyber-text-dim max-w-4xl mx-auto leading-relaxed">
              AI-powered dark web monitoring and threat intelligence platform built for 
              cybersecurity teams, analysts, and enterprises.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#contact">
                <Button size="lg" className="bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow cyber-transition text-lg px-8 py-3">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Button onClick={handleGetStarted} variant="outline" size="lg" className="border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-black cyber-transition text-lg px-8 py-3">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-cyber-panel/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cyber-text mb-4">How It Works</h2>
            <p className="text-xl text-cyber-text-dim">Three simple steps to comprehensive threat intelligence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-cyber-cyan/20 rounded-full flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-cyber-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-cyber-text">{step.title}</h3>
                <p className="text-cyber-text-dim">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cyber-text mb-4">Powerful Features</h2>
            <p className="text-xl text-cyber-text-dim">Everything you need to stay ahead of cyber threats</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="cyber-panel hover:cyber-glow cyber-transition">
                <CardContent className="p-6 space-y-4">
                  <feature.icon className="h-10 w-10 text-cyber-cyan" />
                  <h3 className="text-xl font-semibold text-cyber-text">{feature.title}</h3>
                  <p className="text-cyber-text-dim">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cyber-panel/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cyber-text mb-4">Trusted by Security Teams</h2>
            <p className="text-xl text-cyber-text-dim">See what cybersecurity professionals are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="cyber-panel">
                <CardContent className="p-6 space-y-4">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-cyber-cyan fill-current" />
                    ))}
                  </div>
                  <p className="text-cyber-text italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-cyber-text font-semibold">{testimonial.author}</p>
                    <p className="text-cyber-text-dim">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cyber-text mb-4">Choose Your Plan</h2>
            <p className="text-xl text-cyber-text-dim">Flexible pricing for teams of all sizes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`cyber-panel ${plan.popular ? 'border-cyber-cyan cyber-glow' : ''} cyber-transition`}>
                <CardContent className="p-6 space-y-6">
                  {plan.popular && (
                    <div className="text-center">
                      <span className="bg-cyber-cyan text-cyber-black px-3 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-cyber-text">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-cyber-cyan">{plan.price}</span>
                      <span className="text-cyber-text-dim">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-cyber-green" />
                        <span className="text-cyber-text-dim">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/signup" className="block">
                    <Button 
                      className={`w-full ${plan.popular 
                        ? 'bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow' 
                        : 'border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-black'
                      } cyber-transition`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-cyber-panel/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-cyber-text mb-4">
            Ready to secure your digital perimeter?
          </h2>
          <p className="text-xl text-cyber-text-dim mb-8">
            Join thousands of cybersecurity professionals who trust DarkSight for threat intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow cyber-transition text-lg px-8 py-3">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-black cyber-transition text-lg px-8 py-3">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-cyber-text mb-2">Contact Us</h2>
            <p className="text-cyber-text-dim">Request a demo or ask anything—our team will reach out shortly.</p>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="name" className="text-cyber-text">Full Name</Label>
              <Input id="name" placeholder="Jane Doe" className="bg-cyber-surface border-cyber-surface text-cyber-text focus:border-cyber-cyan focus:ring-cyber-cyan" />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="email" className="text-cyber-text">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" className="bg-cyber-surface border-cyber-surface text-cyber-text focus:border-cyber-cyan focus:ring-cyber-cyan" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message" className="text-cyber-text">Message</Label>
              <Textarea id="message" placeholder="Tell us about your needs..." className="min-h-32 bg-cyber-surface border-cyber-surface text-cyber-text focus:border-cyber-cyan focus:ring-cyber-cyan" />
            </div>
            <div className="md:col-span-2">
              <Button className="bg-cyber-cyan text-cyber-black hover:bg-cyber-cyan-glow cyber-transition">Send Request</Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyber-dark border-t border-cyber-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-cyber-cyan" />
                <span className="text-xl font-bold text-cyber-text">DarkSight</span>
              </div>
              <p className="text-cyber-text-dim">
                Advanced threat intelligence from the deepest parts of the web.
              </p>
            </div>
            
            <div>
              <h4 className="text-cyber-text font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Features</a></li>
                <li><a href="#pricing" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Pricing</a></li>
                <li><a href="#" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-cyber-text font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">About</a></li>
                <li><a href="#contact" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Contact</a></li>
                <li><a href="#" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-cyber-text font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Help Center</a></li>
                <li><a href="#" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Documentation</a></li>
                <li><Link to="/login" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">Login</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-cyber-surface mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-cyber-text-dim">© 2024 DarkSight. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="mailto:contact@darksight.com" className="text-cyber-text-dim hover:text-cyber-cyan cyber-transition">
                contact@darksight.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}