"use client";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "@/context/ModalContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { UserProvider } from "@/context/UserContext";
import InitializeData from "./InitializeData";
import { DnDProvider } from "@/context/DnDContext";

export default function Providers({
  boards,
  children,
}: {
  boards: { id: string; name: string }[] | undefined;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DnDProvider>
        <ModalProvider>
          <UserProvider>
            <InitializeData boards={boards} />
            <SettingsProvider>{children}</SettingsProvider>
          </UserProvider>
        </ModalProvider>
      </DnDProvider>
    </SessionProvider>
  );
}
