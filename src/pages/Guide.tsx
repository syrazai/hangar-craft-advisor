
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, HelpCircle, PlaneTakeoff } from "lucide-react";
import { Link } from "react-router-dom";

const Guide = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PlaneTakeoff size={32} />
              <div>
                <h1 className="text-2xl font-bold">Hangar Craft Advisor</h1>
                <p className="text-gray-300 text-sm">User Guide</p>
              </div>
            </div>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to App
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <HelpCircle className="text-blue-500" />
                  Getting Started
                </h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Hangar Craft Advisor! This application helps you optimize aircraft placement within your hangar space.
                  Follow this guide to make the most of the application.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Configure Your Hangar</h3>
                    <p className="text-gray-600">
                      Start by setting up your hangar dimensions. Navigate to the "Hangar Setup" tab and enter the width, length, and height of your hangar space.
                      Give your hangar a name for easy reference.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Add Your Aircraft</h3>
                    <p className="text-gray-600">
                      Switch to the "Aircraft Management" tab to add aircraft to your inventory. You can either select from
                      predefined aircraft types or create custom aircraft by specifying dimensions. Add as many aircraft as needed.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Run the Optimization</h3>
                    <p className="text-gray-600">
                      Go to the "Optimization" tab, adjust the safety margin as needed, and click "Run Optimization".
                      The application will calculate the most efficient way to place your aircraft in the hangar.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Review Results</h3>
                    <p className="text-gray-600">
                      The visualization will show you how aircraft can be arranged in your hangar. The summary will display 
                      statistics including how many aircraft could be placed and the space utilization percentage.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="text-blue-500" />
                  Tips for Best Results
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Provide accurate dimensions for both your hangar and aircraft.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Adjust the safety margin based on your operational requirements.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Try different configurations by modifying aircraft or hangar dimensions.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Your data is saved locally, so you can return to your configuration later.</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/">
                    Start Using the App
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <footer className="bg-gray-900 text-gray-400 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-sm">
          <p>Hangar Craft Advisor — Aircraft Parking Optimization System</p>
          <p className="mt-2">© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Guide;
