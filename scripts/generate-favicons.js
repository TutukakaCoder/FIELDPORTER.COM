const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

const sizes = [16, 32, 48, 64, 128, 192, 512];
const variants = ["light", "dark"];

async function generateFavicons() {
  console.log("Starting favicon generation...");

  try {
    for (const variant of variants) {
      const inputPath = path.join(
        __dirname,
        `../public/images/square-f-${variant === "light" ? "black" : "white"}.PNG`,
      );

      console.log(`Processing ${variant} variant from: ${inputPath}`);

      for (const size of sizes) {
        const outputPath = path.join(
          __dirname,
          `../public/favicon-${variant}-${size}.png`,
        );

        await sharp(inputPath).resize(size, size).png().toFile(outputPath);

        console.log(`Generated ${outputPath}`);
      }

      // Generate Apple touch icon (180x180)
      const appleOutputPath = path.join(
        __dirname,
        `../public/apple-icon-${variant}.png`,
      );
      await sharp(inputPath).resize(180, 180).png().toFile(appleOutputPath);

      console.log(`Generated ${appleOutputPath}`);

      // Generate main favicon files
      const mainOutputPath = path.join(
        __dirname,
        `../public/favicon-${variant}.png`,
      );
      await sharp(inputPath).resize(32, 32).png().toFile(mainOutputPath);

      console.log(`Generated ${mainOutputPath}`);
    }

    console.log("Favicon generation complete!");
  } catch (error) {
    console.error("Error generating favicons:", error);
    process.exit(1);
  }
}

generateFavicons();
