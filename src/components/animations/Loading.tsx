import { Player } from "@lottiefiles/react-lottie-player";

interface image {
  link: string;
}

export const Loading = ({ link }: image) => {
  return (
    <>
      <Player
        autoplay
        loop
        src={link}
        style={{ width: 200, height: 200 }}
      ></Player>
    </>
  );
};
