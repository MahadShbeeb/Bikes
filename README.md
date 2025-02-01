Stolen Bike Cases Tracker 🚴‍♂️
A web application designed to help Munich police efficiently track and manage stolen bike cases using the BikeIndex API. This app provides a user-friendly interface to view and filter reported bike thefts while offering key information about each case.

🚀 Features
Bike Theft Cases List:
Displays a paginated list (10 cases per page) of stolen bike reports in the Munich area.
Includes case details such as:
Case title
Case description
Date of theft
Date reported
Theft location
Bike image (if available)
Total Theft Cases: Displays the total number of bike theft cases.
Dynamic Pagination: Automatically adjusts the number of pages based on the theft count.
Dynamic Routes: View additional details for each bike theft case via a dedicated page.
Search and Sort:
Filter cases by partial case title (UI implemented but API limitations prevent full functionality).
Sort cases by available criteria.
Responsive Design: Optimized for all screen sizes, with a clean and pleasant UI.
States for Better UX:
Loading State: Displays a loading indicator while fetching data.
Error State: Displays an error message if the data is unavailable.
Empty State: Displays a "No bikes available" message when there are no results.
📂 Project Structure
axios/: Contains the axios instance for API calls.
types/: Stores TypeScript type definitions for better code consistency.
constants/:
Defines global constants like MAIN_CONTAINER_BREAK_POINT for setting the container width.
helpers/:
isPathMatch: Highlights the active path in the navbar.
useDebounce: Implements a 500ms debounce for search functionality.
assets/: Includes images for the landing section and a bike card placeholder.
components/:
Layouts:
Navbar: Responsive navbar with a burger button for mobile view.
MainLayout: Wraps the navbar and main content.
Home:
LandingSection: Hero section with a simple navbar and image.
Bikes:
SearchInput: Styled search input box for filtering bike theft cases.
SortSelect: Styled dropdown for sorting bike theft cases.
BikeCard: Displays key information about a stolen bike.
BikeDetails: Dynamic route for viewing detailed information about a specific bike theft case.
BikesList: Paginated list of stolen bikes.
NoBikesAvailable: Displays when no results are found.
TotalTheftCases: Shows the total number of theft cases and updates dynamically with search input.
pages/:
stolen-bikes/: Main page displaying the list of stolen bikes with pagination, search, and sort functionality.
Dynamic route for detailed bike theft case information.
📊 Technical Challenges
API Inconsistencies
**Theft Count Response**  
 The API returns a theft count of **9900**, but no results are displayed.

![API Theft Count Response](./assets/images/search-giant-count.png)

**Empty Bike Cases List**  
 The response for bike cases is an **empty array**.

![Empty Bike Cases List](./assets/images/search-giant-empty.png)
Filtering by Partial Case Title:
UI and query parameters for filtering are implemented, but the BikeIndex API does not provide a corresponding endpoint to filter results by case title.
Filtering by Date Range:
Similar to the title filter, UI is implemented, but the API lacks a corresponding endpoint for filtering by date range.
Inconsistent API Responses:
Example: Searching with the keyword "giant" returns a theft count of 9900, but the actual cases array is empty. This inconsistency impacts the user experience and filtering logic.
🛠️ Setup and Installation
Clone the repository:
bash
Copy
Edit
git clone <repository-url>
Install dependencies:
bash
Copy
Edit
npm install
Start the development server:
bash
Copy
Edit
npm start
Open the app in your browser:
arduino
Copy
Edit
http://localhost:3000
🧑‍💻 Usage
Navigate to the Stolen Bikes page.
View a paginated list of bike theft cases in Munich.
Use the search bar to filter cases by title (UI-only due to API limitations).
Sort cases using the dropdown (UI-only due to API limitations).
Click on a bike case to view detailed information.
View the total number of reported theft cases dynamically.
🖼️ Screenshots
Landing Page:

Bikes List:

Bike Details:

🔮 Future Improvements
Custom Backend: Implement a backend service to handle filtering by title and date range.
Enhanced API Handling: Add better error handling for inconsistent API responses.
Unit Tests: Add unit tests for core components and helper functions.
