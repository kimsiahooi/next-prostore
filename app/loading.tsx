import Image from "next/image";
import loader from "@/app/assets/loader.gif";

export default function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
      }}>
      <Image src={loader} height={150} width={150} alt="Loading..." />
    </div>
  );
}
