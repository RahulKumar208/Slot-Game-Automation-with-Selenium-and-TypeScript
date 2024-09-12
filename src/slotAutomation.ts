import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';  // Ensure to use .js extension
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { fileURLToPath } from 'url';

// Get the directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to capture and save a screenshot
const takeScreenshot = async (driver, fileName) => {
  const screenshot = await driver.takeScreenshot();
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, Buffer.from(screenshot, 'base64'));
  console.log(`Screenshot saved: ${filePath}`);
  return filePath;
};

// Function to compare two screenshots
const compareScreenshots = (initialPath, finalPath) => {
  const initialImg = PNG.sync.read(fs.readFileSync(initialPath));
  const finalImg = PNG.sync.read(fs.readFileSync(finalPath));
  const { width, height } = initialImg;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    initialImg.data,
    finalImg.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 } // Adjust the threshold if needed
  );

  return numDiffPixels;
};

// Function to automate the slot game
const runSlotAutomation = async () => {
  // Chrome browser options
  const options = new chrome.Options();
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1920,1080');

  // Initialize WebDriver with Chrome
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Step 1: Navigate to FreeSlots.com
    console.log("Navigating to FreeSlots.com...");
    await driver.get('https://www.freeslots.com');

    // Step 2: Locate the Mountain Fox game using XPath
    const gameSelector = By.xpath('//*[@alt="Mountain Fox"]');
    console.log("Waiting for slot game link...");
    await driver.wait(until.elementLocated(gameSelector), 20000);
    const gameElement = await driver.findElement(gameSelector);
    
    // Step 3: Click on the game link
    console.log("Clicking slot game link...");
    await gameElement.click();

    // Step 4: Wait for the game to load
    console.log("Waiting for game to load...");
    await driver.sleep(5000);  // Adjust sleep time as needed

    // Step 5: Take a screenshot before spinning
    const initialFilePath = await takeScreenshot(driver, 'initial.png');

    // Step 6: Locate and click the spin button
    const spinButtonXPath = By.xpath('//*[@id="canvas"]');
    console.log("Waiting for spin button...");
    await driver.wait(until.elementLocated(spinButtonXPath), 20000);
    const spinButton = await driver.findElement(spinButtonXPath);
    
    console.log("Clicking spin button...");
    await spinButton.click();

    // Step 7: Wait for the spin to complete
    console.log("Waiting for spin result...");
    await driver.sleep(10000);  // Adjust wait time as needed

    // Step 8: Take a screenshot after the spin
    const finalFilePath = await takeScreenshot(driver, 'final.png');

    // Step 9: Compare the screenshots to detect changes
    console.log("Comparing screenshots...");
    const numDiffPixels = compareScreenshots(initialFilePath, finalFilePath);
    
    console.log(`Number of different pixels: ${numDiffPixels}`);

    if (numDiffPixels > 0) {
      console.log("Spin successful, results have changed.");
    } else {
      console.log("No change detected, spin might not have occurred.");
    }

  } catch (error) {
    console.error('Error during automation:', error);
  } finally {
    // Close the browser
    await driver.quit();
    console.log("Browser closed.");
  }
};

// Run the automation
runSlotAutomation();
