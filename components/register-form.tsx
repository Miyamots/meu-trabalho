'use client'
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;

    authClient.signUp.email(
      {
        name: name,
        email: email,
        password: senha
      },
      {
        onSuccess: () => redirect("/login"),
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onError: (ctx) => setError(ctx.error.message)
      }
    );
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nome
        </label>
        <Input 
          id="name"
          name="name" 
          type="text" 
          required 
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <Input 
          id="email"
          name="email" 
          type="email" 
          required 
          placeholder="seu@email.com"
        />
      </div>
      
      <div>
        <label htmlFor="senha" className="block text-sm font-medium mb-2">
          Senha
        </label>
        <Input 
          id="senha"
          name="senha" 
          type="password" 
          required 
          placeholder="••••••••"
          minLength={6}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Spinner /> : "Criar conta"}
      </Button>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </form>
  );
}
