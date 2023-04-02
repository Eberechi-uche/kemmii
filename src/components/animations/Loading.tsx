import { Player } from "@lottiefiles/react-lottie-player";

type LoadingProps = {
  link: string;
  size?: number;
  display?: string;
  speed?: number;
  loop?: boolean;
};

export const Loading: React.FC<LoadingProps> = ({
  link,
  size = 200,
  display,
  speed,
  loop,
}) => {
  const loopValue = loop == false ? false : true;
  return (
    <>
      <Player
        autoplay
        loop={loopValue}
        src={link}
        style={{
          width: size,
          height: size,
          display: display,
        }}
        speed={speed || 1}
      ></Player>
    </>
  );
};
