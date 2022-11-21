import { NavList } from '@primer/react'
import { useLocation } from 'react-router'
import {Link} from "react-router-dom";

interface NavListItemProps {
    href: string
    label: string
}

export function NavListItem({ href, label }: NavListItemProps) {
    const location = useLocation()

    const current = location.pathname.startsWith(href) && 'page'

    return (
        <NavList.Item as={Link} to={href} aria-current={current}>
            {label}
        </NavList.Item>
    )
}
