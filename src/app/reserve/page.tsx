"use client";
import { useState } from "react";
import { SelectSeats } from "../components/select-seats";
import { Typography } from "../components/ui/typography";
import { useSearchParams } from "next/navigation";
import ManagePassengers from "../components/manage-passengers";
import { Header } from "../components/header";

export interface Passenger {
  id: number;
  name: string;
  lastName: string;
  seatId: number | undefined;
}

const seatsService = [
  { id: 1, row: 1, column: 1, code: "A1", isOccupied: false },
  { id: 2, row: 1, column: 2, code: "A2", isOccupied: false },
  { id: 3, row: 1, column: 3, code: "A3", isOccupied: false },
  { id: 4, row: 1, column: 4, code: "A4", isOccupied: false },
  { id: 5, row: 1, column: 5, code: "A5", isOccupied: false },
  { id: 6, row: 1, column: 6, code: "A6", isOccupied: false },
  { id: 7, row: 1, column: 7, code: "A7", isOccupied: false },
  { id: 8, row: 1, column: 8, code: "A8", isOccupied: false },
  { id: 9, row: 1, column: 9, code: "A9", isOccupied: false },
  { id: 10, row: 1, column: 10, code: "A10", isOccupied: false },
  { id: 11, row: 2, column: 1, code: "B1", isOccupied: false },
  { id: 12, row: 2, column: 2, code: "B2", isOccupied: false },
  { id: 13, row: 2, column: 3, code: "B3", isOccupied: false },
  { id: 14, row: 3, column: 4, code: "B4", isOccupied: true },
  { id: 15, row: 3, column: 5, code: "B5", isOccupied: false },
  { id: 16, row: 3, column: 6, code: "B6", isOccupied: false },
  { id: 17, row: 3, column: 7, code: "B7", isOccupied: true },
  { id: 18, row: 3, column: 8, code: "B8", isOccupied: false },
];

const passengersService: Passenger[] = [
  { id: 1, name: "John", lastName: "Doe", seatId: undefined },
  { id: 2, name: "Jane", lastName: "Doe", seatId: undefined },
  { id: 3, name: "John", lastName: "Smith", seatId: undefined },
  { id: 4, name: "Jane", lastName: "Smith", seatId: undefined },
];

const SeatsSummary: React.FC<{ passengers: Passenger[] }> = ({
  passengers,
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
              ? seatsService.find((seat) => seat.id === passenger.seatId)?.code
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

  const [passengers, setPassengers] = useState<Passenger[]>([
    ...passengersService,
  ]);

  const [selectedPassengerId, setSelectedPassengerId] = useState(1);

  const selectPassengerSeat = (seatId: number) => {
    const seat = seatsService.find((seat) => seat.id === seatId);
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
                seats={seatsService}
                selectedSeatsIds={selectedSeatsIds}
                onSelectSeat={(seatId) => selectPassengerSeat(seatId)}
              />
            </div>
            <SeatsSummary passengers={passengers} />
          </>
        ) : (
          <Typography variant="p">Couldn't find flight</Typography>
        )}
      </div>
    </main>
  );
}
