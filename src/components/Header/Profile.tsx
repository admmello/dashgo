import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

interface ProfileProps {
    showProfileData: boolean
}

export function Profile({ showProfileData }: ProfileProps) {
    return (
        <Flex align='center'>
            {showProfileData &&
                <Box mr='4' textAlign='right'>
                    <Text>Alex Mello</Text>
                    <Text color='gray.300' fontSize='small'>
                        admmello@gmail.com
                    </Text>
                </Box>
            }

            <Avatar size='md' name='Alex Mello' />
        </Flex>
    )
}