# Marketo and Drupal Sync Script

Helps work out who is in a Drupal Webform export and not in Marketo to produce a
'Missing people' CSV based on the Drupal CSV.

## Usage

    yarn run parse [PATH TO DRUPAL.CSV] [PATH TO MARKETO.CSV] [PATH TO WRITE EXPORT.CSV TO]

You should get the CSV's from:

 - Drupal Webform Download page. Most important field is the Email one, but any
   thing else you include will be in the output too.
 - Marketo Under the Marketing Activities, pick a region and drill down to a
   Program. Go to the Members tab. Use the Export icon in the footer toolbar to
   export the visible columns and click Export. Wait for the notification to contain
   a Download link and download it.

For sanity, I usually make a folder for a campaign and name the Webform export as
Drupal.csv and the Marketo export as Marketo.csv. I set the output filename to
Missing.csv in the same folder.

