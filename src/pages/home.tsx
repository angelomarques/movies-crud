import { CreateMovieFormDialog } from "@/components/create-movie-form-dialog";
import { FilterFormDialog } from "@/components/filter-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateMovieFormDialog } from "@/components/update-movie-form-dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { formatBRL, getDurationCategoryLabel } from "@/lib/utils";
import { useGetMoviesQuery } from "@/service/movies/queries";
import type { DurationCategory, Movie } from "@/service/movies/types";
import { useMovieStore } from "@/store/movie";
import type {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";

const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: "title",
    header: () => {
      return <div>Título</div>;
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "budget",
    enableHiding: true,
    header: () => <div className="text-right">Orçamento</div>,
    cell: ({ row }) => {
      const budget = formatBRL(parseFloat(row.getValue("budget")));

      return <div className="text-right font-medium">{budget}</div>;
    },
  },
  {
    accessorKey: "duration",
    enableHiding: true,
    header: () => <div className="text-right">Duração (minutos)</div>,
    cell: ({ row }) => {
      const duration = parseFloat(row.getValue("duration"));

      return <div className="text-right font-medium">{duration}</div>;
    },
  },
  {
    accessorKey: "releaseDate",
    header: () => <div className="text-right">Data de Lançamento</div>,
    cell: ({ row }) => {
      const releaseDate = format(new Date(row.getValue("releaseDate")), "PPP", {
        locale: ptBR,
      });

      return <div className="text-right font-medium">{releaseDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: (row) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const selectMovie = useMovieStore((state) => state.setSelected);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => selectMovie(row.row.original)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>Visualizar</DropdownMenuItem>
            <DropdownMenuItem>Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function HomePage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [startDate, setStartDate] = useQueryState("startDate");
  const [endDate, setEndDate] = useQueryState("endDate");
  const [durationCategory, setDurationCategory] =
    useQueryState("durationCategory");
  const [searchTitle, setSearchTitle] = useQueryState("search");
  const searchTitleValue = useDebounce(searchTitle);

  const selectedMovie = useMovieStore((state) => state.selected);

  const { data: moviesQuery } = useGetMoviesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    startDate: startDate ?? undefined,
    endDate: endDate ?? undefined,
    durationCategory: durationCategory as DurationCategory | undefined,
    search: searchTitleValue ?? undefined,
  });

  const table = useReactTable({
    data: moviesQuery?.data || [],
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: moviesQuery?.meta?.total,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  function clearFilters() {
    setStartDate(null);
    setEndDate(null);
    setDurationCategory(null);
  }

  return (
    <div className="px-2 mt-5 max-w-6xl mx-auto">
      <h1 className="font-semibold text-3xl">Gerenciar Filmes</h1>

      <div className="flex items-center py-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Pesquisar título..."
            value={searchTitle ?? ""}
            onChange={(event) => setSearchTitle(event.target.value)}
            className="max-w-sm"
          />

          <FilterFormDialog
            key={`${startDate}-${endDate}-${durationCategory}`}
          />
        </div>

        <div className="flex gap-2 ml-auto">
          <CreateMovieFormDialog />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Colunas <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {startDate || endDate || durationCategory ? (
        <div className="mb-3 divide-y flex gap-3 items-center">
          <Button variant="secondary" onClick={clearFilters}>
            Limpar filtros de busca
          </Button>

          {!!startDate && (
            <Badge>
              Data de Lançamento mínima:{" "}
              {format(new Date(startDate), "PPP", {
                locale: ptBR,
              })}
            </Badge>
          )}

          {!!endDate && (
            <Badge>
              Data de Lançamento máxima:{" "}
              {format(new Date(endDate), "PPP", {
                locale: ptBR,
              })}
            </Badge>
          )}

          {!!durationCategory && (
            <Badge>
              Duração:{" "}
              {getDurationCategoryLabel(durationCategory as DurationCategory)}
            </Badge>
          )}
        </div>
      ) : null}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Página {pagination.pageIndex + 1} de{" "}
          {moviesQuery?.meta?.totalPages || 0}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {selectedMovie && (
        <UpdateMovieFormDialog movie={selectedMovie} key={selectedMovie.id} />
      )}
    </div>
  );
}
