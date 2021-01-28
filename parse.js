#!/usr/bin/env node
const fs = require('fs'),
      neatCsv = require('neat-csv'),
      createCsvWriter = require('csv-writer').createObjectCsvWriter;


// Get outputCsvFilename, Marketo and Drupal CSVs from path
const outputCsvFilename = process.argv.pop();
const marketoCsvFilename = process.argv.pop();
const drupalCsvFilename = process.argv.pop();

// Load them and parse as CSVs
Promise.all([
  neatCsv(fs.createReadStream(marketoCsvFilename)),
  neatCsv(fs.createReadStream(drupalCsvFilename)),
]).then(results => {
  // results[0] = marketo CSV. results[1] = Drupal CSV

  // Boil the Marketo CSV down to an array of Emails, downcased to avoid case mismatches.
  const existingMarketoEmails = results[0].map(row => (row['Email Address'] || '').toLowerCase())

  // The outputCSV is the Drupal CSV with Marketo email addresses filtered out.
  // Remaining should be "missing"
  const outputCSV = results[1].filter(row => existingMarketoEmails.indexOf(row['Email address'].toLowerCase()) == -1 )

  const csvWriter = createCsvWriter({
    path: outputCsvFilename,
    header: Object.keys(results[1][0]).map(key => { return {id: key, title: key}; })
  });
  csvWriter.writeRecords(outputCSV).then(() => console.log('Output CSV Written'))
})