require("dotenv").config();
const { AssetCache } = require("@11ty/eleventy-fetch");
const Airtable = require("airtable");
const airtableTable = "Insights";
const airtableTableView = "Published";
const assetCacheId = "Insights";
var base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE_TOKEN);

/**
 * PROJECT
 * - Name
 * - Projects
 * - Related
 * @returns
 */

module.exports = () => {
  let asset = new AssetCache(assetCacheId);

  if (asset.isCacheValid(process.env.CACHE_DUR)) {
    console.log("Serving " + airtableTable + " data from the cache…");
    return asset.getCachedValue();
  }

  return new Promise((resolve, reject) => {
    let allEvents = [];

    base(airtableTable)
      .select({
        view: airtableTableView,
        // filterByFormula: "IS_AFTER({ShowDate}, TODAY())",
        // sort: [{ field: "ShowDate", direction: "asc" }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allEvents.push({
              id: record._rawJson.id,
              parent: airtableTable,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            asset.save(allEvents, "json");
            resolve(allEvents);
          }
        }
      );
  });
};
