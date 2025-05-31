import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateMovieMutation } from "@/service/movies/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string({ required_error: "Campo obrigatório" }).min(2, {
    message: "O título deve conter no mínimo 2 caracteres",
  }),
  originalTitle: z.string({ required_error: "Campo obrigatório" }).min(2, {
    message: "O título original deve conter no mínimo 2 caracteres",
  }),
  description: z.string({ required_error: "Campo obrigatório" }),
  releaseDate: z.string({ required_error: "Campo obrigatório" }),
  budget: z
    .number({ required_error: "Campo obrigatório" })
    .min(1, { message: "O orçamento deve ser maior que 1" }),
  imageUrl: z.string({ required_error: "Campo obrigatório" }).url({
    message: "A URL da imagem deve ser válida",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function CreateMovieFormDialog() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      originalTitle: "",
      description: "",
      releaseDate: "",
      budget: 0,
      imageUrl: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const { mutateAsync, isPending } = useCreateMovieMutation({
    onSuccess: () => {
      closeModal();
      form.reset();
    },
  });

  function onSubmit(values: FormSchemaType) {
    toast.promise(() => mutateAsync(values), {
      success: "Filme Cadastrado realizado com sucesso",
      loading: "Carregando...",
      error: "Houve um erro ao cadastrar o filme. Tente novamente mais tarde",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Criar Filme</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Filme</DialogTitle>
          <DialogDescription>
            Digite os dados do filme para cadastrá-lo na plataforma
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-10 mt-5"
          >
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o título" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="originalTitle"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título Original</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite título original" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite a descrição"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="releaseDate"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de lançamento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a Data de lançamento"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orçamento</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Digite o orçamento"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a imagem" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button disabled={isPending} type="submit" className="ml-auto">
                Cadastrar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
