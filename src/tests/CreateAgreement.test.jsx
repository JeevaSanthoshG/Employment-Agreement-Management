import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CreateAgreement from "../components/CreateAgreement";

const mockStore = configureStore([]);

describe("CreateAgreement Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  const open = true;
  const handleClose = jest.fn();

  test("renders Create New Agreement title", () => {
    render(
      <Provider store={store}>
        <CreateAgreement open={open} handleClose={handleClose} />
      </Provider>
    );

    expect(screen.getByText(/Create New Agreement/i)).toBeInTheDocument();
  });

  test("dispatches create agreement on form submission", () => {
    render(
      <Provider store={store}>
        <CreateAgreement open={open} handleClose={handleClose} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Employee Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Department/i), {
      target: { value: "Engineering" },
    });
    fireEvent.change(screen.getByLabelText(/Position/i), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByLabelText(/Agreement Date/i), {
      target: { value: "2022-12-01" },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(store.dispatch).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });
});
