"use client";

import { useState } from "react";
import type { Seat } from "../reserve/page";
import { AlertBar } from "./alert-bar";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";

interface SelectSeatsProps {
  seats: Seat[];
  onConfirmSeats: (seatsIds: Seat["id"][]) => void;
}

export const SelectSeats: React.FC<SelectSeatsProps> = ({
  seats,
  onConfirmSeats,
}) => {
  const maxRows = Math.max(...seats.map((seat) => seat.row));
  const maxColumns = Math.max(...seats.map((seat) => seat.column));

  const [selectedSeatsIds, setSelectedSeatsIds] = useState<Seat["id"][]>([]);
  const [error, setError] = useState("");
  const availableSeatsCount = seats.filter((seat) => !seat.isOccupied).length;

  const onSelectSeat = (seatId: string) => {
    setError("");
    if (!seats) return;
    const seat = seats.find((seat) => seat.id === seatId);
    if (!seat) return;
    if (seat.isOccupied) return;
    if (selectedSeatsIds.includes(seatId))
      setSelectedSeatsIds((prev) => [...prev.filter((id) => id !== seatId)]);
    else setSelectedSeatsIds((prev) => [...prev, seatId]);
  };

  const handleConfirmSeats = (seatsIds: Seat["id"][]) => {
    if (selectedSeatsIds.length === 0)
      setError("Please select at least one seat.");
    else onConfirmSeats(seatsIds);
  };

  return (
    <section className="flex flex-col gap-4">
      <div>
        <Typography variant="h3" className="font-bold tracking-tighter">
          Select Your Seats
        </Typography>
        <Typography variant="p" className="text-zinc-400">
          Please choose the seats for your flight.
        </Typography>
      </div>
      {availableSeatsCount <= 0 && (
        <AlertBar
          variant="default"
          title="There are no seats available."
          description="All seats are booked for this flight."
        ></AlertBar>
      )}
      {availableSeatsCount > 0 && (
        <div
          className={`grid grid-cols-${maxColumns} grid-rows-${maxRows} gap-2 rounded-md border border-slate-500 p-2`}
        >
          {seats.map((seat) => (
            <button
              key={seat.id}
              style={{ gridArea: `${seat.row} / ${seat.column}` }}
              className={`flex h-10 w-10 items-center justify-center rounded-full  ${
                selectedSeatsIds.includes(seat.id)
                  ? "bg-green-500 hover:bg-green-500"
                  : "bg-slate-500 hover:bg-slate-600"
              } ${
                seat.isOccupied
                  ? "cursor-not-allowed bg-slate-500 bg-opacity-50 hover:bg-slate-500 hover:bg-opacity-50"
                  : "cursor-pointer"
              }
             `}
              disabled={seat.isOccupied}
              onClick={() => {
                if (!seat.isOccupied) onSelectSeat(seat.id);
              }}
            >
              {seat.seatCode}
            </button>
          ))}
        </div>
      )}
      {selectedSeatsIds.length > 0 && (
        <Typography variant="p" className="text-zinc-400">
          Selected seats:
          {selectedSeatsIds
            .map((seatId) => {
              const seat = seats.find((seat) => seat.id === seatId);
              if (!seat) return null;
              return ` ${seat.seatCode}`;
            })
            .join(",")}
        </Typography>
      )}

      <Button
        variant="default"
        onClick={() => handleConfirmSeats(selectedSeatsIds)}
      >
        Confirm selection
      </Button>
      {error && (
        <Typography variant="p" className="text-red-500">
          {error}
        </Typography>
      )}
    </section>
  );
};
