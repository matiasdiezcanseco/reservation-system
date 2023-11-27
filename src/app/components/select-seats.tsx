"use client";

import type { Seat } from "../reserve/page";
import { Typography } from "./ui/typography";

interface SelectSeatsProps {
  seats: Seat[];
  selectedSeatsIds: (Seat["id"] | undefined)[];
  onSelectSeat: (seatId: Seat["id"]) => void;
}

export const SelectSeats: React.FC<SelectSeatsProps> = ({
  seats,
  selectedSeatsIds,
  onSelectSeat,
}) => {
  const maxRows = Math.max(...seats.map((seat) => seat.row));
  const maxColumns = Math.max(...seats.map((seat) => seat.column));

  return (
    <section>
      <div>
        <Typography variant="h2" className="font-bold tracking-tighter">
          Select Your Seat
        </Typography>
        <Typography variant="p" className="text-zinc-400">
          Please choose an available seat for your flight.
        </Typography>
      </div>
      <div
        className={`grid grid-cols-${maxColumns} grid-rows-${maxRows} gap-2 rounded-md border border-slate-500 p-2`}
      >
        {seats.map((seat) => (
          <button
            key={seat.id}
            style={{ gridArea: `${seat.row} / ${seat.column}` }}
            className={`flex h-10 w-10 items-center justify-center rounded-full 
          ${
            selectedSeatsIds.includes(seat.id)
              ? "bg-green-500 hover:bg-green-500"
              : "bg-slate-500 hover:bg-slate-600"
          }
          ${
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
    </section>
  );
};
