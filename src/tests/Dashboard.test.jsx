import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Dashboard from "../pages/Dashboard";
import { fetchAgreements } from "../features/agreements/agreementsSlice";

const mockStore = configureStore([]);

describe("Dashboard Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      agreements: {
        items: [],
        status: "idle",
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  test("renders Employment Agreements header", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Employment Agreements/i)).toBeInTheDocument();
  });

  test("dispatches fetchAgreements on load", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchAgreements());
  });

  test("renders create button", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Create Agreement/i)).toBeInTheDocument();
  });

  test("opens create agreement dialog on button click", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Create Agreement/i));

    expect(screen.getByText(/Create New Agreement/i)).toBeInTheDocument();
  });
});
