"use client";
import { DataTable } from "@/components/tableData";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { fetcher } from "@/lib/graphql/request";
import { MUTATION_AUTH_USER, QUERY_LIST_STATIONS } from "@/lib/graphql/queries";

export const stationColumns: ColumnDef<any>[] = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Station Name",
  },
  {
    accessorKey: "planetName",
    header: "Planet Name",
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Creation Date</div>,
    cell: ({ row }) => {
      const rowDate = row.getValue("createdAt");
      const formatted = new Date(Number(rowDate)).toLocaleString();

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div>Update Date</div>,
    cell: ({ row }) => {
      const rowDate = row.getValue("updatedAt");

      const formatted = new Date(Number(rowDate)).toLocaleString();

      return <div>{formatted}</div>;
    },
  },
];

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [stations, setStations] = useState<any[]>([]);

  const handleGenToken = async () => {
    try {
      const response = await fetcher(MUTATION_AUTH_USER, {
        data: {
          email: "ryann@gmail.com",
          password: "123456789",
        },
      });

      localStorage.setItem("Token", response.data.login.token);

      alert("Token saved");
    } catch (error: any) {
      localStorage.clear();
      alert(error?.message || "Error getting token");
    }
  };
  const handleStationQuery = async () => {
    try {
      setLoading(true);

      const { data } = await fetcher(QUERY_LIST_STATIONS, undefined, {
        credentials: localStorage.getItem("Token") as string,
      });

      setStations(data.listStations ?? []);
    } catch (error: any) {
      alert(error?.message || "Error fetching stations");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col p-4 space-y-5">
        <div className="flex justify-between items-center pb-5">
          <h2 className="font-bold">Example how to use GraphQL</h2>
          <Button onClick={handleGenToken}>Generate token</Button>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h5 className="font-semibold">Query: Station</h5>
            <Button size={"sm"} onClick={handleStationQuery}>
              Fetch
            </Button>
          </div>
          {!loading ? (
            <DataTable columns={stationColumns} data={stations} />
          ) : (
            <div className="flex justify-between items-center my-5">
              Loading...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
