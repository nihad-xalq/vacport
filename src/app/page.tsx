import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/vacancies");
  return null;
}
