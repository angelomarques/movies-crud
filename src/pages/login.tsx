import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/service/auth/mutations";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email("Email inválido"),
  password: z.string({ required_error: "Campo obrigatório" }).min(6, {
    message: "A senha deve conter no mínimo 6 caracteres",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending } = useLoginMutation({
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/");
    },
  });

  function onSubmit(values: FormSchemaType) {
    toast.promise(() => mutateAsync(values), {
      success: "Login realizado com sucesso",
      loading: "Carregando...",
      error: "Houve um erro ao realizar o login. Tente novamente mais tarde",
    });
  }

  return (
    <div className="mx-auto max-w-2xl px-2 mt-5">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Digite seus dados para entrar na plataforma
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu email cadastrado"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-sm text-right text-muted-foreground">
                Não possui conta?{" "}
                <Link to="/sign-up" className="underline">
                  Cadastre-se
                </Link>
              </p>
            </CardContent>

            <CardFooter>
              <Button disabled={isPending} type="submit" className="ml-auto">
                Entrar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
