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
import { useSignUpMutation } from "@/service/auth/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string({ required_error: "Campo obrigatório" }).min(2, {
      message: "O nome deve conter no mínimo 2 caracteres",
    }),
    email: z
      .string({ required_error: "Campo obrigatório" })
      .email("Email inválido"),
    password: z.string({ required_error: "Campo obrigatório" }).min(6, {
      message: "A senha deve conter no mínimo 6 caracteres",
    }),
    confirmPassword: z.string({ required_error: "Campo obrigatório" }).min(6, {
      message: "A senha deve conter no mínimo 6 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

export function SignUpPage() {
  const navigate = useNavigate();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending } = useSignUpMutation({
    onSuccess: () => {
      navigate("/login");
    },
  });

  function onSubmit(values: FormSchemaType) {
    toast.promise(() => mutateAsync(values), {
      success: "Cadastro realizado com sucesso",
      loading: "Carregando...",
      error:
        "Houve um erro ao realizar o seu cadastro. Tente novamente mais tarde",
    });
  }

  return (
    <div className="mx-auto max-w-2xl px-2 mt-5">
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar-se</CardTitle>
          <CardDescription>
            Digite seus dados para se cadastrar na plataforma
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
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

              <FormField
                control={form.control}
                name="confirmPassword"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Repita sua senha"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button disabled={isPending} type="submit" className="ml-auto">
                Cadastrar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
