import NavbarComp from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export const Navbar = () => {
  return (
    <NavbarComp bg="primary" sticky="top">
      <Container>
        <NavbarComp.Brand>Toolbox Challenge</NavbarComp.Brand>
      </Container>
    </NavbarComp>
  );
};
