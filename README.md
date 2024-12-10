# Employment Agreements Dashboard

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Testing](#testing)
- [Sample Data](#sample-data)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Employment Agreements Dashboard is a web application that allows users to create, view, and update employment agreements. It is built using React, Redux, and Material-UI, and it provides a smooth and intuitive user interface.

## Features

- Create new employment agreements.
- View details of existing agreements.
- Update existing agreements.
- Responsive and user-friendly UI.

## Technologies Used

- React
- Redux
- Material-UI
- JSON Server (for mock API)
- Date-fns (for date formatting)
- Jest and React Testing Library (for unit testing)

## Setup and Installation

Follow these steps to set up and run the project locally:

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/employment-agreements-dashboard.git
   cd employment-agreements-dashboard
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the JSON Server:

   ```sh
   npx json-server --watch db.json --port 3001
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- To create a new agreement, click the "Create Agreement" button, fill in the details, and submit the form.
- To view the details of an agreement, click the visibility icon (👁️) next to the desired agreement.
- To update an agreement, click the edit icon (✎) next to the desired agreement and update the details in the form.

## Testing

Unit tests are written using Jest and React Testing Library. To run the tests, use the following command:

```sh
npm test
```
