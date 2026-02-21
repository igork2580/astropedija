"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button } from "@/components/ui";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Register via API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Greška pri registraciji");
      }

      // Auto-login after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/prijava");
      } else {
        router.push("/profil");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Došlo je do greške");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-border bg-surface p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Registracija</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Ime"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vaše ime"
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vas@email.com"
            required
          />
          <Input
            label="Lozinka"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 karaktera"
            required
          />

          {error && (
            <p className="text-sm text-secondary">{error}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Registracija..." : "Registrujte se"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Već imate nalog?{" "}
          <Link href="/prijava" className="text-primary hover:text-primary-light">
            Prijavite se
          </Link>
        </div>
      </div>
    </div>
  );
}
