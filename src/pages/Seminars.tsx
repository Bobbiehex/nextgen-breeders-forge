import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Newsletter from "@/components/Newsletter";
import breedingImage from "@/assets/breeding-facility.jpg";
import poultryImage from "@/assets/poultry-farm.jpg";
import pigImage from "@/assets/pig-farm.jpg";

interface Seminar {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
}

const Seminars = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      const { data, error } = await supabase
        .from("seminars")
        .select("*")
        .eq("is_active", true)
        .order("date", { ascending: true });

      if (error) throw error;
      setSeminars(data || []);
    } catch (error) {
      console.error("Error fetching seminars:", error);
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

  const getImageForSeminar = (index: number) => {
    const images = [breedingImage, poultryImage, pigImage];
    return images[index % images.length];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Seminars</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Join our educational seminars and workshops to advance your knowledge in livestock breeding
          </p>
        </div>
      </section>

      {/* Seminars Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Upcoming Seminars</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Stay ahead of the curve with our comprehensive seminars covering the latest developments 
              in livestock breeding, feed formulation, and sustainable farming practices.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading seminars...</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {seminars.map((seminar, index) => (
                <Card key={seminar.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={seminar.image_url || getImageForSeminar(index)}
                      alt={seminar.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/20"></div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(seminar.date)}</span>
                    </div>
                    <CardTitle className="text-xl text-foreground">{seminar.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{seminar.description}</p>
                    
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{seminar.location}</span>
                    </div>
                    
                    <Button asChild className="w-full">
                      <Link to="/auth">Register Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-muted rounded-lg p-8">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Want to Attend Our Seminars?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Register now to secure your spot at our upcoming seminars. Our events fill up quickly, 
                so don't miss out on these valuable learning opportunities.
              </p>
              <Button asChild size="lg">
                <Link to="/auth">Register Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Attend Our Seminars?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Expert Speakers</h3>
              <p className="text-muted-foreground">
                Learn from industry leaders, renowned researchers, and experienced practitioners 
                who are shaping the future of livestock breeding.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Latest Research</h3>
              <p className="text-muted-foreground">
                Stay updated with the most recent developments in livestock genetics, 
                feed formulation, and sustainable farming practices.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Networking</h3>
              <p className="text-muted-foreground">
                Connect with fellow breeders, researchers, and industry professionals 
                to build valuable relationships and partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Seminars;