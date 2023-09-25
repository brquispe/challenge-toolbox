import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../store/filesReducer";
import { SearchBar } from "../components";
import { useQueryParamsContext } from "../context";

export const Files = () => {
  const dispatch = useDispatch();
  const { queryParams, setQueryParam } = useQueryParamsContext();
  useEffect(() => {
    dispatch(getFiles(queryParams?.search));
  }, [dispatch, getFiles]);

  const {
    entities: files,
    status,
    error,
  } = useSelector((state) => state.files);

  function onSearch(value) {
    setQueryParam("search", value);
    dispatch(getFiles(value));
  }

  return (
    <div>
      <SearchBar
        className="mb-2 w-25"
        onSearch={onSearch}
        defaultValue={queryParams?.search}
      />
      <Table responsive hover bordered striped>
        <thead className="border-0 border-bottom border-3 border-dark">
          <tr className="fw-bolder">
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {status === "loading" ? (
            <tr>
              <td colSpan={4}>
                <div className="d-flex gap-1 align-items-end justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          ) : files ? (
            files.flatMap((file) =>
              file.lines.map(({ text, hex, number }, index) => (
                <tr key={`${file.file + index}`}>
                  <td className="fw-bold">{file.file}</td>
                  <td>{text}</td>
                  <td>{number}</td>
                  <td>{hex}</td>
                </tr>
              ))
            )
          ) : null}
          {status === "failed" && error && (
            <tr>
              <td colSpan={4} className="text-center text-danger">
                {error}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
