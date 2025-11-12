'use client'; // <-- Esta linha é CRUCIAL para que a página funcione como um componente do lado do cliente e use o useState, useRouter, etc.

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Importe os componentes do Shadcn UI que você usa na sua página
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link"; // Adicione este import se o link para "Cadastre-se" for um componente do Next.js

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("miyamto.maria30@gmail.com"); // Deixando o email preenchido para facilitar o teste
    const [password, setPassword] = useState("aqui_vai_a_senha_do_banco"); // Deixando a senha preenchida para facilitar o teste. Use a senha real do seu usuário.
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // A chamada real para a API de login do Better Auth
            await authClient.emailAndPassword.signIn({ email, password });
            
            // Em caso de sucesso, redireciona para a página do painel
            router.push('/painel');
        } catch (err: any) {
            console.error(err);
            // Em caso de falha, exibe uma mensagem de erro
            setError('Falha no login. Verifique seu email e senha.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <Card className="mx-auto w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold">Login</CardTitle>
                    <CardDescription>
                        Entre com seu email e senha para acessar o painel.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-2">
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
                            {error && (
                                <p className="text-sm text-red-500 mt-2">{error}</p>
                            )}
                            <Button 
                                type="submit" 
                                className="w-full mt-4" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Carregando...' : 'Entrar'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <div className="text-center text-sm mb-4">
                    Não tem conta? <Link href="/register" className="underline">Cadastre-se</Link>
                </div>
            </Card>
        </main>
    );
}