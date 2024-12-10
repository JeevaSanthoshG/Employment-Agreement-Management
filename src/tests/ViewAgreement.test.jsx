import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ViewAgreement from "../components/ViewAgreement";

describe("ViewAgreement Component", () => {
  const open = true;
  const handleClose = jest.fn();
  const agreement = {
    employeeName: "John Doe",
    department: "Engineering",
    position: "Developer",
    agreementDate: "2022-12-01",
  };

  test("renders Agreement Details title", () => {
    render(
      <ViewAgreement
        open={open}
        handleClose={handleClose}
        agreement={agreement}
      />
    );

    expect(screen.getByText(/Agreement Details/i)).toBeInTheDocument();
  });

  test("renders agreement details", () => {
    render(
      <ViewAgreement
        open={open}
        handleClose={handleClose}
        agreement={agreement}
      />
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-12-01/i)).toBeInTheDocument();
  });

  test("closes the dialog on button click", () => {
    render(
      <ViewAgreement
        open={open}
        handleClose={handleClose}
        agreement={agreement}
      />
    );

    fireEvent.click(screen.getByText(/Close/i));

    expect(handleClose).toHaveBeenCalled();
  });
});
