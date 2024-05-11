import { Metadata } from "next";
import PageRedirect from "./[id]/_page";

export const metadata: Metadata = {
  title: "Docs",
};

export default function Page({ params }: { params: { id: string } }) {
  return <PageRedirect pass="https://scratch-building-docs.vercel.app/" />;
}
