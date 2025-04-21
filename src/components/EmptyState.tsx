
import { Button } from "@/components/ui/button";
import { PlaneTakeoff } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-white">
      <div className="rounded-full bg-blue-50 p-3 mb-4">
        <PlaneTakeoff className="h-8 w-8 text-blue-500" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-center text-gray-500 mb-6 max-w-md">{description}</p>
      
      {action && (
        <Button asChild>
          <Link to={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
