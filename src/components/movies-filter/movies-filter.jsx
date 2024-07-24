import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Row, Col, Dropdown, Button } from "react-bootstrap";
import { setFilter } from "../../redux/reducer/movies";

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [value, setValue] = useState();

  return (
    <Form.Control
      className="search-filter"
      type="text"
      placeholder="Search..."
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};

const ParentComponent = () => {
  const filter = useSelector((state) => state.movies.filter);

return (
  <>
    <Row className="justify-content-md-center gap-3 filter-bar" md={4}>
      <Col md={10}>
        <Form.Control
          className="filter-textbox"
          type="text"
          placeholder="Search movie"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
      </Col>
    </Row>
    <Row className="justify-content-md-center gap-3 filter-bar">
      <Col sm={12} md={2}>
        <Dropdown>
          <Dropdown.Toggle className="filter--selectors" variant="info">
            Genres
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              value=""
              key="clear"
              onClick={(e) => {
                dispatch(setFilter(""));
              }}
            >
              All Genres
            </Dropdown.Item>
            {genres.map((genre, index) => (
              <Dropdown.Item
                value={genre}
                key={index}
                onClick={(e) => {
                  dispatch(setFilter(genre));
                }}
              >
                {genre}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col md={2}>
        <Button
          variant="secondary"
          className="filter--selectors"
          type="button"
          placeholder="Search..."
          value="Clear"
          onClick={(e) => dispatch(setFilter(""))}
        >
          Clear
        </Button>
      </Col>
    </Row>
  </>
);
};