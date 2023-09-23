import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../store/filesReducer";

export const Files = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch, getFiles]);

  const { entities: files, status } = useSelector((state) => state.files);

  return (
    <div>
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
          ) : (
            files?.flatMap((file) =>
              file.lines.map(({ text, hex, number }, index) => (
                <tr key={`${file.file + index}`}>
                  <td className="fw-bold">{file.file}</td>
                  <td>{text}</td>
                  <td>{number}</td>
                  <td>{hex}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
