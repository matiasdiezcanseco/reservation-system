"use client";
import { useState } from "react";
import { Typography } from "../../components/ui/typography";
import { useSearchParams } from "next/navigation";
import { api } from "../../../trpc/react";

export default function Clients() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId");
  const seatsParam = searchParams.get("seats");

  const {
    data: seatsData,
    error,
    isLoading,
  } = api.flights.getFlightSeatsByFlightId.useQuery(
    { id: flightId ?? "" },
    { enabled: !!flightId },
  );

  const selectedSeats = seatsData?.filter(
    (seat) => seatsParam?.includes(seat.id),
  );

  const [clients, setClients] = useState([]);

  return (
    <div className="flex flex-col gap-4 p-2">
      {JSON.stringify(selectedSeats)}
    </div>
  );
}
