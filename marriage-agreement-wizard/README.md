# Marriage Agreement Wizard

A comprehensive web application for generating customized marriage agreements. This project consists of an Angular frontend and a .NET Core backend API for document generation.

## Project Overview

The Marriage Agreement Wizard is a full-stack application designed to streamline the creation of legally formatted marriage agreements. Users can input party information, select relevant legal clauses, and generate professional Word documents ready for review and signing.

## Technology Stack

### Frontend (Angular)
- **Framework**: Angular 19.2.0
- **UI Components**: PrimeNG 19.1.0 with PrimeFlex 3.3.1 for responsive layouts
- **Styling**: SCSS with custom theming
- **Animations**: Animate.css for smooth transitions
- **State Management**: RxJS with BehaviorSubject for local state management
- **Form Handling**: Angular Reactive Forms
- **Server-Side Rendering**: Angular SSR for improved performance

### Backend (.NET Core)
- **Framework**: .NET 9.0
- **API Architecture**: RESTful API with ASP.NET Core
- **Document Generation**: DocumentFormat.OpenXML for Word document creation
- **API Documentation**: Swagger/OpenAPI
- **CORS Support**: Configured for cross-origin requests from Angular applications

## Features

### User Flow
1. **Party Information Collection**
   - Input personal details for both parties
   - Add children information
   - Specify support roles and important dates

2. **Clause Selection**
   - Browse categorized legal clauses
   - Select relevant clauses for inclusion in the agreement
   - Filter and search through available clauses

3. **Document Review & Generation**
   - Review all entered information and selected clauses
   - Generate a professionally formatted Word document
   - Download the completed marriage agreement

### Technical Features
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Form Validation**: Comprehensive validation for all user inputs
- **Session Persistence**: Automatic saving of progress to browser session storage
- **Dynamic Document Generation**: Server-side creation of legally formatted DOCX files
- **Professional Formatting**: Proper document structure with headers, sections, and page breaks

## Project Structure

### Frontend Structure
- **Components**: Modular components for each step of the wizard process
- **Services**: Centralized data management and API communication
- **Models**: TypeScript interfaces for data typing
- **Assets**: JSON files containing legal clause templates

### Backend Structure
- **Controllers**: API endpoints for document generation
- **Services**: Business logic for document creation and formatting
- **Models**: Data transfer objects for request/response handling

## Development

### Frontend Development
```bash
cd marriage-agreement-wizard
npm install
ng serve
```

### Backend Development
```bash
cd MarriageAgreementApi/DocumentGenerationApi
dotnet restore
dotnet run
```

## Building for Production

### Frontend Build
```bash
cd marriage-agreement-wizard
npm run build
```

### Backend Build
```bash
cd MarriageAgreementApi/DocumentGenerationApi
dotnet publish -c Release
```

## API Endpoints

### Document Generation
```
POST /api/document/generate
```
Accepts party information and selected clauses, returns a formatted Word document.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
