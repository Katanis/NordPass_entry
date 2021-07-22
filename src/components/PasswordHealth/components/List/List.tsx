import './list-style.scss';

import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { IItem } from '~/services/getUserItems';

import ItemIcon from './components/ItemIcon';
import UpdateModal from './components/UpdateModal';

interface IList {
  items: Array<IItem>;
}

const List: FC<IList> = ({ items }) => (
  <ul className="list">
    {items.map((item) => (
      <li className="item" key={item.title}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          padding="0 2rem"
        >
          <Box display="flex" flexDirection="row">
            <ItemIcon title={item.title} />
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          </Box>
          <UpdateModal item={item} />
        </Box>
      </li>
    ))}
  </ul>
);

export default List;
