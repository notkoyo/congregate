import AuthForm from "@/components/auth-components/AuthForm";
import { NavigationBar } from "@/components/navigation/NavigationBar";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <div className="min-h-screen grid place-items-center">
        <AuthForm />
      </div>
    </>
  );
}
