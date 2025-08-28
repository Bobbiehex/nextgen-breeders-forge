import React from "react";
import Newsletter from "@/components/Newsletter";
import breedingImage from "@/assets/breeding-facility.jpg";
import poultryImage from "@/assets/poultry-farm.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About NextGen Breeders Alliance</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Leading the transformation of livestock breeding and agricultural practices across Africa and beyond
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission & Vision</h2>
              
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <p>
                  NextGen Breeders Alliance stands as a beacon of innovation and excellence in the livestock breeding industry across Nigeria and the wider African continent. Founded on the principles of scientific advancement, sustainable practices, and community empowerment, our organization has become the leading authority on modern livestock improvement techniques and responsible breeding methodologies.
                </p>

                <p>
                  Our comprehensive approach to livestock development encompasses not just the biological aspects of breeding, but also the socio-economic factors that impact farming communities. We understand that sustainable livestock improvement requires a holistic understanding of genetics, nutrition, health management, and market dynamics. This multidisciplinary approach sets us apart as leaders in the field.
                </p>

                <p>
                  At the heart of our operations lies an unwavering commitment to research excellence. Our state-of-the-art research facilities, staffed by world-class scientists and veterinarians, continuously push the boundaries of what's possible in livestock genetics and breeding. We employ cutting-edge technologies including genomic selection, artificial intelligence in breeding decisions, and advanced reproductive technologies to achieve unprecedented improvements in livestock productivity and quality.
                </p>

                <p>
                  Feed formulation represents another cornerstone of our expertise. We recognize that superior genetics can only reach their full potential when supported by optimal nutrition. Our feed formulation research division works tirelessly to develop cost-effective, locally-sourced feed solutions that maximize animal performance while minimizing environmental impact. This research has resulted in feed formulations that have revolutionized livestock nutrition across multiple species.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <img 
                src={breedingImage} 
                alt="Modern livestock breeding facility" 
                className="rounded-lg shadow-lg w-full"
              />
              <img 
                src={poultryImage} 
                alt="Modern poultry farming" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Impact & Partnerships</h2>
            
            <p>
              Our training programs represent perhaps our most visible impact on the agricultural landscape. These comprehensive educational initiatives are designed to bridge the knowledge gap between advanced scientific research and practical on-farm application. We offer programs ranging from basic animal husbandry for smallholder farmers to advanced genetic selection techniques for commercial producers. Our mobile training units reach remote farming communities, ensuring that the benefits of modern breeding techniques are accessible to all.
            </p>

            <p>
              Strategic partnerships form the backbone of our success. We collaborate closely with prestigious universities, international research institutions, government agencies, and private sector partners. These relationships enable us to leverage global expertise while maintaining our focus on local challenges and opportunities. Our partnership network spans across continents, allowing us to incorporate best practices from around the world while adapting them to African farming systems.
            </p>

            <p>
              Technology transfer is a critical component of our mission. We don't just conduct research in isolation; we actively work to ensure that our discoveries reach the farmers and producers who can benefit from them. This involves developing user-friendly tools, creating training materials in local languages, and establishing support networks that help farmers implement new techniques successfully.
            </p>

            <p>
              Our commitment to sustainability extends beyond environmental considerations to encompass economic and social sustainability as well. We recognize that livestock improvement initiatives must be economically viable for farmers to adopt them long-term. Our programs are designed with careful attention to cost-benefit ratios, ensuring that improvements in productivity translate into improved livelihoods for farming families.
            </p>

            <p>
              Quality assurance and standardization represent another area where NextGen Breeders Alliance leads the industry. We have developed and implemented rigorous quality control systems that ensure consistency and reliability in breeding outcomes. Our certification programs help farmers and consumers identify high-quality livestock and livestock products, creating market incentives for continued improvement.
            </p>

            <p>
              Looking toward the future, NextGen Breeders Alliance continues to evolve and adapt to meet emerging challenges in agriculture. Climate change, population growth, and changing consumer preferences all present both challenges and opportunities for livestock producers. Our research agenda is constantly updated to address these evolving needs, ensuring that we remain at the forefront of industry development.
            </p>

            <p>
              Through our comprehensive approach to livestock improvement, encompassing research, education, technology transfer, and partnership development, NextGen Breeders Alliance is proud to contribute to food security, economic development, and sustainable agriculture across Africa and beyond. We invite you to join us in building a more productive, sustainable, and prosperous future for livestock agriculture.
            </p>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default About;