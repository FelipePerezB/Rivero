"use client";
import { clerkClient } from "@clerk/nextjs";
import Button from "@components/common/buttons/button/button";
import { Role } from "@prisma/client";
import React from "react";
import removeAdmin from "src/actions/user/remove-admin";

export default function RemoveAdmin({ id }: { id: string }) {
  return id ? (
    <form action={() => removeAdmin(id)}>
      <Button type="submit" color="white">
        Remover administrador
      </Button>
    </form>
  ) : (
    <></>
  );
}
