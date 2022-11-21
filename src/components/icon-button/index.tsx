import {IconButton as PrimerIconButton, IconButtonProps} from "@primer/react";

function IconButton(props: IconButtonProps) {
    return (
        <PrimerIconButton
            sx={{
                width: 32,
                height: 32,
                span: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                ':hover': {
                    filter: 'brightness(0.95)',
                },
            }}
            {...props}
        />
    )
}

export { IconButton }