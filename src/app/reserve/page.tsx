"use client";
import { useState } from "react";
import { SelectSeats } from "../components/select-seats";
import { Typography } from "../components/ui/typography";
import { useSearchParams } from "next/navigation";
import ManagePassengers from "../components/manage-passengers";
import { api } from "../../trpc/react";
import { Spinner } from "../components/ui/spinner";
import { AlertBar } from "../components/alert-bar";

export interface Passenger {
  id: string;
  name: string;
  lastName: string;
  seatId: string | undefined;
}

export interface Seat {
  id: string;
  flightId: string;
  row: number;
  column: number;
  seatPrice: number;
  seatClass: string;
  seatCode: string;
  isOccupied: boolean;
}

const passengersService: Passenger[] = [
  { id: "1", name: "John", lastName: "Doe", seatId: undefined },
  { id: "2", name: "Jane", lastName: "Doe", seatId: undefined },
  { id: "3", name: "John", lastName: "Smith", seatId: undefined },
  { id: "4", name: "Jane", lastName: "Smith", seatId: undefined },
];

const SeatsSummary: React.FC<{ passengers: Passenger[]; seats: Seat[] }> = ({
  passengers,
  seats,
}) => {
  return (
    <div>
      <Typography variant="p" fontSize="large">
        Selected seats
      </Typography>
      <ul className="flex flex-col gap-2">
        {passengers.map((passenger) => (
          <li key={passenger.id}>
            {passenger.name} {passenger.lastName}:{" "}
            {passenger.seatId
              ? seats.find((seat) => seat.id === passenger.seatId)?.seatCode
              : "Not selected"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Reserve() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId");

  const {
    data: seatsData,
    error,
    isLoading,
  } = api.flights.getFlightSeatsByFlightId.useQuery(
    { id: flightId ?? "" },
    { enabled: !!flightId },
  );

  return (
    <main>
      <div className="flex flex-col gap-4 pt-2">
        <Typography variant="h1">Reserve a flight</Typography>
        {isLoading && <Spinner />}
        {!isLoading && flightId && (
          <>
            <div className="flex w-full gap-4">
              <SelectSeats
                seats={seatsData ?? []}
                onConfirmSeats={(seatsIds) => console.log(seatsIds)}
              />
            </div>
          </>
        )}
        {error && (
          <AlertBar
            variant="destructive"
            title="There was an error."
            description="We could not reach our services."
          ></AlertBar>
        )}
        {!flightId && (
          <AlertBar
            variant="destructive"
            title="There was an error"
            description="Couldn't find flight"
          />
        )}
      </div>
    </main>
  );
}
