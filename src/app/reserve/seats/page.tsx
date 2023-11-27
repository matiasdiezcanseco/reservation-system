"use client";
import { SelectSeats } from "../../components/select-seats";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "../../../trpc/react";
import { Spinner } from "../../components/ui/spinner";
import { AlertBar } from "../../components/alert-bar";

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

export default function Seats() {
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

  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 p-2">
      {flightId ? (
        <>
          {isLoading && <Spinner />}
          {!isLoading && (
            <>
              <div className="flex w-full gap-4">
                <SelectSeats
                  seats={seatsData ?? []}
                  onConfirmSeats={(seatsIds) =>
                    router.push(
                      `/reserve/clients?flightId=${flightId}&seats=${seatsIds.join(
                        ",",
                      )}`,
                    )
                  }
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
        </>
      ) : (
        <AlertBar
          variant="destructive"
          title="There was an error"
          description="There is no flight selected."
        />
      )}
    </div>
  );
}
