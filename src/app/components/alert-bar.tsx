import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface AlertBarProps {
  variant: React.ComponentProps<typeof Alert>["variant"];
  title: string;
  description: string;
}

export const AlertBar: React.FC<AlertBarProps> = ({
  variant,
  title,
  description,
}) => {
  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
