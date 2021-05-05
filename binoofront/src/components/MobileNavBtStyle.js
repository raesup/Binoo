import styled from 'styled-components';
import * as IoIcon from 'react-icons/io5';
import { Link as LinkR } from 'react-router-dom';

export const SidebarContainer = styled.aside`
	position: fixed;
	z-index: 999;
	width: 65%;
	height: 60%;
	background: #ffdde2;
	display: grid;
	align-items: center;
	top: 0;
	left: 35%;
	border-radius: 10px 0px 0px 10px;
	transition: 0.3 ease-in-out;
	opacity: ${({ isOpen }) => (isOpen ? '98%' : '0%')};
	top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`;

export const CloseIcon = styled(IoIcon.IoClose)`
	color: black;
`;

export const Icon = styled.div`
	position: absolute;
	top: 1.8rem;
	right: 2.6rem;
	background: transparent;
	font-size: 2rem;
	cursor: pointer;
	outline: none;
`;

export const SidebarWrapper = styled.div`
	top: 0;
	color: white;
	margin-right: 0px;
`;

export const SidebarMenu = styled.ul`
	/* display: grid; */
	grid-template-columns: 5fr;
	grid-template-rows: repeat(5, 200px);
	text-align: center;
	margin-top: 0px;
	margin-left: 48px;
	right: 30%;
	padding-right: 0px;

	@media screen and (max-width: 480px) {
		grid-template-rows: repeat(5, 60px);
	}
`;

export const LoginSidebarMenu = styled.ul`
	/* display: grid; */
	grid-template-columns: 1fr;
	grid-template-rows: repeat(5, 200px);
	text-align: center;
	margin-top: 0px;
	margin-bottom: 0px;
	margin-left: 0px;
	right: 30%;
	padding-right: 0px;
	padding-left: 0px;
	padding-top: 0px;

	@media screen and (max-width: 480px) {
		grid-template-rows: repeat(5, 60px);
	}
`;

export const SideBtnWrap = styled.div`
	display: flex;
	/* justify-content: center; */
	position: relative;
	right: 40px;
	padding-top: 50px;
	/* padding-right: 30px;
	margin-right: 20px; */
`;

export const SidebarLink = styled(LinkR)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.7rem;
	text-decoration: none;
	list-style: none;
	transition: 0.2s ease-in-out;
	text-decoration: none;
	color: gray;
	cursor: pointer;
	margin-right: 80px;
	margin-top: 20px;
	/* margin-left: 40px; */
	padding-right: 10px;

	&:hover {
		color: white;
		transition: 0.2s ease-in-out;
	}
`;

export const SidebarRoute = styled(LinkR)`
	border-radius: 15px;
	white-space: 18px 64px;
	padding: 1px 20px 4px 20px;
	font-size: 1.5rem;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	background: black;
	color: #f285b8;
	margin-top: 20px;
	margin: auto;

	&:hover {
		transition: all 0.25s ease-in-out;
		background: #d9bad1;
		color: whitesmoke;
	}
`;
