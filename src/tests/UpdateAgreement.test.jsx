import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UpdateAgreement from "../components/UpdateAgreement";

const mockStore = configureStore([]);

describe("UpdateAgreement Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  const open = true;
  const handleClose = jest.fn();
  const agreement = {
    id: 1,
    employeeName: "John Doe",
    department: "Engineering",
    position: "Developer",
    agreementDate: "2022-12-01",
  };

  test("renders Update Agreement title", () => {
    render(
      <Provider store={store}>
        <UpdateAgreement
          open={open}
          handleClose={handleClose}
          agreement={agreement}
        />
      </Provider>
    );

    expect(screen.getByText(/Update Agreement/i)).toBeInTheDocument();
  });

  test("dispatches update agreement on form submission", () => {
    render(
      <Provider store={store}>
        <UpdateAgreement
          open={open}
          handleClose={handleClose}
          agreement={agreement}
        />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Employee Name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Department/i), {
      target: { value: "HR" },
    });
    fireEvent.change(screen.getByLabelText(/Position/i), {
      target: { value: "Manager" },
    });
    fireEvent.change(screen.getByLabelText(/Agreement Date/i), {
      target: { value: "2023-01-01" },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(store.dispatch).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });
});
