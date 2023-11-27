"use client";
import { useState } from "react";
import { SelectSeats } from "../components/select-seats";
import { Typography } from "../components/ui/typography";
import { useSearchParams } from "next/navigation";
import ManagePassengers from "../components/manage-passengers";
import { api } from "../../trpc/react";

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

  const [passengers, setPassengers] = useState<Passenger[]>([
    ...passengersService,
  ]);

  const [selectedPassengerId, setSelectedPassengerId] = useState("1");

  const selectPassengerSeat = (seatId: string) => {
    if (!seatsData) return;
    const seat = seatsData.find((seat) => seat.id === seatId);
    const passenger = passengers.find(
      (passenger) => passenger.id === selectedPassengerId,
    );
    if (seat && passenger) {
      const isSeatTaken = !!passengers.find(
        (passenger) => passenger.seatId === seat.id,
      );
      if (isSeatTaken) return;
      setPassengers(
        passengers.map((passenger) =>
          passenger.id === selectedPassengerId
            ? { ...passenger, seatId: seat.id }
            : passenger,
        ),
      );
    }
  };

  const addPassenger = (passenger: Passenger) => {
    setPassengers([...passengers, passenger]);
  };

  const selectedSeatsIds = passengers.map((passenger) => passenger.seatId);
  return (
    <main>
      <div className="flex flex-col gap-2 pt-2">
        <Typography variant="h1">Reserve a flight</Typography>
        {flightId ? (
          <>
            <Typography variant="h2">Flight ID: {flightId}</Typography>
            <div className="flex w-full gap-4">
              <ManagePassengers
                onSelectPassenger={(id) => setSelectedPassengerId(id)}
                passengers={passengers}
                selectedPassengerId={selectedPassengerId}
                onAddPassenger={(passenger) => addPassenger(passenger)}
              />
              <SelectSeats
                seats={seatsData ?? []}
                selectedSeatsIds={selectedSeatsIds}
                onSelectSeat={(seatId) => selectPassengerSeat(seatId)}
              />
            </div>
            <SeatsSummary passengers={passengers} seats={seatsData ?? []} />
          </>
        ) : (
          <Typography variant="p">Couldn't find flight</Typography>
        )}
      </div>
    </main>
  );
}
