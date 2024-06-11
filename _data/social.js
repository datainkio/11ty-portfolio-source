require("dotenv").config();
const Airtable = require("airtable");
const { AssetCache } = require("@11ty/eleventy-fetch");
const airtableTable = "Social";
const airtableTableView = "Published";
const Image = require("@11ty/eleventy-img");

const IMAGES_URL_PATH = "/assets/content/images/cache/logos/";
const IMAGES_OUTPUT_DIR = `../dist${IMAGES_URL_PATH}`;

process.env.CACHE_DUR;

async function getRecords() {
  // Initialize Airtable API instance
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
  }).base(process.env.AIRTABLE_BASE_TOKEN);
  let records = [];
  try {
    // Get all the records from a view.
    // This is easier than getting data page wise
    records = await base(airtableTable)
      .select({
        view: airtableTableView,
        // filterByFormula: "{InStock} = 1",
        // sort: [{ field: "Title", direction: "asc" }],
      })
      .all();
  } catch (e) {
    // Show error and return empty array on failures
    console.error(e);
    return [];
  }

  // Get only fields
  let fields = records.map((r) => {
    return r.fields;
  });

  // console.log(":::: FIELDS ::::");
  // console.log(fields);

  // Pick URLs from Image object array
  // I'm picking the URL to the full Image, as this will be post processed
  // through Eleventy Image later in the pipeline
  fields = fields.map((f) => {
    const photo = f.Logo;
    return {
      ...f,
      Photo: photo?.map((p) => p?.url),
    };
  });

  // console.log(fields);

  // Remove entries with no title
  // fields = fields.filter((f) => Boolean(f.Title));
  // console.log(fields);
  return fields;
}

async function processRemoteImages(records) {
  // Using Promise.all to wait until all product objects
  // are processed.
  console.log("::: PROCESS REMOTE IMAGES :::");
  return Promise.all(
    records.map(async (r) => {
      // Picking the first photo from the array
      const url = r.Photo[0];
      const metadata = await Image(url, {
        widths: [800, 600, 400],
        urlPath: IMAGES_URL_PATH,
        outputDir: IMAGES_OUTPUT_DIR,
        formats: ["webp", "jpeg"],
        cacheOptions: {
          duration: process.env.IMAGE_CACHE_DUR,
        },
      });

      const pictureElement = Image.generateHTML(metadata, {
        alt: `Thumbnail for ${r.Title}`,
        sizes: "100vw",
      });

      // console.log(pictureElement);

      // This is to remove 'Images' properties
      // from the object without mutating
      const { Photo, ...restOfProduct } = r;

      return {
        ...restOfProduct,
        pictureElement,
      };
    })
  );
}

module.exports = async function () {
  const imagesCache = new AssetCache("Social");
  if (imagesCache.isCacheValid(process.env.IMAGE_CACHE_DUR)) {
    return imagesCache.getCachedValue(); // This returns a promise
  }
  console.log("Cache expired. Fetching data from Airtable");
  let records = await getRecords();
  records = await processRemoteImages(records);
  await imagesCache.save(records, "json");
  return records;
};
