import Image from "next/image";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-white p-8">
        <Image src="/logo-icon.png" alt="" width={48} height={49} />
        <h1 className="mt-4 text-2xl font-extrabold">Admin sign in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
