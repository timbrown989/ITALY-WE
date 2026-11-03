import { createFileRoute } from "@tanstack/react-router";
import { ItalyApp } from "@/components/italy-app";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return <ItalyApp />;
}
