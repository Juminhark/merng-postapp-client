import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const MenuBar = () => {
	const { user, logout } = useContext(AuthContext);

	// TODO : 직접 URI로 접근했을때를 대비
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'home' : pathname.substr(1);

	//? login은 되는데 Login은 안되는문제
	// TODO : path.toLowerCase()로 소문자로 바꿔서 해결
	const [activeItem, setActiveItem] = useState(path.toLowerCase());

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const menuBar = user ? (
		<Menu pointing secondary size="massive" color="pink">
			<Menu.Item name={user.username} active as={Link} to="/" />

			<Menu.Menu position="right">
				<Menu.Item name="logout" onClick={logout} />
			</Menu.Menu>
		</Menu>
	) : (
		<Menu pointing secondary size="massive" color="pink">
			<Menu.Item
				name="home"
				active={activeItem === 'home'}
				onClick={handleItemClick}
				as={Link}
				to="/"
			/>
			<Menu.Menu position="right">
				<Menu.Item
					name="login"
					active={activeItem === 'login'}
					onClick={handleItemClick}
					as={Link}
					to="/login"
				/>
				<Menu.Item
					name="register"
					active={activeItem === 'register'}
					onClick={handleItemClick}
					as={Link}
					to="/register"
				/>
			</Menu.Menu>
		</Menu>
	);

	return menuBar;
};

export default MenuBar;
