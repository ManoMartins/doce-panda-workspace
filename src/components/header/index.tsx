import {
  Autocomplete,
  FormControl,
  Header as PrimerHeader,
  IconButton,
} from '@primer/react'
import { FiShoppingCart } from 'react-icons/fi'

export function Header() {
  return (
    <PrimerHeader>
      <PrimerHeader.Item>
        <PrimerHeader.Link href="/">
          <span>Doce panda</span>
        </PrimerHeader.Link>
      </PrimerHeader.Item>

      <PrimerHeader.Item>
        <PrimerHeader.Link href="/">Cardápio</PrimerHeader.Link>
      </PrimerHeader.Item>

      <PrimerHeader.Item full>
        <FormControl>
          <Autocomplete>
            <Autocomplete.Input placeholder="Procure por bolos, donuts..." />
            <Autocomplete.Overlay>
              <Autocomplete.Menu
                items={[
                  { text: 'css', id: 0 },
                  { text: 'css-in-js', id: 1 },
                  { text: 'styled-system', id: 2 },
                  { text: 'javascript', id: 3 },
                  { text: 'typescript', id: 4 },
                  { text: 'react', id: 5 },
                  { text: 'design-systems', id: 6 },
                ]}
                selectedItemIds={[]}
              />
            </Autocomplete.Overlay>
          </Autocomplete>
        </FormControl>
      </PrimerHeader.Item>

      <PrimerHeader.Item>
        <PrimerHeader.Link href="/profile">
          Olá, Manoel Martins
        </PrimerHeader.Link>
      </PrimerHeader.Item>

      <PrimerHeader.Item>
        <PrimerHeader.Link href="/checkout">
          <IconButton
            aria-label="Carrinho de compra"
            icon={Icon}
            sx={{
              width: 32,
              height: 32,
              span: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              ':hover': {
                filter: 'brightness(0.9)',
              },
            }}
          />
        </PrimerHeader.Link>
      </PrimerHeader.Item>
    </PrimerHeader>
  )
}

function Icon() {
  return <FiShoppingCart size={20} />
}
