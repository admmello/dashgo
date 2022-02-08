import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react"
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "react-query"
import Link from "next/link"
import { useRouter } from "next/router"

import { Input } from "../../components/Forms/Input"
import { Sidebar } from "../../components/Sidebar"
import { Header } from "../../components/Header"
import { api } from "../../services/api"
import { queryClient } from "../../services/queryClients"
import { GetServerSideProps } from "next"
import { getUser } from "../../services/hooks/useUsers"

type UserCreateFormData = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

const userCreateFormSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha é obrigatória').min(6, 'Mínimo de 6 caracteres'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function UserCreate() {
    const router = useRouter()

    const createUser = useMutation(async (user: UserCreateFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                create_at: new Date(),
            }
        })

        return response.data
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        }
    })

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(userCreateFormSchema)
    })
    const { errors } = formState

    const handleUserCreate: SubmitHandler<UserCreateFormData> = async (values) => {
        await createUser.mutateAsync(values)

        router.push('/users')
    }

    return (
        <Box>
            <Header />

            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />

                <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6', '8']} onSubmit={handleSubmit(handleUserCreate)}>
                    <Heading size='lg' fontWeight='normal'>Criar usuário</Heading>

                    <Divider my='6' borderColor='gray.700' />

                    <VStack spacing='8'>
                        <SimpleGrid minChildWidth={240} spacing={['6', '8']} w='100%'>
                            <Input name='name' label='Nome completo' {...register('name')} error={errors.name} />
                            <Input name='email' type='email' label='E-mail' {...register('email')} error={errors.email} />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth={240} spacing={['6', '8']} w='100%'>
                            <Input name='password' type='password' label='Senha' {...register('password')} error={errors.password} />
                            <Input name='password_confirmation' type='password' label='confirmação da senha'
                                {...register('password_confirmation')} error={errors.password_confirmation} />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt='8' justify='flex-end'>
                        <HStack spacing='4'>
                            <Link href='/users' passHref>
                                <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
                            </Link>
                            <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>

    )
}