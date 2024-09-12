# Slot Game Automation

## Project Description

This project automates the process of playing a slot game using Selenium WebDriver and TypeScript. The automation script navigates to a slot game website, starts a game, performs a spin, and compares screenshots taken before and after the spin to verify that the spin was successful.

## Prerequisites

Before running the script, ensure you have the following installed:

- **Node.js**: Make sure you have Node.js (v14.x or higher) installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Google Chrome**: The script uses ChromeDriver, which requires Google Chrome to be installed on your machine.
- **TypeScript**: The project uses TypeScript for scripting.
- **ChromeDriver**: Ensure you have ChromeDriver installed. You can download it from [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/slot-game-automation.git
   cd slot-game-automation

2. **Install the dependencies**
 ---bash
npm install

3. **Configure TypeScript:**

Ensure that your tsconfig.json file is correctly configured for your project. The basic configuration should work if you have followed the setup instructions.

## Usage
To run the automation script:

1. **Start the script:**
npm run start

This command will execute the slotAutomation.ts script using ts-node, which will:

- Navigate to FreeSlots.com.
- Locate and click on a slot game.
- Perform a spin.
- Take screenshots before and after the spin.
- Compare the screenshots to verify that the spin resulted in changes.

2. **Review the results:**

- Screenshots before and after the spin are saved in the src directory (initial.png and final.png).
- The script logs the number of different pixels detected between the screenshots, indicating whether the spin was successful.

## Results
When the script is executed successfully, you should see output similar to the following:
---bash 
Navigating to FreeSlots.com...
Waiting for slot game link...
Clicking slot game link...
Waiting for game to load...
Screenshot saved: F:\just slot\src\initial.png
Waiting for spin button...
Clicking spin button...
Waiting for spin result...
Screenshot saved: F:\just slot\src\final.png
Comparing screenshots...
Number of different pixels: <number>
Spin successful, results have changed.
Browser closed.

   
