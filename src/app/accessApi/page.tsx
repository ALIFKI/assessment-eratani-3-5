"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  gender: string;
  status: "active" | "inactive";
};
const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(
        "https://gorest.co.in/public/v2/users"
      );
      setUsers(response.data);
      setLoading(false);
    } catch (err: unknown) {
      setError("Failed to fetch users. : " + err);
      setLoading(false);
    }
  };

  const renderTableContent = () => {
    if (loading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[250px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-[80px] rounded-full" />
          </TableCell>
        </TableRow>
      ));
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="text-center text-red-500">
            {error}
          </TableCell>
        </TableRow>
      );
    }

    return users.map((user, index) => (
      <TableRow key={index}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.gender}</TableCell>
        <TableCell>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              user.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </span>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto py-10">
          <Table className="w-full">
            <TableHeader className="border-grey border-[1px] w-full">
              <TableRow className="border-grey border-[1px]">
                <TableHead className="border-grey border-[1px]">Name</TableHead>
                <TableHead className="border-grey border-[1px]">
                  Email
                </TableHead>
                <TableHead className="border-grey border-[1px]">
                  Gender
                </TableHead>
                <TableHead className="border-grey border-[1px]">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderTableContent()}</TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Page;
