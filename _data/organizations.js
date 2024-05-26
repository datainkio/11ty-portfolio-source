require("dotenv").config();
const { AssetCache } = require("@11ty/eleventy-fetch");
const Airtable = require("airtable");
const airtableTable = "Organizations";
const airtableTableView = "Published";
const assetCacheId = "Organizations";
var base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE_TOKEN);

/**
 * ORGANIZATIONS
 * - Name
 * - Notes
 * - As Company
 * - As Client
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
