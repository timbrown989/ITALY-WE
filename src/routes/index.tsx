import { createFileRoute } from "@tanstack/react-router";
import { ItalyApp } from "@/components/italy-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ItalyApp />;
}
