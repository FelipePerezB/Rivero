"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import addAdmin from "./actions/add-admin";

export default function AddAdminBtn() {
  return (
    <form action={addAdmin} className="flex gap-3">
      <input
        className="border rounded p-1 outline-blue-500"
        placeholder="juan@gmail.com"
        name="email"
      />
      <button title="Añadir">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
}
