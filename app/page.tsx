import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link2, BarChart3, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Link Shortener - Fast, Secure, and Analytics-Powered',
  description: 'Shorten your links, track analytics, and manage your URLs with our powerful link shortener platform.',
};

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container max-w-6xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="mb-4">
            Fast & Secure Link Shortening
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Shorten Links.
            <br />
            <span className="text-primary">Track Everything.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create short, memorable links and gain insights into your audience with powerful analytics. 
            Perfect for marketers, businesses, and content creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-base px-8">
                Get Started Free
              </Button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to manage your links
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform provides all the tools you need to create, share, and track your shortened links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Link2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Instant URL Shortening</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Transform long, unwieldy URLs into short, memorable links in seconds. 
                  Perfect for social media, emails, and marketing campaigns.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Powerful Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Track clicks, geographic data, and referral sources. 
                  Understand your audience and optimize your marketing strategies.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure & Reliable</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Built with security in mind. Your links are protected with enterprise-grade 
                  authentication and encrypted storage.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Lightning Fast</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Blazing-fast redirects ensure your users get to their destination quickly. 
                  Built on modern infrastructure for optimal performance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their link management needs.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="text-base px-8">
              Create Your Account
            </Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}
