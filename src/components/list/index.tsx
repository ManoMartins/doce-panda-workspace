import React from 'react'
import { ListWrapper } from "./styles";

interface Props {
  children: React.ReactNode
}

export function List({ children }: Props) {
  return (
    <ListWrapper>
      {children}
    </ListWrapper>
  )
}
