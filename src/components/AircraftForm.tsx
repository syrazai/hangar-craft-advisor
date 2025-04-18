
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoTooltip from "@/components/InfoTooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Aircraft } from "@/types/types";
import { aircraftTypes } from "@/utils/aircraftTypes";
import { PlaneTakeoff } from "lucide-react";
import { useState } from "react";

interface AircraftFormProps {
  onAddAircraft: (aircraft: Aircraft) => void;
}

export default function AircraftForm({ onAddAircraft }: AircraftFormProps) {
  const initialFormState = {
    id: '',
    name: '',
    type: '',
    width: 0,
    length: 0,
    height: 0,
    wingSpan: 0,
    color: '#3B82F6'
  };
  
  const [formData, setFormData] = useState<Aircraft>(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'width' || name === 'length' || name === 'height' || name === 'wingSpan') {
      const numValue = Math.max(0, Number(value) || 0);
      setFormData({ ...formData, [name]: numValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTypeSelect = (value: string) => {
    const selectedType = aircraftTypes.find(type => type.name === value);
    
    if (selectedType) {
      setFormData({
        ...formData,
        type: value,
        width: selectedType.defaultWidth,
        length: selectedType.defaultLength,
        height: selectedType.defaultHeight,
        wingSpan: selectedType.defaultWingSpan
      });
    } else {
      setFormData({
        ...formData,
        type: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAircraft: Aircraft = {
      ...formData,
      id: crypto.randomUUID()
    };
    
    onAddAircraft(newAircraft);
    setFormData(initialFormState);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <PlaneTakeoff className="w-5 h-5" />
          Add Aircraft
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Aircraft Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Boeing 737"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Aircraft Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={handleTypeSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select aircraft type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Custom">Custom</SelectItem>
                  {aircraftTypes.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="width">Width (meters)</Label>
              <Input
                id="width"
                name="width"
                type="number"
                value={formData.width}
                onChange={handleInputChange}
                min={1}
                max={100}
                step={0.1}
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
                max={100}
                step={0.1}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Height (meters)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleInputChange}
                min={1}
                max={50}
                step={0.1}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wingSpan" className="flex items-center">
                Wing Span (meters)
                <InfoTooltip text="The distance from wingtip to wingtip. Important for determining clearance requirements." />
              </Label>
              <Input
                id="wingSpan"
                name="wingSpan"
                type="number"
                value={formData.wingSpan}
                onChange={handleInputChange}
                min={0}
                max={100}
                step={0.1}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Color (for visualization)</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={formData.color}
                  onChange={handleInputChange}
                  name="color"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Aircraft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
