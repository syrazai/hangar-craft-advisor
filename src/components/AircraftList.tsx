
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Aircraft } from "@/types/types";
import { Plane, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AircraftListProps {
  aircraft: Aircraft[];
  onDeleteAircraft: (id: string) => void;
}

export default function AircraftList({ aircraft, onDeleteAircraft }: AircraftListProps) {
  if (aircraft.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Aircraft Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No aircraft added yet. Add an aircraft to see it here.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Plane className="w-5 h-5" />
          Aircraft Inventory ({aircraft.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Width (m)</TableHead>
                <TableHead className="text-right">Length (m)</TableHead>
                <TableHead className="text-right">Height (m)</TableHead>
                <TableHead className="text-right">Wing Span (m)</TableHead>
                <TableHead className="text-center">Color</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aircraft.map((craft) => (
                <TableRow key={craft.id}>
                  <TableCell className="font-medium">{craft.name}</TableCell>
                  <TableCell>{craft.type}</TableCell>
                  <TableCell className="text-right">{craft.width}</TableCell>
                  <TableCell className="text-right">{craft.length}</TableCell>
                  <TableCell className="text-right">{craft.height}</TableCell>
                  <TableCell className="text-right">{craft.wingSpan}</TableCell>
                  <TableCell className="text-center">
                    <div 
                      className="w-6 h-6 rounded-full mx-auto" 
                      style={{ backgroundColor: craft.color }}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => onDeleteAircraft(craft.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete aircraft</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
