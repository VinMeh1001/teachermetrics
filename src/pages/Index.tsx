import { useState } from "react";
import { Star, Award, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopTeachers from "@/components/TopTeachers";
import TopStudents from "@/components/TopStudents";
import LoginModal from "@/components/LoginModal";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-50">
      {/* Hero Section */}
      <div className="container px-4 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6">
          Rate & Appreciate Your Teachers
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join the global community of students and teachers sharing appreciation
          and building connections across institutions worldwide.
        </p>
        <Button
          onClick={() => setShowLogin(true)}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Get Started <ArrowRight className="ml-2" />
        </Button>
      </div>

      {/* Features */}
      <div className="container px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <Star className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Rate Teachers</h3>
          <p className="text-gray-600">
            Share your experience and help others find great educators.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <Award className="w-12 h-12 text-secondary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Get Recognized</h3>
          <p className="text-gray-600">
            Stand out with ratings and reviews from your students.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <Share2 className="w-12 h-12 text-accent mb-4" />
          <h3 className="text-xl font-semibold mb-2">Share & Connect</h3>
          <p className="text-gray-600">
            Build your network and connect with educators worldwide.
          </p>
        </div>
      </div>

      {/* Top Teachers Section */}
      <div className="container px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Top Rated Teachers</h2>
        <TopTeachers />
      </div>

      {/* Top Students Section */}
      <div className="container px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Top Rated Students</h2>
        <TopStudents />
      </div>

      {/* Login Modal */}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Index;