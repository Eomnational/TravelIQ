import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Rating, Grid } from '@mui/material';

const RankingList = ({ attractions }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* <Typography variant="h4" component="h2" gutterBottom>
        景区排行榜
      </Typography> */}
      <div className="destination">
      <h1>景区排行榜</h1>
      <p>Where Beauty Meets Adventure!</p>
      
      </div>
      <Grid container spacing={3}>
        {attractions.map((attraction, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={attraction.image}
                alt={attraction.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {attraction.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {attraction.location}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                    评分:
                  </Typography>
                  <Rating value={attraction.rating} readOnly />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RankingList;
