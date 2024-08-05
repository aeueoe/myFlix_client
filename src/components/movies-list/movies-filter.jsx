import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/reducer/movies";
import { Form, Button } from "react-bootstrap";

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  const handleClearSearch = () => {
    dispatch(setFilter(""));
  };

  return (
    <div className="d-flex">
      <Form.Control
        type="text"
        placeholder="Movie Search"
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
      <Button
        className="mx-2"
        variant="btn btn-light"
        onClick={handleClearSearch}
      >
        Clear
      </Button>
    </div>
  );
};
