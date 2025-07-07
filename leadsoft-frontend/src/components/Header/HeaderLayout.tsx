import { AncoraLogo, HeaderStyle, Logo } from "./HeaderStyle";

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeaderStyle>
      <AncoraLogo href="#home">
        <Logo src="/logotipo-leadsoft-branco.svg" alt="Logo LeadSoft" />
      </AncoraLogo>
      {children}
    </HeaderStyle>
  );
}
