"use client";
import styled from "styled-components";
import { AiOutlineHome } from "react-icons/ai";
import { MdHowToReg, MdPhotoLibrary } from "react-icons/md";
import { RiLockFill } from "react-icons/ri";
import { breakpoints } from "@/styles/breakPoints";
import { FiMenu, FiX, FiLogOut, FiArrowLeft } from "react-icons/fi";
import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  border-bottom: 1px solid var(--secundary-color12);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  background-color:var(--primary-color1);
  

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: row-reverse;

  }
`;
const AncoraLogo = styled.a`
  width: 20%;

  @media (max-width: ${breakpoints.mobile}) {
    width: 30%;
  }
`;
const Logo = styled.img`
  width: 90%;
`;
const Nav = styled.nav<{ $isOpen: boolean }>`
  width: 60%;

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 50%;
    min-height:100vh;
    background: var(--primary-color1);
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    padding: 1rem 0;
    z-index: 999;
    border-top: 1px solid var(--secundary-color12);
    border-right:1px solid var(--secundary-color12);
    border-bottom:1px solid var(--secundary-color12);
  }
`;
const ContainerListaNav = styled.ul`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 100%;
  gap: 5rem;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 2rem;
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  }
`;
const ItemAncora = styled.a`
  color: var(--secundary-color1);
  font-size: 1.2em;
  font-family: var(--font-title);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.2rem;
  cursor:pointer;

  &:hover {
    color: var(--primary-color2);
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1em;
  }

`;
const MenuToggle = styled.button`
  background: none;
  border: none;
  color: var(--secundary-color1);
  font-size: 2rem;
  display: none;

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        menuOpen
      ) {
        setMenuOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  function logout(){
    alert("Realizando logout");
    Cookies.remove("token");
    router.push("/");
  }

  return (
    <HeaderStyle>
      <AncoraLogo href="#home">
        <Logo src="/logotipo-leadsoft-branco.svg" alt="Logo LeadSoft" />

      </AncoraLogo>
      <MenuToggle onClick={toggleMenu} aria-label="Abrir menu de navegação">
        {menuOpen ? <FiX /> : <FiMenu />}
      </MenuToggle>
      <Nav $isOpen={menuOpen} ref={navRef}>
        <ContainerListaNav>
          {isAdminPage ? (
            <>
             <li>
                <ItemAncora href="/">
                  <FiArrowLeft />
                  Voltar ao site
                </ItemAncora>
              </li>
             <li>
                <ItemAncora onClick={() => logout()}>
                  <FiLogOut />
                  Logout
                </ItemAncora>
              </li>
              

            </>
          )
          :
          (
            <>
              <li>
                <ItemAncora href="#home">
                  <AiOutlineHome />
                  Início
                </ItemAncora>
              </li>
              <li>
                <ItemAncora href="#form">
                  <MdHowToReg />
                  Incrição
                </ItemAncora>
              </li>
              <li>
                <ItemAncora href="#galeria">
                  <MdPhotoLibrary />
                  Galeria
                </ItemAncora>
              </li>
              <li>
                <ItemAncora href="#admin">
                  <RiLockFill />
                  Painel Admin
                </ItemAncora>
              </li>
            </>
          )
          }
        </ContainerListaNav>
      </Nav>
    </HeaderStyle>
  );
}
