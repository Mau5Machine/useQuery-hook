import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Typography,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_POKEMON = gql`
  query GetPokemon($first: Int!) {
    pokemons(first: $first) {
      id
      name
      weaknesses
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
  pokemonLogo: {
    textAlign: "center"
  }
}));

const App = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { first: 10 }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error.message}`}</p>;

  console.log(data);
  return (
    <div className="App">
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" align="center" className={classes.title}>
            Pokemon Apollo Hooks GraphQL
          </Typography>
          <div className={classes.pokemonLogo}>
            <img src="images/pokelogo.png" alt="Pokemon logo" />
          </div>
          <div className={classes.demo}>
            <List>
              {data.pokemons.map(poke => (
                <ListItem key={poke.id}>
                  <ListItemAvatar>
                    <Avatar alt="pokeball" src="images/pokelogo.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={poke.name}
                    secondary={poke.weaknesses.join(", ")}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
