"use client";
import Link from "next/link";
import { api } from "../trpc/react";
import { Spinner } from "./components/ui/spinner";
import { Typography } from "./components/ui/typography";
import { useState } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { AlertBar } from "./components/alert-bar";

interface Flight {
  id: string;
  name: string;
  start: string;
  destination: string;
}

const FlightCard: React.FC<Flight> = ({ id, name, start, destination }) => {
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
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");

  const filteredFlights = flights.filter((flight) => {
    const filteredWithName = flight.name
      .toLowerCase()
      .includes(name.toLowerCase());
    const filteredWithStart = flight.start
      .toLowerCase()
      .includes(start.toLowerCase());
    const filteredWithDestination = flight.destination
      .toLowerCase()
      .includes(destination.toLowerCase());
    return filteredWithName && filteredWithStart && filteredWithDestination;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 rounded-md border border-slate-500 p-4">
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input
            className="max-w-sm"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Start</Label>
          <Input
            className="max-w-sm"
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Destination</Label>
          <Input
            className="max-w-sm"
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>
      <div>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {filteredFlights.map((flight) => (
            <FlightCard {...flight} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function Home() {
  const {
    data: flights,
    isLoading,
    error,
  } = api.flights.getFlights.useQuery({});

  return (
    <main className="flex flex-col gap-6 px-4 pt-4">
      <div className="flex flex-col gap-2">
        <Typography variant="h1">Available flights</Typography>
        <Typography variant="p">
          Select a flight to reserve a seat for a passenger
        </Typography>
      </div>
      {isLoading && <Spinner />}
      {error && !isLoading && (
        <AlertBar
          variant="destructive"
          title="Error"
          description={error.message}
        />
      )}
      {!isLoading && !error && flights && <FlightFilter flights={flights} />}
    </main>
  );
}
