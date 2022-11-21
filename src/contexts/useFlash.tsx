import {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Flash, IconButton, Text, useSafeTimeout} from "@primer/react";
import {XIcon} from "@primer/octicons-react";
import {useLocation} from "react-router";

interface FlashValues {
    onOpen(config: FlashConfig): void
    flashMemo: JSX.Element | undefined
}

interface FlashProviderProps {
    children: ReactNode
}

interface FlashConfig {
    title: string
    variant?:  "success" | "danger" | "default" | "warning"
}

const FlashContext = createContext<FlashValues>({} as FlashValues)

function FlashProvider({ children }: FlashProviderProps) {
    let timeoutId: number | null = null

    const location = useLocation()
    const {safeSetTimeout, safeClearTimeout} = useSafeTimeout()

    const [isOpen, setOpen] = useState(false)
    const [flashConfig, setFlashConfig] = useState<FlashConfig>({} as FlashConfig)


    const onOpen = useCallback((config: FlashConfig) => {
        setOpen(true)
        setFlashConfig(config)

        if (config.variant === 'success') {
            timeoutId = safeSetTimeout(() => setOpen(false), 5000)
        }
    }, [])

    const onClose = useCallback(() => {
        setOpen(false)

        if (timeoutId) {
            safeClearTimeout(timeoutId)
        }
    }, [])

    useEffect(() => {
        if (!isOpen) return

        setOpen(false)

        if (timeoutId) {
            safeClearTimeout(timeoutId)
        }
    }, [location.pathname])

    const flashMemo = useMemo(() => {
        if (!isOpen) return

        return (
            <Flash
                full={true}
                className={"flash-notification"}
                variant={flashConfig.variant}
                sx={{
                    lineHeight: '1.5',
                    fontSize: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text paddingX={2}>
                    {flashConfig.title}
                </Text>

                <IconButton
                    size={"small"}
                    variant={"invisible"}
                    icon={XIcon}
                    onClick={onClose}
                    sx={{
                        width: 32,
                        height: 32,
                        '.octicon-x': { margin: 0 },
                        span: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    }}
                />
            </Flash>
        )
    }, [flashConfig, isOpen])

    return (
        <FlashContext.Provider value={{ onOpen, flashMemo }}>
            {children}
        </FlashContext.Provider>
    )
}

function useFlash() {
    return useContext(FlashContext)
}

export { useFlash, FlashProvider }