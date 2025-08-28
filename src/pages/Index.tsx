import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Newsletter from "@/components/Newsletter";
import heroImage from "@/assets/hero-livestock.jpg";
import breedingImage from "@/assets/breeding-facility.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.7), rgba(34, 197, 94, 0.7)), url(${heroImage})` }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            WELCOME TO NEXTGEN BREEDERS ALLIANCE
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            Breeding for Excellence in Livestock Production
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent hover:bg-accent-dark text-accent-foreground animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* About Us Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">About NextGen Breeders Alliance</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                NextGen Breeders Alliance stands at the forefront of livestock improvement and responsible breeding practices in Nigeria and across Africa. Our organization is dedicated to advancing the science and art of livestock breeding through comprehensive research, innovative partnerships, and cutting-edge training programs.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                We specialize in feed formulation technologies that optimize animal nutrition while maintaining cost-effectiveness for farmers. Our research initiatives focus on developing sustainable breeding practices that enhance livestock productivity, improve genetic diversity, and ensure food security for future generations.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Through strategic partnerships with universities, research institutions, and farming communities, we bridge the gap between theoretical knowledge and practical application, ensuring that modern breeding techniques reach farmers at every level.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Read More</Link>
              </Button>
            </div>
            <div>
              <img 
                src={breedingImage} 
                alt="Modern livestock breeding facility" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive approach to livestock breeding encompasses multiple key areas of focus, 
              each designed to address the evolving challenges of modern agriculture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Livestock Breeding</h3>
                <p className="text-muted-foreground">
                  Advanced genetic selection and breeding programs to improve livestock quality, 
                  productivity, and disease resistance across various species.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Training & Education</h3>
                <p className="text-muted-foreground">
                  Comprehensive training programs for farmers and breeders, focusing on modern 
                  techniques, best practices, and sustainable farming methods.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Feed Formulation</h3>
                <p className="text-muted-foreground">
                  Research and development of optimized feed formulations that enhance animal 
                  nutrition while reducing costs and environmental impact.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Innovation & Research</h3>
                <p className="text-muted-foreground">
                  Cutting-edge research initiatives that drive innovation in livestock breeding 
                  and agricultural practices for sustainable future farming.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Modern Farming</h3>
                <p className="text-muted-foreground">
                  Implementation of modern farming technologies and practices that increase 
                  efficiency, reduce waste, and improve overall farm productivity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Livestock Rearing</h3>
                <p className="text-muted-foreground">
                  Expert guidance on proper livestock rearing techniques, health management, 
                  and welfare practices for optimal animal development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              NextGen Breeders Alliance welcomes your comments and questions. 
              Reach out to us for partnerships, consultations, or to learn more about our programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Phone</h3>
              <p className="text-muted-foreground">+2347067310900</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
              <p className="text-muted-foreground">ngba@breeders.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Headquarters</h3>
              <p className="text-muted-foreground">Lagos, Akure, Nigeria</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pre-Footer Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">NGBA</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              NextGen Breeders Alliance is a global research partnership dedicated to transforming 
              livestock breeding and feed formulation for a sustainable, crisis-free future.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="opacity-80">+2347067310900</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="opacity-80">ngba@breeders.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="opacity-80">Lagos, Akure, Nigeria</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Index;
