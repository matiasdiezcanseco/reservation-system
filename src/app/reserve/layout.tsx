import { Typography } from "../components/ui/typography";

export default function ReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex flex-col gap-4 p-2">
        <Typography variant="h1">Reserve a flight</Typography>
        {children}
      </div>
    </main>
  );
}
