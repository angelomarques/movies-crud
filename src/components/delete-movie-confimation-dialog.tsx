import { useMovieStore } from "@/store/movie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useDeleteMovieMutation } from "@/service/movies/mutations";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  movieId: string;
}

export function DeleteConfirmationDialog({ movieId }: Props) {
  const setMovieToDelete = useMovieStore((state) => state.setToDelete);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useDeleteMovieMutation(movieId, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      onOpenChange(false);
    },
  });

  function onOpenChange(open: boolean) {
    if (!open) {
      setMovieToDelete(null);
    }
  }

  function deleteMovie() {
    toast.promise(() => mutateAsync(undefined), {
      success: "Filme Removido com sucesso",
      loading: "Carregando...",
      error: "Houve um erro ao remover o filme. Tente novamente mais tarde",
    });
  }

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmação de Exclusão</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir este filme? Esta ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isPending} onClick={deleteMovie}>
            Excluir
          </Button>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
