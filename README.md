# Questions and Answers API Microservice

This is an API microservice that was built to support the Questions and Answers Section of the JET Productions Ecommerce site.

The repository for the front-end this was built to support can be found at:
[JET Productions Ecommerce](https://github.com/ericthomson13/JETProductions-Ecommerce)

## Getting Started

To start this project fork and then clone it.
Install necessary dependencies:
```bash
npm install
```

To run this you must have [PostgreSQL](https://www.postgresql.org/docs/12/tutorial.html) installed.

Once PostgreSQL is installed generate the sample data for the databases:

#### Note: It is unwise to attempt to run all these tasks at the same time depending on your computing power.

```bash
npm run generate-answers
```

```bash
npm run generate-questions
```

```bash
npm run generate-photos
```

Once you have the sample CSV data generated populate the database using:
```bash
npm run populate
```

