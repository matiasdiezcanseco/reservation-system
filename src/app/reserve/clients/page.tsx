"use client";
import { type FormEvent, useEffect, useState } from "react";
import { Typography } from "../../_components/ui/typography";
import { useSearchParams } from "next/navigation";
import { api } from "../../../trpc/react";
import type { Seat } from "../../../server/api/routers/flight";
import { v4 as uuidv4 } from "uuid";
import { Input } from "../../_components/ui/input";
import { Button } from "../../_components/ui/button";
export interface Client {
  id: string;
  name: string;
  lastName: string;
  email: string;
  passport: string;
  seat: Seat;
}

const ClientForm = ({
  selectedClientId,
  clients,
  onFormSubmit,
}: {
  selectedClientId: Client["id"];
  clients: Client[];
  onFormSubmit: (client: Client) => void;
}) => {
  const [formData, setFormData] = useState<Client>();

  useEffect(() => {
    const client = clients.find((client) => client.id === selectedClientId);
    if (client) setFormData(client);
  }, [selectedClientId, clients]);

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    onFormSubmit(formData);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Typography variant="p">Name</Typography>
          <Input
            type="text"
            className="rounded-md border border-zinc-300 p-2"
            name="name"
            value={formData?.name}
            onChange={onChangeField}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="p">Last name</Typography>
          <Input
            type="text"
            className="rounded-md border border-zinc-300 p-2"
            name="lastName"
            value={formData?.lastName}
            onChange={onChangeField}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Typography variant="p">Email</Typography>
          <Input
            type="text"
            className="rounded-md border border-zinc-300 p-2"
            name="email"
            value={formData?.email}
            onChange={onChangeField}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="p">Passport</Typography>
          <Input
            type="text"
            className="rounded-md border border-zinc-300 p-2"
            name="passport"
            value={formData?.passport}
            onChange={onChangeField}
          />
        </div>
      </div>
      <Button>Save</Button>
    </form>
  );
};

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

  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<Client["id"]>();

  useEffect(() => {
    if (clients.length > 0) return;
    const auxClients: Client[] = [];
    selectedSeats?.forEach((seat) => {
      auxClients.push({
        id: uuidv4(),
        name: "",
        lastName: "",
        email: "",
        passport: "",
        seat,
      });
    });
    setClients(auxClients);
  }, [seatsData, selectedSeats]);

  const onSelectClientToEdit = (id: Client["id"]) => {
    if (selectedClientId === id) setSelectedClientId(undefined);
    else setSelectedClientId(id);
  };

  const onFormSubmit = (client: Client) => {
    console.log(client);
    const index = clients.findIndex((client) => client.id === selectedClientId);
    const auxClients = [...clients];
    auxClients[index] = client;
    setClients(auxClients);
    setSelectedClientId(undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Typography variant="h3" className="font-bold tracking-tighter">
          Complete your reservation
        </Typography>
        <Typography variant="p" className="text-zinc-400">
          Please enter the information for the passengers.
        </Typography>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          {clients.map((client) => (
            <button
              key={client.seat.id}
              className="flex flex-col gap-2 rounded-md border border-zinc-300 p-4 hover:bg-zinc-800/80"
              onClick={() => onSelectClientToEdit(client.id)}
            >
              <Typography variant="p">
                Asiento {client.seat.seatCode}
              </Typography>
              {client.name && (
                <Typography variant="p">
                  Nombre: {client.name} {client.lastName}
                </Typography>
              )}
            </button>
          ))}
        </div>
        {selectedClientId && (
          <ClientForm
            clients={clients}
            selectedClientId={selectedClientId}
            onFormSubmit={onFormSubmit}
          />
        )}
      </div>
    </div>
  );
}
