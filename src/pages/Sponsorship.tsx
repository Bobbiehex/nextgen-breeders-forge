import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Newsletter from "@/components/Newsletter";
import breedingImage from "@/assets/breeding-facility.jpg";
import poultryImage from "@/assets/poultry-farm.jpg";

const Sponsorship = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalDonations, setTotalDonations] = useState(0);
  const { toast } = useToast();
  
  const target = 5000000; // ₦5,000,000 target

  useEffect(() => {
    fetchTotalDonations();
  }, []);

  const fetchTotalDonations = async () => {
    try {
      const { data, error } = await supabase
        .from("donations")
        .select("amount")
        .eq("status", "completed");

      if (error) throw error;

      const total = data?.reduce((sum, donation) => sum + parseFloat(donation.amount.toString()), 0) || 0;
      setTotalDonations(total);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create donation record
      const { data: donation, error: donationError } = await supabase
        .from("donations")
        .insert([{
          amount: parseFloat(amount),
          email: "donor@example.com", // This would come from auth or form
          status: "pending"
        }])
        .select()
        .single();

      if (donationError) throw donationError;

      // Initialize Paystack payment
      const handler = (window as any).PaystackPop.setup({
        key: 'pk_test_39a4c93266e2ae4310cc9c5ad8e02a799352add7',
        email: 'donor@example.com',
        amount: parseFloat(amount) * 100, // Paystack expects amount in kobo
        currency: 'NGN',
        ref: donation.id,
        callback: async function(response: any) {
          // Update donation status
          await supabase
            .from("donations")
            .update({ 
              status: "completed", 
              paystack_reference: response.reference 
            })
            .eq("id", donation.id);

          toast({
            title: "Thank you!",
            description: "Your donation was successful. Thank you for supporting our mission!",
          });
          
          setAmount("");
          fetchTotalDonations();
        },
        onClose: function() {
          // Update donation status to failed
          supabase
            .from("donations")
            .update({ status: "failed" })
            .eq("id", donation.id);
        }
      });

      handler.openIframe();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPitchDeck = () => {
    // This would download a prepared PDF pitch deck
    toast({
      title: "Download started",
      description: "The pitch deck is being prepared for download.",
    });
  };

  const progressPercentage = Math.min((totalDonations / target) * 100, 100);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sponsorship</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Partner with us to transform the future of livestock breeding
          </p>
        </div>
      </section>

      {/* Sponsorship Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Why Sponsor Us?</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Be a part of the future of livestock breeding by sponsoring NextGen Breeders Alliance. 
                Your sponsorship directly supports innovation, training, and research in modern livestock 
                farming and feed formulation. By partnering with us, you gain visibility, impact, and the 
                opportunity to shape the next generation of breeders worldwide.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Research Excellence:</strong> Support cutting-edge research in livestock genetics and breeding technologies.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Training Programs:</strong> Fund comprehensive education initiatives for farmers across Africa.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Technology Innovation:</strong> Drive the development of modern farming technologies and practices.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <img 
                src={breedingImage} 
                alt="Livestock breeding research facility" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Support Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your donations help the alliance grow by supporting training programs, advanced technology research, 
              feed formulation development, and livestock improvement initiatives across Africa. Every contribution 
              makes a meaningful difference in transforming agricultural practices and improving farmer livelihoods.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Make a Donation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">₦{totalDonations.toLocaleString()} / ₦{target.toLocaleString()}</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-muted-foreground text-center">
                  {progressPercentage.toFixed(1)}% of target reached
                </p>
              </div>

              {/* Donation Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-2">
                    Donation Amount (₦)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="100"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleDonate} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Processing..." : "Donate Now"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadPitchDeck}
                    className="w-full"
                  >
                    Download Pitch Deck
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={poultryImage} 
                alt="Modern poultry farming facility" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Your Impact</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Training & Education</h3>
                  <p className="text-muted-foreground">
                    Fund comprehensive training programs that reach thousands of farmers across Nigeria and Africa, 
                    providing them with modern breeding techniques and sustainable farming practices.
                  </p>
                </div>
                
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Research & Development</h3>
                  <p className="text-muted-foreground">
                    Support groundbreaking research in livestock genetics, feed formulation, and agricultural 
                    technology that drives innovation across the entire industry.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Technology Access</h3>
                  <p className="text-muted-foreground">
                    Enable the development and deployment of modern farming technologies, making advanced 
                    livestock breeding techniques accessible to farmers of all scales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      {/* Paystack Script */}
      <script src="https://js.paystack.co/v1/inline.js"></script>
    </div>
  );
};

export default Sponsorship;