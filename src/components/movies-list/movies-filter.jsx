import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/reducer/movies";
import { Form } from "react-bootstrap";

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Form.Control
      type="text"
      placeholder="Movie Search"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};
