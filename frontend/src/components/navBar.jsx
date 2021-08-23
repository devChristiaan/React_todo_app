import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';

const NavBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Container align="center">
          <Typography variant="h5">To Do Application</Typography>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar