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
import { handleUpload } from "@/service/files";
import { useUpdateMovieMutation } from "@/service/movies/mutations";
import { MovieGenre, type Movie } from "@/service/movies/types";
import { useMovieStore } from "@/store/movie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DatePicker } from "./ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { UploadInput } from "./ui/upload";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { movieGenresOptions } from "@/service/movies/data";

const formSchema = z.object({
  title: z.string({ required_error: "Campo obrigatório" }).min(2, {
    message: "O título deve conter no mínimo 2 caracteres",
  }),
  originalTitle: z.string({ required_error: "Campo obrigatório" }).min(2, {
    message: "O título original deve conter no mínimo 2 caracteres",
  }),
  description: z.string({ required_error: "Campo obrigatório" }),
  releaseDate: z.date({ required_error: "Campo obrigatório" }),
  budget: z
    .number({ required_error: "Campo obrigatório" })
    .min(1, { message: "O orçamento deve ser maior que 1" }),
  imageUrl: z.string({ required_error: "Campo obrigatório" }).url({
    message: "A URL da imagem deve ser válida",
  }),
  duration: z
    .number({ required_error: "Campo obrigatório" })
    .min(1, { message: "O orçamento deve ser maior que 1" }),
  genre: z.nativeEnum(MovieGenre, {
    required_error: "Campo obrigatório",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface Props {
  movie: Movie;
}

export function UpdateMovieFormDialog({ movie }: Props) {
  const {
    id,
    title,
    originalTitle,
    description,
    budget,
    imageUrl,
    duration,
    releaseDate,
    genre,
  } = movie;

  const queryClient = useQueryClient();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      originalTitle,
      description,
      budget: Number(budget),
      imageUrl,
      duration,
      releaseDate: new Date(releaseDate),
      genre,
    },
  });

  const selectMovie = useMovieStore((state) => state.setSelected);

  function onOpenChange(open: boolean) {
    if (!open) {
      selectMovie(null);
    }
  }

  const { mutateAsync, isPending } = useUpdateMovieMutation(id, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      onOpenChange(false);
      form.reset();
    },
  });

  function onSubmit(values: FormSchemaType) {
    const dateToString = values.releaseDate.toISOString();

    toast.promise(() => mutateAsync({ ...values, releaseDate: dateToString }), {
      success: "Filme Atualizado com sucesso",
      loading: "Carregando...",
      error: "Houve um erro ao atualizar o filme. Tente novamente mais tarde",
    });
  }

  async function uploadService(file: File, onChange: (value: string) => void) {
    try {
      const { url } = await handleUpload(file);

      onChange(url);

      return { success: true, url };
    } catch (_error) {
      toast.error(
        "Erro ao fazer upload da imagem. Tente novamente mais tarde."
      );
      return { success: false };
    }
  }

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Editar Filme</DialogTitle>
          <DialogDescription>
            Atualize as informações do filme preenchendo os campos abaixo.
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
                      <DatePicker {...field} />
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
                name="duration"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração (minutos)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Digite a duração"
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
                    <UploadInput
                      uploadService={(file) =>
                        uploadService(file, field.onChange)
                      }
                      acceptedFileTypes=".jpg,.jpeg,.png"
                      customFileName="capa"
                      maxFiles={1}
                      initialFileKeys={field.value ? [field.value] : []}
                    />
                    <FormControl>
                      <Input
                        type="hidden"
                        placeholder="Digite a imagem"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gênero</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o gênero" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {movieGenresOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

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
