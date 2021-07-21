import { FC } from 'react';
import { IItem } from "~/services/getUserItems";
import { useHistory } from 'react-router-dom';
import logout from '../../../../services/logout';
import { Routes } from '~/constants';

import './header-style.scss';

interface IHeader {
  items: Array<IItem>;
  username: string;
}



const Header: FC<IHeader> = ({ items, username }) => {
  const logoutHandler = async() => {
    await logout();
    push(Routes.Login);
  }
  
  const { push } = useHistory();
  return (
    <div className="header">
      <div className="user-section">
        <button onClick={logoutHandler}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${items.length} Items are vulnerable`}</h1>
      <span>Create new complex passwords to protect your accounts</span>
    </div>
  )
};

export default Header;
