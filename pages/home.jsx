import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import styles from "@/styles/Home.module.css";
import { Container, Box, Button } from '@chakra-ui/react'
import Chat from "@/lib/components/Chat";
import { PlayerContext } from "@/lib/player";
import { RoomList } from "@/lib/Room/List";
import { CreateRoom } from "@/lib/Room/Gateway";

export default () => {
    const router = useRouter()
    const { Player } = useContext(PlayerContext)
    return (
        <main className={styles.main}>
            <Container display={"flex"} position={"absolute"} top={0} left={0} p={0}>
                <Box borderRadius='md' bg='#F6AD55' color='white' p={"20px"} w={[100, 300, 400]}>
                    Display Name : {Player?.displayName}
                </Box>
            </Container >
            <Container display={"flex"} position={"absolute"} top={"0%"} right={"0%"} p={0} w={"auto"}>
                <Button size={"lg"} variant={"solid"} colorScheme={"gray"} onClick={() => {
                    console.log(auth.app.config.name)
                    signOut(auth).then(() => {
                        router.push("/")
                    })
                }}>
                    Sign out
                </Button>
            </Container>
            <Box position={"fixed"} left={"0%"} bottom={"0%"}>
                <Chat></Chat>
            </Box>
            <Button borderRadius='100%' h={"10rem"} w={"10rem"} size={"lg"} variant={"solid"} colorScheme={"gray"} onClick={() => {
                CreateRoom(Player)
            }}>
                Create Room
            </Button>
            <RoomList></RoomList>
        </main>
    );
}