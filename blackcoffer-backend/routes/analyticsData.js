const express = require('express');
const router = express.Router();
const Data = require('../model/data');

// Create a new data entry
router.post('/data', async (req, res) => {
  try {
    const {
      end_year,
      intensity,
      sector,
      topic,
      insight,
      url,
      region,
      start_year,
      impact,
      added,
      published,
      country,
      relevance,
      pestle,
      source,
      title,
      likelihood,
    } = req.body;

    // Check if all fields are provided
    if (
      !end_year ||
      !intensity ||
      !sector ||
      !topic ||
      !insight ||
      !url ||
      !region ||
      !start_year ||
      !impact ||
      !added ||
      !published ||
      !country ||
      !relevance ||
      !pestle ||
      !source ||
      !title ||
      !likelihood
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new data entry
    const newData = new Data({
      end_year,
      intensity,
      sector,
      topic,
      insight,
      url,
      region,
      start_year,
      impact,
      added,
      published,
      country,
      relevance,
      pestle,
      source,
      title,
      likelihood,
    });

    // Save the data entry to the database
    await newData.save();

    res.status(201).json({ message: 'Data entry created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
// inset multiple Data
router.post('/alldata', async (req, res) => {
    try {
      const data = req.body; // Array of data objects
  
      // Check if data is provided
      if (!data || !Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: 'Data is required' });
      }
  
      // Insert the data into the model
      await Data.insertMany(data);
  
      res.json({ message: 'Data created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  // analytics chart
 router.get('/analytics', async (req, res) => {
    try {
      // Fetch the analytics data from MongoDB
      const data = await Data.find({}, 'intensity relevance likelihood published');
  
      // Prepare the chart labels and data based on the fetched data
      const chartLabels = [];
      const chartData = [
        {
          name: 'intensity',
          type: 'column',
          fill: 'solid',
          data: []
        },
        {
          name: 'relevance',
          type: 'area',
          fill: 'gradient',
          data: []
        },
        {
          name: 'likelihood',
          type: 'line',
          fill: 'solid',
          data: []
        }
      ];
  
      const yearDataMap = new Map();
      data.forEach((item) => {
        const year = new Date(item.published).getFullYear();
        if (!yearDataMap.has(year)) {
          yearDataMap.set(year, {
            intensitySum: 0,
            relevanceSum: 0,
            likelihoodSum: 0,
            count: 0
          });
        }
        
        const yearData = yearDataMap.get(year);
        yearData.intensitySum += item.intensity;
        yearData.relevanceSum += item.relevance;
        yearData.likelihoodSum += item.likelihood;
        yearData.count++;
      });
      const sortedYearDataMap = new Map([...yearDataMap.entries()].sort());
      sortedYearDataMap.forEach((value, year) => {
        const averageIntensity =  (value.intensitySum / value.count).toFixed(2);
        const averageRelevance = (value.relevanceSum / value.count).toFixed(2);
        const averageLikelihood = (value.likelihoodSum / value.count).toFixed(2);
  
        chartLabels.push(year.toString());
        chartData[0].data.push(averageIntensity);
        chartData[1].data.push(averageRelevance);
        chartData[2].data.push(averageLikelihood);
      });
  
      // Send the response
      res.json({
        title: 'Insigths (Based on Publish Year)',
        // subheader: '(+43%) than last year',
        chartLabels,
        chartData
      });
    } catch (err) {
      console.error('Error retrieving analytics data:', err);
      res.status(500).json({ error: 'Failed to retrieve analytics data' });
    }
  });
  
  // count by country 
  router.get('/countByCountry', async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ['$country', null] },
                    { $eq: ['$country', ''] }
                  ]
                },
                then: 'Other',
                else: '$country'
              }
            },
            count: { $sum: 1 }
          }
        }
      ];
  
      const result = await Data.aggregate(pipeline);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  router.get('/countByTopic', async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ['$topic', null] },
                    { $eq: ['$topic', ''] }
                  ]
                },
                then: 'Other',
                else: '$topic'
              }
            },
            count: { $sum: 1 }
          }
        }
      ];
  
      const result = await Data.aggregate(pipeline);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  // count by regiom
  router.get('/countByRegion', async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ['$region', null] },
                    { $eq: ['$region', ''] }
                  ]
                },
                then: 'Other',
                else: '$region'
              }
            },
            count: { $sum: 1 }
          }
        }
      ];
  
      const result = await Data.aggregate(pipeline);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  // count by sector
  router.get('/countBysector', async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ['$sector', null] },
                    { $eq: ['$sector', ''] }
                  ]
                },
                then: 'Other',
                else: '$sector'
              }
            },
            count: { $sum: 1 }
          }
        }
      ];
  
      const result = await Data.aggregate(pipeline);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
// Get all data entries
router.get('/data', async (req, res) => {
    try {
      const data = await Data.find();
      res.status(200).json({message:"Data get succesfully",data});
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
module.exports = router;
