import { Button } from "@chakra-ui/react"
import { number } from "yup/lib/locale"

interface PaginationItemProps {
    isCurrent?: boolean
    page: number
    onPageChange: (page: number) => void
}

export function PaginationItem({ isCurrent = false, page, onPageChange }: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Button size='sm' fontSize='xs' w='4' colorScheme='pink' disabled
                _disabled={{
                    bgColor: 'pink.500',
                    cursor: 'default',
                }}>
                {page}
            </Button>
        )
    }

    return (
        <Button size='sm' fontSize='xs' w='4' colorScheme='pink' bg='gray.700' _hover={{ bg: 'gray.500' }}
            onClick={() => onPageChange(page)}>
            {page}
        </Button>
    )
}