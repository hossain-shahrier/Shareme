// Packages
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import PicturexVideo from "../../assets/share.mp4";
import Logo from "../../assets/logowhite.png";
import { client } from "../../client";
// Styles
import {
  Container,
  BackgroundVideoContainer,
  BackgroundVideo,
  LogoWrapper,
  LogoContainer,
  WhiteLogo,
  GoogleButtonContainer,
  GoogleButton,
} from "./Login.styles";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    // Create Sanity user
    const doc = {
      _id: googleId,
      _type: "user",
      username: name,
      image: imageUrl,
    };

    client
      .createIfNotExists(doc)
      .then((res) => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className="flex justify-start items-center flex-col h-screen">
      <BackgroundVideoContainer className="relative w-full h-full">
        <BackgroundVideo
          src={PicturexVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="object-cover w-full h-full"
        />
        <LogoWrapper className="absolute flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <LogoContainer className="p-5">
            <WhiteLogo src={Logo} alt="logo" className="w-1/2 mx-auto" />
          </LogoContainer>
          <GoogleButtonContainer className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <GoogleButton
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-4 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </GoogleButton>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </GoogleButtonContainer>
        </LogoWrapper>
      </BackgroundVideoContainer>
    </Container>
  );
};

export default Login;
