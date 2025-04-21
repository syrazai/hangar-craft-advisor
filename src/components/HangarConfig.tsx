
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoTooltip from "@/components/InfoTooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hangar } from "@/types/types";
import { useState } from "react";

interface HangarConfigProps {
  hangar: Hangar;
  onHangarChange: (hangar: Hangar) => void;
}

export default function HangarConfig({ hangar, onHangarChange }: HangarConfigProps) {
  const [formData, setFormData] = useState<Hangar>(hangar);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'width' || name === 'length' || name === 'height') {
      // Ensure values are positive and within reasonable limits
      const numValue = Math.max(1, Math.min(500, Number(value) || 0));
      setFormData({ ...formData, [name]: numValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onHangarChange(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <svg 
            className="w-5 h-5" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 17H2a3 3 0 0 0 3-3V9a3 3 0 0 1 2-2.83V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1.17A3 3 0 0 1 19 9v5a3 3 0 0 0 3 3Z" />
            <path d="M8 10v6" />
            <path d="M16 10v6" />
            <path d="M12 10v6" />
          </svg>
          Hangar Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Hangar Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Main Hangar"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="width" className="flex items-center">
                Width (meters)
                <InfoTooltip text="The width of your hangar measured from side to side." />
              </Label>
              <Input
                id="width"
                name="width"
                type="number"
                value={formData.width}
                onChange={handleInputChange}
                min={1}
                max={500}
                step={1}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="length">Length (meters)</Label>
              <Input
                id="length"
                name="length"
                type="number"
                value={formData.length}
                onChange={handleInputChange}
                min={1}
                max={500}
                step={1}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height" className="flex items-center">
                Height (meters)
                <InfoTooltip text="The vertical clearance available in your hangar." />
              </Label>
              <Input
                id="height"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleInputChange}
                min={1}
                max={100}
                step={1}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Update Hangar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
