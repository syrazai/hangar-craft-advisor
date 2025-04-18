
import AircraftForm from "@/components/AircraftForm";
import AircraftList from "@/components/AircraftList";
import EmptyState from "@/components/EmptyState";
import HangarConfig from "@/components/HangarConfig";
import HangarVisualization from "@/components/HangarVisualization";
import OptimizationControls from "@/components/OptimizationControls";
import OptimizationSummary from "@/components/OptimizationSummary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Aircraft, Hangar, OptimizationResult } from "@/types/types";
import { useEffect, useState } from "react";
import { HelpCircle, PlaneTakeoff } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Load data from local storage or use defaults
  const [hangar, setHangar] = useState<Hangar>(() => {
    try {
      const saved = localStorage.getItem('hangar');
      return saved ? JSON.parse(saved) : {
        name: "Main Hangar",
        width: 100,
        length: 150,
        height: 20
      };
    } catch (error) {
      console.error("Error loading hangar data:", error);
      return {
        name: "Main Hangar",
        width: 100,
        length: 150,
        height: 20
      };
    }
  });
  
  // Aircraft inventory
  const [aircraft, setAircraft] = useState<Aircraft[]>(() => {
    try {
      const saved = localStorage.getItem('aircraft');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading aircraft data:", error);
      return [];
    }
  });
  
  // Optimization results
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  
  // Handler for adding a new aircraft
  const handleAddAircraft = (newAircraft: Aircraft) => {
    setAircraft(prev => [...prev, newAircraft]);
  };
  
  // Handler for deleting an aircraft
  const handleDeleteAircraft = (id: string) => {
    setAircraft(prev => prev.filter(craft => craft.id !== id));
  };
  
  // Handler for updating hangar configuration
  const handleHangarChange = (updatedHangar: Hangar) => {
    setHangar(updatedHangar);
    setOptimizationResult(null); // Reset optimization when hangar changes
  };
  
  // Handler for optimization results
  const handleOptimizationResult = (result: OptimizationResult) => {
    setOptimizationResult(result);
  };

  // Load data from local storage on component mount
  useEffect(() => {
    const savedHangar = localStorage.getItem('hangar');
    const savedAircraft = localStorage.getItem('aircraft');
    
    if (savedHangar) {
      try {
        setHangar(JSON.parse(savedHangar));
      } catch (error) {
        console.error('Failed to parse hangar data', error);
      }
    }
    
    if (savedAircraft) {
      try {
        setAircraft(JSON.parse(savedAircraft));
      } catch (error) {
        console.error('Failed to parse aircraft data', error);
      }
    }
  }, []);
  
  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('hangar', JSON.stringify(hangar));
  }, [hangar]);
  
  useEffect(() => {
    localStorage.setItem('aircraft', JSON.stringify(aircraft));
  }, [aircraft]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PlaneTakeoff size={32} />
              <div>
                <h1 className="text-2xl font-bold">Hangar Craft Advisor</h1>
                <p className="text-gray-300 text-sm">Aircraft Parking Optimization</p>
              </div>
            </div>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800">
              <Link to="/guide">
                <HelpCircle className="mr-2 h-4 w-4" />
                User Guide
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Tabs defaultValue="hangar" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="hangar">Hangar Setup</TabsTrigger>
            <TabsTrigger value="aircraft">Aircraft Management</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hangar" className="space-y-8">
            <HangarConfig 
              hangar={hangar} 
              onHangarChange={handleHangarChange} 
            />
            <HangarVisualization 
              hangar={hangar} 
              optimizationResult={optimizationResult} 
            />
          </TabsContent>
          
          <TabsContent value="aircraft" className="space-y-8">
            <AircraftForm onAddAircraft={handleAddAircraft} />
            <AircraftList 
              aircraft={aircraft}
              onDeleteAircraft={handleDeleteAircraft}
            />
          </TabsContent>
          
          <TabsContent value="optimization" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <OptimizationControls
                hangar={hangar}
                aircraft={aircraft}
                onOptimizationResult={handleOptimizationResult}
              />
              {aircraft.length === 0 ? (
                <EmptyState 
                  title="No Aircraft Added"
                  description="Add aircraft in the Aircraft Management tab to optimize their placement in the hangar."
                  action={{
                    label: "Add Aircraft",
                    href: "#aircraft"
                  }}
                />
              ) : (
                <OptimizationSummary 
                  hangar={hangar}
                  aircraft={aircraft}
                  optimizationResult={optimizationResult}
                />
              )}
            </div>
            
            <HangarVisualization 
              hangar={hangar} 
              optimizationResult={optimizationResult} 
            />
          </TabsContent>
        </Tabs>
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

export default Index;
