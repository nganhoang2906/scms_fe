import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

const FeatureCard = ({ title, description, image }) => {
  return (
    <Card>
      <CardMedia component="img" height="100" image={image} alt={title} />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography color="textSecondary">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
