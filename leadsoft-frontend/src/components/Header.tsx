"use client"
import styled from "styled-components";
import { AiOutlineHome } from 'react-icons/ai';
import { MdHowToReg, MdPhotoLibrary } from 'react-icons/md';
import { RiLockFill } from 'react-icons/ri';

const HeaderStyle=styled.header`
display:flex;
justify-content:space-between;
align-items:center;
padding:1rem 5rem;
border-bottom:1px solid var(--secundary-color12);
box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);

`
const Logo=styled.img`
width:20%;
`
const Nav=styled.nav`
width:50%;
`
const ContainerListaNav=styled.ul`
display:flex;
justify-content:center;
width:100%;
gap:5rem;
`
const ItemAncora=styled.a`
color:var(--secundary-color1);
font-size:1.2em;
font-family:var(--font-title);
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
gap:0.2rem;


&:hover {
    color: var(--primary-color3); 
  }
`

export default function Header() {
    return (
        <HeaderStyle>
            <Logo src='/logotipo-leadsoft-branco.svg' alt="Logo LeadSoft"/>
            <Nav>
                <ContainerListaNav>
                    <li><ItemAncora href="#home"><AiOutlineHome/>Início</ItemAncora></li>
                    <li><ItemAncora href="#inicio"><MdHowToReg/>Incrição</ItemAncora></li>
                    <li><ItemAncora href="#galeria"><MdPhotoLibrary/>Galeria</ItemAncora></li>
                    <li><ItemAncora href="#admin"><RiLockFill/>Painel Admin</ItemAncora></li>

                </ContainerListaNav>
            </Nav>

        </HeaderStyle>
    );
  }
  