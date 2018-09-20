import React from 'react';
import {
  GridList,
  GridTile
} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    overflowY: 'auto',
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  gridTile: {
    height: '60%',
  }
};

const tilesData = [
  {
    img: 'https://www.pixelstalk.net/wp-content/uploads/2016/05/Mathematics-Wallpaper.jpg',
    title: 'Mathematics',
    author: 'Pythagoras of Samos',
    notify: 1,
  },
  {
    img: 'https://fizyka.p.lodz.pl/media/cms_page_media/1/studiuj_u_nas_1.jpg.848x360_q85.jpg',
    title: 'Physics',
    author: 'Albert Einstein',
    notify: 8,
  },
  {
    img: 'https://www.stenews.org/wp-content/uploads/2017/02/Chem.jpg',
    title: 'Chemestry',
    author: 'Robert Boyle',
    notify: 10,
  },
  {
    img: 'http://radon-mclean.org/wp-content/uploads/sites/82/2016/07/Literature-and-Novels.jpg',
    title: 'Literature',
    author: 'Jorge Luis Borges',
    notify: 5,
  },
  {
    img: 'http://www.curiosodato.net/wp-content/uploads/2014/12/Planeta-tierra.jpeg',
    title: 'Geography',
    author: 'Alexander von Humboldt',
    notify: 1,
  },
  {
    img: 'http://cdn.wallpapersafari.com/79/45/hE6FU9.jpg',
    title: 'History',
    author: 'Alejandro Magno',
    notify: 0,
  },
  {
    img: 'http://www.usm.cl/assets/img/carreras/fotos/vina-del-mar-tecnico-universitario-en-informatica.w700.jpg',
    title: 'Computing',
    author: 'Alan Turing',
    notify: 5,
  },
  {
    img: 'http://www.rotadeportes.com.ar/img/slider/deportes.jpg',
    title: 'Gymnastics',
    author: 'Diego Maradona',
    notify: 4,
  },
];

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const GridListExampleSimple = () => (
  <Paper style={styles.root} zDepth={2}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      <Subheader>Grades</Subheader>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          titleStyle={styles.gridTile}
          title={tile.title}
          titlePosition="top"
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={
            tile.notify > 0 ?
            <Badge
              badgeContent={tile.notify}
              secondary={true}
              style={styles.badge}
            /> :
            null
          }
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </Paper>
);

export default GridListExampleSimple;
