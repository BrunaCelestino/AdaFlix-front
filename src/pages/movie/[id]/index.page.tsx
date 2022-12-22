import { useMovieId } from "../../../api/movies";
import { useRouter } from 'next/router';
import { IMovies } from "../../../api/interfaces/movies";
import { Flex, Stack, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { DynamicIcon } from "../../../components/DynamicIcon";

export default function Details() {
    const { asPath, pathname } = useRouter();
    const [show, setShow] = useState(false)

    const movieId = useMovieId(asPath.split("/")[2]);
    const movie: IMovies = movieId.movies?.data
    return (
        <Flex direction="column" justifyContent="center">
            <Flex bgColor="black" p="24px" justifyContent="center"><Text color="white" fontSize="32px" fontWeight="bold" >ADAFLIX</Text>
            </Flex>
            {movie &&
                <Stack mt="60px" px="200px">
                    <Flex justifyContent="center" >
                        <Flex w="100%" mr="24px">
                            {movie.tag.includes("link:") ? <Image w="100%" h="360px" src={movie.tag.split("link:")[1]} /> : <Image h="360px" src={`../images/${movie.tag}.jpg`} />}
                        </Flex>


                        <Flex direction="column" justifyContent="space-between">
                            <Flex direction="column" gap="8px">
                                <Text fontWeight={"bold"} textAlign="center" fontSize="24px" mb="16px">
                                    {movie.name}
                                </Text>
                                <Flex justifyContent="space-around" fontSize="12px"
                                    mb="8px">
                                    <Text textAlign="center" >
                                        {"Duração: " + movie.duration}
                                    </Text>
                                    <Text textAlign="center" >
                                        {"Gênero: " + movie.genre}
                                    </Text>
                                    <Text textAlign="center" >
                                        {"Direção: " + movie.director}
                                    </Text>
                                    <Text textAlign="center" >
                                        {"Lançamento: " + moment(movie.releaseDate).format("DD/MM/YYYY")}
                                    </Text>
                                </Flex>
                                <Text textAlign="justify">
                                    {movie.description}
                                </Text>
                                </Flex>
                                <Flex cursor="pointer" onClick={() => setShow(!show)}
                               
                                    alignItems="center" gap="8px" justifyContent={"end"}>
                                    <DynamicIcon h="25px" w="25px" icon="cine" />
                                    {show ?
                                        <Flex justifyContent="space-between" fontSize="12px" alignItems="center" 
                                            mb="8px" gap="16px" pt="12px">
                                            <Text textAlign="center" >
                                                {"Preço: R$ " + movie.price.toFixed(2).replace(".", ",")}
                                            </Text>
                                            <Text textAlign="center" >
                                                {"Lugares: " + movie.capacity + " un."}
                                            </Text>
                                            <Text textAlign="center" >
                                                {"Início: " + moment(movie.beginSalesDate).format("DD/MM/YYYY")}
                                            </Text>
                                            <Text textAlign="center" >
                                                {"Encerramento: " + moment(movie.endSalesDate).format("DD/MM/YYYY")}
                                           </Text>
                                        </Flex> : <Text textAlign="center" fontSize="12px"> </Text>}
                                </Flex>
                            

                        </Flex>


                    </Flex>


                </Stack>}

        </Flex>
    )
}