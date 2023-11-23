import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "./ui/input";
import { Typography } from "./ui/typography";
import Link from "next/link";

interface Flight {
  id: number;
  name: string;
  start: string;
  destination: string;
}

const FlightCard: React.FC<{
  id: number;
  name: string;
  start: string;
  destination: string;
}> = ({ id, name, start, destination }) => {
  return (
    <Link
      className="rounded-md border border-slate-500 p-2 hover:bg-slate-600/10"
      href={`/reserve?flightId=${id}`}
    >
      <Typography variant="h2">{name}</Typography>
      <Typography variant="p">Start: {start}</Typography>
      <Typography variant="p">Destination: {destination}</Typography>
    </Link>
  );
};

export const FlightFilter: React.FC<{ flights: Flight[] }> = ({ flights }) => {
  const [name, setName] = useState("");

  const filteredFlights = flights.filter((flight) => {
    return flight.name.toLowerCase().includes(name.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h2">Filter</Typography>
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input placeholder="Search" onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Typography variant="h2">Results</Typography>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {filteredFlights.map((flight) => (
            <FlightCard {...flight} />
          ))}
        </ul>
      </div>
    </div>
  );
};
