import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"

export function ActionsButtons({ children }: React.PropsWithChildren) {

    return (
        <Popover>
            <PopoverTrigger>•••</PopoverTrigger>
            <PopoverContent className="max-w-[160px]">
                {children}
            </PopoverContent>
        </Popover>

    )
}