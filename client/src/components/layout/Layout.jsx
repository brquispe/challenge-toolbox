import Container from "react-bootstrap/Container";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column gap-4">
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};
