import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

export const SearchBar = ({
  className,
  placeholder = "Search",
  onSearch,
  defaultValue,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue || "");

  function onChangeInput(event) {
    if (event.target.value !== " ") {
      setInputValue(event.target.value);
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    onSearch?.(inputValue);
  }

  return (
    <Form onSubmit={onSubmit} className={className}>
      <InputGroup>
        <Button
          id="btnSearch"
          type="submit"
          variant="outline-secondary"
          style={{ borderRadius: "16px 0 0 16px" }}
        >
          <span>&#x1F50D;</span>
        </Button>
        <Form.Control
          style={{ borderRadius: "0 16px 16px 0" }}
          type="search"
          placeholder={placeholder}
          value={inputValue}
          onChange={onChangeInput}
          aria-describedby="btnSearch"
        />
      </InputGroup>
    </Form>
  );
};
