require("dotenv").config();
const { AssetCache } = require("@11ty/eleventy-fetch");
const Airtable = require("airtable");
const airtableTable = "IA";
const airtableTableView = "Work Types";
const assetCacheId = "IA";
var base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE_TOKEN);

module.exports = () => {
  let asset = new AssetCache(assetCacheId);

  if (asset.isCacheValid(process.env.CACHE_DUR)) {
    console.log("Serving " + airtableTable + " data from the cache…");
    return asset.getCachedValue();
  }
  console.log("Refreshing " + airtableTable + " data");
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
            // console.log(allEvents);
            resolve(allEvents);
          }
        }
      );
  });
};
