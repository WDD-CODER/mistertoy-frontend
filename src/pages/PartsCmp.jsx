import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Paper, Box, Container,
  Grid, Stack, TextField, Checkbox, FormControlLabel, Radio, RadioGroup,
  Select, MenuItem, Slider, Switch, FormControl, InputLabel, Chip, Avatar,
  Badge, Divider, List, ListItem, ListItemText, ListItemIcon, Card, CardContent,
  CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  CircularProgress, LinearProgress, Snackbar, Alert, Menu, Tooltip,
  Drawer, Link, BottomNavigation, BottomNavigationAction, Stepper, Step,
  StepLabel, Accordion, AccordionSummary, AccordionDetails, SpeedDial,
  SpeedDialIcon, SpeedDialAction, Pagination, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Tabs, Tab
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from '@mui/icons-material/Share';

// Main component that serves as a guide for various MUI components
function PartsCmp() {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const steps = ['Step 1', 'Step 2', 'Step 3'];

  // Handle dialog state
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Handle Snackbar state
  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // Handle drawer state
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  return (
    <Container maxWidth="xl" sx={{ p: 4, bgcolor: '#f0f4f8' }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
        MUI Component Guide
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}>
        A visual guide to the top 50 most-used Material-UI components, showcasing their syntax and properties.
      </Typography>

      {/* CATEGORY 1: Layout & Containers */} //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      <Box sx={{ mb: 8, p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'medium' }}>1. Layout & Containers</Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Box Component */}
        <Typography variant="h6" sx={{ mt: 2 }}>Box</Typography>
        <Box sx={{ p: 2, border: '1px dashed grey', bgcolor: '#e3f2fd' }}>
          <Typography>The Box component is a wrapper component that serves as a utility for most of the CSS utility needs.</Typography>
        </Box>

        {/* Container Component */}
        <Typography variant="h6" sx={{ mt: 4 }}>Container</Typography>
        <Container sx={{ border: '1px dashed orange', py: 2 }}>
          <Typography>The Container component centers your content horizontally.</Typography>
        </Container>

        {/* Grid Component */}
        <Typography variant="h6" sx={{ mt: 4 }}>Grid</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>Item 1 (4/12)</Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>Item 2 (8/12)</Paper>
          </Grid>
        </Grid>

        {/* Stack Component */}
        <Typography variant="h6" sx={{ mt: 4 }}>Stack</Typography>
        <Stack direction="row" spacing={2} sx={{ border: '1px dashed purple', p: 2 }}>
          <Button variant="contained">Item 1</Button>
          <Button variant="outlined">Item 2</Button>
        </Stack>
      </Box>

      {/* CATEGORY 2: Inputs & Controls */}//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      <Box sx={{ mb: 8, p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'medium' }}>2. Inputs & Controls</Typography>
        <Divider sx={{ mb: 3 }} />

        <Stack spacing={4}>
          {/* TextField */}
          <TextField
            label="Standard Text Field"
            variant="outlined"
            fullWidth
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
          />

          {/* Buttons */}
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
            <Button variant="text">Text Button</Button>
            <Button variant="contained">Contained Button</Button>
            <Button variant="outlined">Outlined Button</Button>
            <IconButton color="primary" aria-label="send">
              <SendIcon />
            </IconButton>
          </Stack>

          {/* Checkbox & Switch */}
          <Stack direction="row" spacing={4} alignItems="center">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
            <FormControlLabel control={<Switch defaultChecked />} label="Switch" />
          </Stack>

          {/* RadioGroup */}
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>

          {/* Select & MenuItem */}
          <FormControl fullWidth>
            <InputLabel>Age</InputLabel>
            <Select label="Age">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          {/* Slider */}
          <Slider defaultValue={30} aria-label="Temperature" valueLabelDisplay="auto" />
        </Stack>
      </Box>

      {/* CATEGORY 3: Navigation & Actions */} //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      <Box sx={{ mb: 8, p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'medium' }}>3. Navigation & Actions</Typography>
        <Divider sx={{ mb: 3 }} />

        <Stack spacing={4}>
          {/* AppBar & Toolbar */}
          <AppBar position="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My App
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>

          {/* Drawer */}
          <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250, p: 2 }}>
              <Typography variant="h6">Drawer Content</Typography>
              <List>
                {['Home', 'Profile', 'Settings'].map((text) => (
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          {/* Link */}
          <Link href="#" color="secondary" underline="hover">MUI Link</Link>

          {/* BottomNavigation */}
          <BottomNavigation
            showLabels
            value={bottomNavValue}
            onChange={(event, newValue) => setBottomNavValue(newValue)}
            sx={{ width: '100%', bgcolor: 'background.paper' }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Location" icon={<LocationOnIcon />} />
          </BottomNavigation>
          
          {/* Stepper */}
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} aria-label="basic tabs example">
              <Tab label="Tab One" />
              <Tab label="Tab Two" />
            </Tabs>
          </Box>
        </Stack>
      </Box>

      {/* CATEGORY 4: Data & Feedback */} //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      <Box sx={{ mb: 8, p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'medium' }}>4. Data & Feedback</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          {/* Typography */}
          <Grid item xs={12}>
            <Typography variant="h5">This is a Heading 5</Typography>
            <Typography variant="body1">This is a standard body text.</Typography>
          </Grid>

          {/* Badge */}
          <Grid item xs={12}>
            <Badge badgeContent={4} color="primary">
              <MailIcon />
            </Badge>
          </Grid>

          {/* Chip & Avatar */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <Chip label="Chip" onDelete={() => {}} />
              <Chip
                avatar={<Avatar alt="User" src="/static/images/avatar/1.jpg" />}
                label="Chip with Avatar"
              />
            </Stack>
          </Grid>

          {/* Dialog */}
          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleOpenDialog}>
              Open Dialog
            </Button>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>MUI Dialog</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This is a simple dialog box. You can place any content here.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </Dialog>
          </Grid>

          {/* Progress Indicators */}
          <Grid item xs={12}>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <CircularProgress />
              <LinearProgress />
            </Stack>
          </Grid>

          {/* Snackbar & Alert */}
          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleOpenSnackbar}>
              Open Snackbar
            </Button>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                This is a success message!
              </Alert>
            </Snackbar>
          </Grid>
          
          {/* List */}
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemIcon><SendIcon /></ListItemIcon>
                <ListItemText primary="List Item 1" />
              </ListItem>
              <ListItem>
                <ListItemIcon><DeleteIcon /></ListItemIcon>
                <ListItemText primary="List Item 2" />
              </ListItem>
            </List>
          </Grid>

          {/* Pagination */}
          <Grid item xs={12}>
            <Pagination count={10} color="primary" />
          </Grid>

          {/* Table */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow><TableCell>Frozen yoghurt</TableCell><TableCell align="right">159</TableCell></TableRow>
                  <TableRow><TableCell>Ice cream sandwich</TableCell><TableCell align="right">237</TableCell></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>

      {/* CATEGORY 5: Surfaces & Overlays */} //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      <Box sx={{ mb: 8, p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'medium' }}>5. Surfaces & Overlays</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          {/* Paper */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography>Paper is a background for components.</Typography>
            </Paper>
          </Grid>

          {/* Card */}
          <Grid item xs={12}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Card Component
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cards are surfaces that display content and actions.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Accordion */}
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  An accordion is a container that shows or hides content.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Tooltip */}
          <Grid item xs={12}>
            <Tooltip title="This is a tooltip">
              <Button>Hover Over Me</Button>
            </Tooltip>
          </Grid>

          {/* SpeedDial */}
          <Grid item xs={12}>
            <Box sx={{ height: 150, transform: 'translateZ(0px)', flexGrow: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={() => setOpenSpeedDial(false)}
                onOpen={() => setOpenSpeedDial(true)}
                open={openSpeedDial}
              >
                <SpeedDialAction icon={<ShareIcon />} tooltipTitle="Share" />
                <SpeedDialAction icon={<DeleteIcon />} tooltipTitle="Delete" />
              </SpeedDial>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default PartsCmp;



