import { Flex, Text, Image, Grid, GridItem, Input, Textarea, Button, Stack } from "@chakra-ui/react";
import moment from "moment";
import { NextPage } from "next"
import { useRouter } from "next/router";
import { useState } from "react";
import { IMovies } from "../api/interfaces/movies";
import { postCreateMovie, useMovies } from "../api/movies";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Virtual, Autoplay } from 'swiper';


const Home: NextPage = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("")
    const [genre, setGenre] = useState("")
    const [director, setDirector] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [link, setLink] = useState("")


    const movie: IMovies[] = useMovies().movies?.data
    const [swiperChange, setSwiperChange] = useState({});


    const handleClick = async () => {
        const newMovie = {
            name: name,
            description: description,
            duration: duration,
            genre: genre,
            director: director,
            releaseDate: moment(releaseDate).format().split("-03:00")[0],
            price: 20,
            capacity: 2000,
            beginSalesDate: moment().format().split("-03:00")[0],
            endSalesDate: moment().format().split("-03:00")[0],
            tag: "link:" + link
        }

        newMovie.releaseDate = newMovie.releaseDate.split("-02:00")[0]
        newMovie.beginSalesDate = newMovie.beginSalesDate.split("-02:00")[0]
        newMovie.endSalesDate = newMovie.endSalesDate.split("-02:00")[0]
        const registerMovie = await postCreateMovie(newMovie)

        console.log(newMovie)

    }

    const router = useRouter()
    return (
        <Flex direction="column" justifyContent="center" w="100vw" gap="32px">
            <Flex bgColor="black" p="24px" justifyContent="center"><Text color="white" fontSize="32px" fontWeight="bold"  >ADAFLIX</Text>
            </Flex>

            <Flex w="100%" alignItems="center" justifyContent="space-between"  px="48px" gap="24px">
                <Flex direction="column" alignSelf="center" w="100%" gap="16px" px="80px">
                    <Text fontSize="24px" alignSelf="center">Cadastre um novo filme aqui:</Text>
                    <Flex direction="column" gap="8px" w="100%">
                        <Input placeholder="Nome" type="text"
                            value={name} onChange={e => setName(e.target.value)} />
                        <Textarea placeholder="Descrição"
                            value={description} onChange={e => setDescription(e.target.value)} />
                        <Input placeholder="Duração" type="text"
                            value={duration} onChange={e => setDuration(e.target.value)} />
                        <Input placeholder="Gênero" type="text"
                            value={genre} onChange={e => setGenre(e.target.value)} />
                        <Input placeholder="Diretor" type="text"
                            value={director} onChange={e => setDirector(e.target.value)} />
                        <Input placeholder="Data de Lançamento" type="date"
                            value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
                        <Input placeholder="Link do Poster" type="link"
                            value={link} onChange={e => setLink(e.target.value)} />
                        <Button onClick={handleClick}>Cadastrar</Button>
                    </Flex>
                </Flex>
                <Flex p="24px" w="40%">
                    <Swiper
                    centeredSlides={true}
                    modules={[Autoplay]}
                        className="swiper-white"
                        slidesPerView={1}
                        spaceBetween={8}
                        pagination={{ clickable: true }}
                        onInit={(ev: any) => {
                            setSwiperChange(ev);
                        }} 
                        loop
                        autoplay
                       >
                        {movie !== undefined &&
                            movie.map((data, index) =>
                                <SwiperSlide key={index} virtualIndex={index}
                                    onClick={() => router.push(`/movie/${data.id}`)}
                                >
                                    <Stack w="360px">
                                        <Flex justifyContent="center" cursor="pointer">
                                            {data.tag.includes("link:") ? <Image h="360px" src={data.tag.split("link:")[1]} /> : <Image h="360px" src={`../images/${data.tag}.jpg`} />}
                                        </Flex>
                                        <Flex direction="column" gap="8px">
                                            <Text fontWeight={"bold"} textAlign="center" >
                                                {data.name}
                                            </Text>
                                            <Text textAlign="justify">
                                                {data.description.slice(0, 100) + "[...]"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                </SwiperSlide>
                            )}
                    </Swiper>
                </Flex>
            </Flex></Flex>
    )
}

export default Home;
