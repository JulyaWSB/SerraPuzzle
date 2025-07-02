import React, { createContext, useState, useContext } from "react";

type Usuario = {
  id: string;
  nome: string;
  email: string;
};

type UsuarioContextType = {
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
};

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const UsuarioProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const contexto = useContext(UsuarioContext);
  if (!contexto) {
    throw new Error("useUsuario deve ser usado dentro de um UsuarioProvider");
  }
  return contexto;
};