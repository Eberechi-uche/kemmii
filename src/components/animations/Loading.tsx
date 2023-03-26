import { Player } from "@lottiefiles/react-lottie-player";

interface image {
  link: string;
  size?: string;
}

export const Loading = ({ link, size = "300px" }: image) => {
  return (
    <>
      <Player
        autoplay
        loop
        src={link}
        style={{ height: size, width: size }}
      ></Player>
    </>
  );
};
