import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const Dashboard = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              sx={{ minHeight: 140 }}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Card {item}
                </Typography>
                <Typography variant="h5" component="div">
                  Content
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;