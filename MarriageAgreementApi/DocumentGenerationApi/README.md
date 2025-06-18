# Marriage Agreement API - Document Generation Service

## Project Overview

This API provides a document generation service for creating marriage agreements. It's designed to work with an Angular frontend application to produce professionally formatted legal documents based on user-selected information and clauses.

## Technology Stack

- **Framework**: .NET 9.0
- **API Architecture**: ASP.NET Core Web API
- **Document Generation**: DocumentFormat.OpenXML 3.3.0
- **API Documentation**: Swagger/OpenAPI
- **CORS Support**: Configured for Angular frontend applications

## Features

- **Dynamic Document Generation**: Creates Word (DOCX) documents based on user-provided information
- **Customizable Clauses**: Processes and formats selected legal clauses for inclusion in the final agreement
- **Party Information Handling**: Incorporates details about both parties involved in the marriage agreement
- **Children Information**: Includes details about children when applicable
- **Support Information**: Handles spousal and child support designations
- **Document Formatting**: Provides professional document styling with:
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

To run the project locally:

1. Ensure you have .NET 9.0 SDK installed
2. Clone the repository
3. Navigate to the DocumentGenerationApi directory
4. Run `dotnet restore` to restore dependencies
5. Run `dotnet run` to start the API
6. Access Swagger documentation at https://localhost:7228/swagger

## Configuration

The API is configured to accept requests from:
- Local Angular development environment (http://localhost:4200)
- Production Angular applications

## Deployment

For production deployment:

1. Run `dotnet publish -c Release`
2. Deploy the published files to your hosting environment
3. Configure appropriate CORS settings for your production frontend URL 