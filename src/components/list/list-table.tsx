import { get } from 'lodash'
import React, {HTMLProps, useCallback} from 'react'
import * as S from './styles'

// Styles

// Features

export type TableHeader<T extends Object> = {
  label: string
  accessor: keyof T
  isAction?: boolean
  fn?: (value: any, data: T) => any
}

interface Props<T extends Object>{
  data?: T[]
  isLoading?: boolean
  headers: TableHeader<T>[]
    testId?: string
}

function ListTable<T extends Object>({
  headers,
  data,
  isLoading,
     testId,
}: Props<T>) {
  const getCellValue = useCallback(
    (row: T, accessor: keyof T, fn?: (value: any, data: T) => any) => {
      const value = get(row, accessor)

      return fn ? fn(value, row) : value
    },
    [],
  )

  return (
    <S.Table data-testid={testId}>
      <S.Thead>
        <S.Tr>
          {headers.map(({ label }) => (
            <S.Th key={label}>{label}</S.Th>
          ))}
        </S.Tr>
      </S.Thead>

      <S.Tbody>
        {!isLoading &&
          data?.map((row, index) => (
            <S.Tr key={get(row, 'id', index)}>
              {headers.map(({ accessor, fn, isAction = false }) => (
                <S.Td key={String(accessor)} className={isAction ? 'td-action' : ''}>
                  {getCellValue(row, accessor, fn)}
                </S.Td>
              ))}
            </S.Tr>
          ))}
      </S.Tbody>
    </S.Table>
  )
}

export { ListTable }
