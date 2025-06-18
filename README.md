# Marriage Agreement Wizard

A comprehensive full-stack web application for generating customized marriage agreements. This project consists of an Angular frontend and a .NET Core backend API for document generation.

## Project Overview

The Marriage Agreement Wizard is designed to streamline the creation of legally formatted marriage agreements. Users can input party information, select relevant legal clauses, and generate professional Word documents ready for review and signing.

## Repository Structure

This repository contains two main components:

1. **Frontend Application** (`/marriage-agreement-wizard`): Angular application that provides the user interface
2. **Backend API** (`/MarriageAgreementApi/DocumentGenerationApi`): .NET Core API for document generation

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
- **Document Generation**: DocumentFormat.OpenXML 3.3.0
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
- **Professional Document Formatting**:
  - Proper section formatting
  - Headers and footers
  - Page numbering
  - Signature lines
  - Consistent typography

## API Endpoints

### Document Generation
```
POST /api/document/generate
```

This endpoint accepts a JSON request with party information and selected clauses, then returns a formatted Word document.

#### Request Model

```json
{
  "partyInfo": {
    "party1FirstName": "...",
    "party1MiddleName": "...",
    "party1LastName": "...",
    "party2FirstName": "...",
    "party2MiddleName": "...",
    "party2LastName": "...",
    "spousalSupportPayor": "...",
    "spousalSupportRecipient": "...",
    "childSupportPayor": "...",
    "childSupportRecipient": "...",
    "party1Role": "...",
    "party2Role": "...",
    "marriedDate": "...",
    "cohabitationDate": "...",
    "separationDate": "...",
    "children": [
      {
        "firstName": "...",
        "middleName": "...",
        "lastName": "...",
        "birthdate": "..."
      }
    ]
  },
  "selectedClauses": [
    {
      "id": "...",
      "category": "...",
      "text": "...",
      "selected": true,
      "label": "..."
    }
  ]
}
```

#### Response

Returns a Word document (DOCX) file with the following HTTP headers:
- Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document
- Content-Disposition: attachment; filename=MarriageAgreement_[date].docx

## Document Structure

The generated document follows a professional legal format with:

1. **Title Page**: Document title and party information
2. **Categorized Sections**: Clauses organized by legal categories
3. **Formatted Clauses**: Each clause properly numbered and formatted
4. **Execution Section**: Signature lines for both parties
5. **Schedules**: Additional information in separate sections when applicable

## Development

### Prerequisites
- Node.js and npm
- .NET 9.0 SDK
- Angular CLI

### Frontend Development
```bash
cd marriage-agreement-wizard
npm install
ng serve
```
Access the application at http://localhost:4200/

### Backend Development
```bash
cd MarriageAgreementApi/DocumentGenerationApi
dotnet restore
dotnet run
```
Access Swagger documentation at https://localhost:7228/swagger

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

## Angular CLI Commands

### Code Scaffolding
```bash
ng generate component component-name
```

### Running Tests
```bash
# Unit tests
ng test

# End-to-end tests
ng e2e
``` 