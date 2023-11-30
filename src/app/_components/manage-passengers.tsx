import type { Passenger } from "../reserve/seats/page";
import { Input } from "./ui/input";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import type { FormEvent } from "react";
import { Label } from "./ui/label";

interface ManagePassengersProps {
  passengers: Passenger[];
  selectedPassengerId: Passenger["id"];
  onSelectPassenger: (passengerId: Passenger["id"]) => void;
  onAddPassenger: (passenger: Passenger) => void;
}

const ManagePassengers: React.FC<ManagePassengersProps> = ({
  passengers,
  selectedPassengerId,
  onSelectPassenger,
  onAddPassenger,
}) => {
  const selectedPassenger = passengers.find(
    (passenger) => passenger.id === selectedPassengerId,
  );

  const submitPassenger = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, lastName } = e.target as typeof e.target & {
      name: { value: string };
      lastName: { value: string };
    };
    const randomId = Math.floor(Math.random() * 1000).toString();
    onAddPassenger({
      id: randomId,
      name: name.value,
      lastName: lastName.value,
      seatId: undefined,
    });
  };

  return (
    <section>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => submitPassenger(e)}
      >
        <Typography variant="h3">Add passenger</Typography>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" />
          <Label htmlFor="lastName">Last name</Label>
          <Input type="text" id="lastName" name="lastName" />
        </div>
        <Button type="submit">Add passenger</Button>
      </form>
      <Typography variant="p" fontSize="large">
        Select passenger
      </Typography>
      <Typography variant="p" fontSize="small">
        Selected passenger: {selectedPassenger?.name}{" "}
        {selectedPassenger?.lastName}
      </Typography>
      <ul className="flex flex-col gap-2">
        {passengers.map((passenger) => (
          <li key={passenger.id}>
            <button
              className="rounded-md bg-slate-500 p-2 hover:bg-slate-600"
              onClick={() => onSelectPassenger(passenger.id)}
            >
              {passenger.name} {passenger.lastName}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ManagePassengers;
