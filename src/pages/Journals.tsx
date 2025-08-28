import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Newsletter from "@/components/Newsletter";

interface Journal {
  id: string;
  title: string;
  description: string;
  url: string;
  published_date: string;
  author: string;
  is_featured: boolean;
}

const Journals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const { data, error } = await supabase
        .from("journals")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) throw error;
      setJournals(data || []);
    } catch (error) {
      console.error("Error fetching journals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const featuredJournals = journals.filter(journal => journal.is_featured);
  const regularJournals = journals.filter(journal => !journal.is_featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Journals</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Access cutting-edge research and insights in livestock breeding and agricultural science
          </p>
        </div>
      </section>

      {/* Featured Journals */}
      {featuredJournals.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Featured Publications</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Highlighted research articles and publications that are making a significant impact 
                in the field of livestock breeding and agricultural development.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredJournals.map((journal) => (
                <Card key={journal.id} className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="default" className="bg-primary">Featured</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(journal.published_date)}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{journal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">By {journal.author}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{journal.description}</p>
                    <Button asChild variant="default" className="w-full">
                      <a href={journal.url} target="_blank" rel="noopener noreferrer">
                        Read Full Article <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Journals */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Research Publications</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive collection of research articles, studies, and publications 
              covering various aspects of livestock breeding, genetics, and sustainable agriculture.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Loading publications...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularJournals.map((journal) => (
                <Card key={journal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(journal.published_date)}
                    </div>
                    <CardTitle className="text-lg">{journal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">By {journal.author}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm">{journal.description}</p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={journal.url} target="_blank" rel="noopener noreferrer">
                        Read Article <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && journals.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Publications Available</h3>
              <p className="text-muted-foreground">Check back soon for new research publications and articles.</p>
            </div>
          )}
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Research Areas</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our research spans multiple disciplines within livestock breeding and agricultural science
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Livestock Genetics</h3>
              <p className="text-sm text-muted-foreground">Advanced genetic research and breeding programs</p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Feed Formulation</h3>
              <p className="text-sm text-muted-foreground">Nutrition research and feed optimization</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Sustainable Agriculture</h3>
              <p className="text-sm text-muted-foreground">Environmental sustainability and farming practices</p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Technology Innovation</h3>
              <p className="text-sm text-muted-foreground">Modern farming technology and automation</p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Journals;