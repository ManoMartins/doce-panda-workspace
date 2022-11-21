import styled from "styled-components";

export const ListWrapper = styled.div`
    border-radius: 0.5rem;
    padding: 1rem 1.5rem;
    border: 1px solid #EEEEED;
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`

export const Thead = styled.thead``

export const Tbody = styled.tbody``

export const Tr = styled.tr`
    border-color: #EEEEED;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  
  .td-action {
    text-align: right;
    max-width: 120px;
    width: 80px;
  }
`

export const Td = styled.td`
    padding: 1rem 1.5rem;
    border-color: #EEEEED;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  font-size: 0.875rem;
`

export const Th = styled.th`
    font-weight: 600;
    text-transform: uppercase;
    text-align: start;
    font-size: 0.875rem;
    color: #4A5568;
    padding: 0.875rem 1.5rem;
    border-color: #EDF2F7;
    border-bottom-width: 1px;
    border-bottom-style: solid;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  margin-bottom: 2rem;
  
  h2 > {
    font-size: 1.125rem;
  }
`
