"use client";

import dataJson from "./json_data.json";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

type Person = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
};
export default function Page() {
  const [data, setData] = useState<Person[]>(dataJson);

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (
    id: number,
    field: keyof Omit<Person, "id">,
    value: string
  ) => {
    setData(
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex">
          <div className="w-1/4">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  {(
                    [
                      "first_name",
                      "last_name",
                      "email",
                      "gender",
                      "ip_address",
                    ] as const
                  ).map((field) => (
                    <TableCell key={field}>
                      <Input
                        value={item[field]}
                        onChange={(e) =>
                          handleChange(item.id, field, e.target.value)
                        }
                        className="w-full"
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="destructive"
                      size="icon"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
