"use client";

interface SelectSeatsProps {
  seats: {
    id: number;
    row: number;
    column: number;
    code: string;
    isOccupied: boolean;
  }[];
  selectedSeatsIds: (number | undefined)[];
  onSelectSeat: (seatId: number) => void;
}

export const SelectSeats = ({
  seats,
  selectedSeatsIds,
  onSelectSeat,
}: SelectSeatsProps) => {
  const maxRows = Math.max(...seats.map((seat) => seat.row));
  const maxColumns = Math.max(...seats.map((seat) => seat.column));

  return (
    <div
      className={`grid grid-cols-${maxColumns} grid-rows-${maxRows} gap-2 rounded-md border border-slate-500 p-2`}
    >
      {seats.map((seat) => (
        <button
          key={seat.id}
          style={{ gridArea: `${seat.row} / ${seat.column}` }}
          className={`flex h-10 items-center justify-center 
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
          {seat.code}
        </button>
      ))}
    </div>
  );
};
