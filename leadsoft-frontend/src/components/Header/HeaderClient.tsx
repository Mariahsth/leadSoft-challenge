"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FiMenu, FiX, FiLogOut, FiArrowLeft } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { MdHowToReg, MdPhotoLibrary } from "react-icons/md";
import { RiLockFill } from "react-icons/ri";
import HeaderLayout from "./HeaderLayout";
import {
  Nav,
  MenuToggle,
  ContainerListaNav,
  ItemAncora,
} from "./HeaderStyle"; 

export default function HeaderClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const logout = () => {
    alert("Realizando logout");
    Cookies.remove("token");
    router.push("/"); 
  };

  return (
    <HeaderLayout>
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
                <ItemAncora onClick={logout} href="#">
                  <FiLogOut />
                  Logout
                </ItemAncora>
              </li>
            </>
          ) : (
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
          )}
        </ContainerListaNav>
      </Nav>
    </HeaderLayout>
  );
}
