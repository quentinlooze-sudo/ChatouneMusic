import { MoodProvider } from "@/lib/MoodContext";

export default function FlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MoodProvider>{children}</MoodProvider>;
}
