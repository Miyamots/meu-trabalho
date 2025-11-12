'use client'

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner" // Opcional, para exibir mensagens de sucesso/erro

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Chama a função de cadastro do Better Auth
      await authClient.emailAndPassword.signUp({ name, email, password })

      // Se o cadastro for bem-sucedido, redireciona para a página de login
      toast.success("Conta criada com sucesso! Faça login para continuar.")
      router.push("/login")
    } catch (err: any) {
      console.error(err)
      toast.error(
        "Falha ao criar conta. Verifique os dados ou tente novamente mais tarde."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Criar Conta</CardTitle>
          <CardDescription>
            Preencha seus dados para criar uma nova conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleRegister}>
            <div className="grid gap-2">
              <div className="space-y-1">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? "Criando..." : "Criar conta"}
              </Button>
            </div>
          </form>
        </CardContent>
        <div className="text-center text-sm mb-4">
          Já tem conta?{" "}
          <Link href="/login" className="underline">
            Faça login
          </Link>
        </div>
      </Card>
    </main>
  )
}