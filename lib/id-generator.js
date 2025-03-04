import { useCurrentUser } from "@/hooks/useCurrentUser";

export function idGenerator() {
  return Math.floor(Math.random() * 1000001).toString();
}
