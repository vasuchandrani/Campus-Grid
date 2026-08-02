import { LoginForm } from "./components/LoginForm";
import { LoginHeroBanner } from "./components/LoginHeroBanner";

export function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <LoginForm />
      <LoginHeroBanner />
    </div>
  );
}
