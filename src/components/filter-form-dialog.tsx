import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getDurationCategoryLabel } from "@/lib/utils";
import type { DurationCategory } from "@/service/movies/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "./ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  durationCategory: z.enum(["short", "medium", "long"]).optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function FilterFormDialog() {
  const [startDate, setStartDate] = useQueryState("startDate");
  const [endDate, setEndDate] = useQueryState("endDate");
  const [durationCategory, setDurationCategory] =
    useQueryState("durationCategory");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      durationCategory: (durationCategory as DurationCategory) || undefined,
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  function onSubmit(values: FormSchemaType) {
    values.startDate?.setHours(0, 0);
    values.endDate?.setHours(23);
    values.endDate?.setMinutes(59);

    const startDateString = values.startDate?.toISOString() ?? null;
    const endDateString = values.endDate?.toISOString() ?? null;

    setStartDate(startDateString);
    setEndDate(endDateString);
    setDurationCategory(
      values.durationCategory ? String(values.durationCategory) : null
    );

    setIsOpen(false);
    form.reset({
      startDate: values.startDate,
      endDate: values.endDate,
      durationCategory: values.durationCategory,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Filtrar por</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar por</DialogTitle>
          <DialogDescription>
            Selecione os filtros desejados para encontrar o filme
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
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de lançamento Mínima</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de lançamento Máxima</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="durationCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a duração" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short">
                          {getDurationCategoryLabel("short")}
                        </SelectItem>
                        <SelectItem value="medium">
                          {getDurationCategoryLabel("medium")}
                        </SelectItem>
                        <SelectItem value="long">
                          {getDurationCategoryLabel("long")}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="ml-auto">
                Aplicar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
