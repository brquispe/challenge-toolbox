import Container from "react-bootstrap/Container";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
