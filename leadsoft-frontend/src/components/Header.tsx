"use client"
import styled from "styled-components";

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
                    <li><ItemAncora href="#home">Início</ItemAncora></li>
                    <li><ItemAncora href="#inicio">Incrição</ItemAncora></li>
                    <li><ItemAncora href="#galeria">Galeria</ItemAncora></li>

                </ContainerListaNav>
            </Nav>

        </HeaderStyle>
    );
  }
  