'use client'

import { Table as ChakraTable, Flex, HStack, Skeleton, Stack, Text } from '@chakra-ui/react'
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { type ReactNode, useState } from 'react'
import { IconActionButton } from '../Buttons'
import { ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from '../Icons'

export type TData = Record<never, unknown>

interface ITableProps<RowDataType extends TData> {
  columns: ColumnDef<RowDataType>[]
  data: RowDataType[]
  loading: boolean
}

const SORTED_ICONS: Record<string, ReactNode> = {
  asc: <ArrowUpIcon height="2" width="2" />,
  desc: <ArrowDownIcon height="2" width="2" />
}

export function Table<RowDataType extends TData>({ columns, data, loading }: ITableProps<RowDataType>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns,
    data,
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting }
  })

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows
  const { pageIndex } = table.getState().pagination
  const totalPages = table.getPageCount()
  const paginationText = totalPages > 0 ? `Page ${pageIndex + 1} of ${totalPages}` : ''

  return (
    <Stack my="5">
      <Flex direction="column" align="center" minWidth={table.getCenterTotalSize()} width="100%">
        <ChakraTable.ScrollArea
          roundedTop="25px"
          width="full"
          borderTop="1px solid"
          borderLeft="1px solid"
          borderRight="1px solid"
          borderColor="table-border"
          background="table-background"
        >
          <ChakraTable.Root>
            <ChakraTable.Header>
              {headerGroups.map((headerGroup) => (
                <ChakraTable.Row key={headerGroup.id} background="table-outer-background">
                  {headerGroup.headers.map((header) => (
                    <ChakraTable.ColumnHeader
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      <HStack
                        align="center"
                        justify="start"
                        cursor={header.column.getCanSort() ? 'pointer' : undefined}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <Text>{SORTED_ICONS[(header.column.getIsSorted() as string) ?? '']}</Text>
                      </HStack>
                    </ChakraTable.ColumnHeader>
                  ))}
                </ChakraTable.Row>
              ))}
            </ChakraTable.Header>
            <ChakraTable.Body>
              {loading
                ? Array.from(Array(7).keys()).map((rowIndex) => (
                    <ChakraTable.Row key={`skeleton-${rowIndex}`} background="table-background">
                      {headerGroups[0]?.headers.map((header, cellIndex) => (
                        <ChakraTable.Cell key={`skeleton-${rowIndex}-${cellIndex}`} style={{ width: header.getSize() }}>
                          <Skeleton height="20px" />
                        </ChakraTable.Cell>
                      ))}
                    </ChakraTable.Row>
                  ))
                : rows.map((row) => (
                    <ChakraTable.Row key={row.id} background="table-background">
                      {row.getVisibleCells().map((cell) => (
                        <ChakraTable.Cell key={cell.id} style={{ width: cell.column.getSize() }}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </ChakraTable.Cell>
                      ))}
                    </ChakraTable.Row>
                  ))}
            </ChakraTable.Body>
          </ChakraTable.Root>
        </ChakraTable.ScrollArea>

        <Flex
          align="center"
          justify="space-between"
          mt={0}
          width="100%"
          background="table-outer-background"
          borderBottom="1px solid"
          borderLeft="1px solid"
          borderRight="1px solid"
          borderColor="table-border"
          roundedBottom="25px"
          px={5}
          py={3}
        >
          <IconActionButton
            disabled={!table.getCanPreviousPage()}
            rounded="full"
            height="32px"
            icon={<ChevronLeftIcon height="4" width="4" />}
            onClickHandler={() => table.previousPage()}
          />
          <Text>{paginationText}</Text>
          <IconActionButton
            disabled={!table.getCanNextPage()}
            rounded="full"
            height="32px"
            icon={<ChevronRightIcon height="4" width="4" />}
            onClickHandler={() => table.nextPage()}
          />
        </Flex>
      </Flex>
    </Stack>
  )
}
